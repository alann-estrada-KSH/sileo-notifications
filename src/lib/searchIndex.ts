import { DOCS_BY_FRAMEWORK, DEFAULT_SLUG } from "../docs-content";
import type { Framework } from "../framework";
import type { Locale } from "../i18n";

export interface SearchEntry {
    framework: Framework;
    slug: string;
    title: string;
    desc: string;
    path: string;
    body: string;
}

// Markdown source, not rendered HTML — strip the syntax noise (headings,
// emphasis, code fences, link brackets) so search snippets read as prose
// instead of "## Getting Started ```dart class Toaster {".
const stripMarkdown = (md: string): string =>
    md
        .replace(/```[\s\S]*?```/g, " ")
        .replace(/`[^`]*`/g, " ")
        .replace(/!\[[^\]]*]\([^)]*\)/g, " ")
        .replace(/\[([^\]]*)]\([^)]*\)/g, "$1")
        .replace(/[#>*_~-]/g, " ")
        .replace(/\s+/g, " ")
        .trim();

// Built once per locale, reused across every search — the doc set is small
// enough (13 docs total) that there's no need for a real search library.
const buildIndex = (locale: Locale): SearchEntry[] =>
    (Object.keys(DOCS_BY_FRAMEWORK) as Framework[]).flatMap((framework) =>
        DOCS_BY_FRAMEWORK[framework].map((doc) => ({
            framework,
            slug: doc.slug,
            title: doc.title[locale],
            desc: doc.desc[locale],
            path: doc.slug === DEFAULT_SLUG ? `/docs/${framework}` : `/docs/${framework}/${doc.slug}`,
            body: stripMarkdown(doc.raw[locale]),
        })),
    );

const cache = new Map<Locale, SearchEntry[]>();
const getIndex = (locale: Locale): SearchEntry[] => {
    const cached = cache.get(locale);
    if (cached) return cached;
    const built = buildIndex(locale);
    cache.set(locale, built);
    return built;
};

export interface SearchResult extends SearchEntry {
    snippet: string;
}

const SNIPPET_RADIUS = 60;

const buildSnippet = (body: string, matchIndex: number): string => {
    const start = Math.max(0, matchIndex - SNIPPET_RADIUS);
    const end = Math.min(body.length, matchIndex + SNIPPET_RADIUS);
    const prefix = start > 0 ? "…" : "";
    const suffix = end < body.length ? "…" : "";
    return `${prefix}${body.slice(start, end)}${suffix}`;
};

// Title matches rank above description matches, which rank above body
// matches — a simple relevance order, not a real scoring model.
export const search = (query: string, locale: Locale, limit = 8): SearchResult[] => {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    const scored = getIndex(locale)
        .map((entry) => {
            const titleIdx = entry.title.toLowerCase().indexOf(q);
            if (titleIdx !== -1) return { entry, rank: 0, snippet: entry.desc };

            const descIdx = entry.desc.toLowerCase().indexOf(q);
            if (descIdx !== -1) return { entry, rank: 1, snippet: entry.desc };

            const bodyIdx = entry.body.toLowerCase().indexOf(q);
            if (bodyIdx !== -1) return { entry, rank: 2, snippet: buildSnippet(entry.body, bodyIdx) };

            return null;
        })
        .filter((x): x is { entry: SearchEntry; rank: number; snippet: string } => x !== null)
        .sort((a, b) => a.rank - b.rank);

    return scored.slice(0, limit).map(({ entry, snippet }) => ({ ...entry, snippet }));
};
