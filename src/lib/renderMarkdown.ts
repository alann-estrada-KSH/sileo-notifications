import { marked } from "marked";
import type { Framework } from "../framework";
import { DEFAULT_SLUG } from "../docs-content";

// The docs cross-link each other by relative filename (e.g. "getting-started.md",
// matching how they render on GitHub). Rewrite those to real in-app doc routes
// (/docs/vue/getting-started) so clicking one stays inside the SPA instead of
// requesting a non-existent page — framework-scoped since the same slug can
// mean a different doc depending which framework's docs you're reading.
const rewriteRelativeDocLinks = (markdown: string, framework: Framework): string =>
    markdown.replace(/]\(([a-z0-9-]+)\.md\)/gi, (_match, slug) =>
        slug === DEFAULT_SLUG ? `](/docs/${framework})` : `](/docs/${framework}/${slug})`,
    );

// Same copy-to-clipboard affordance as the hero's install command (see
// TheHero.vue), applied to every fenced code block in the docs. Pure string
// wrapping — no DOM APIs — so it's present in the prerendered HTML too, not
// just bolted on after hydration. Click handling lives in DocsPage.vue via
// event delegation on the .prose container, since content here is raw HTML
// (v-html), not real Vue elements Vue could bind a handler to directly.
const COPY_ICON = `<svg class="icon-copy" viewBox="0 0 16 16" aria-hidden="true"><rect x="5.5" y="5.5" width="8" height="8" rx="1.5" fill="none" stroke="currentColor" stroke-width="1.3"/><path d="M3.5 10.5v-6a1 1 0 0 1 1-1h6" fill="none" stroke="currentColor" stroke-width="1.3" stroke-linecap="round"/></svg>`;
const CHECK_ICON = `<svg class="icon-check" viewBox="0 0 16 16" aria-hidden="true"><path d="M3.5 8.4L6.5 11.4L12.8 4.9" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>`;

const wrapCodeBlocks = (html: string): string =>
    html.replace(
        /<pre>(<code[^>]*>[\s\S]*?<\/code>)<\/pre>/g,
        (_match, code) =>
            `<div class="code-block"><pre>${code}</pre><button type="button" class="copy-code-btn" aria-label="Copy code">${COPY_ICON}${CHECK_ICON}</button></div>`,
    );

// Content is our own build-time-imported markdown (see docs-content/index.ts),
// not user input, so rendering it as HTML is the same trust level as any other
// static site copy.
export const renderMarkdown = (raw: string, framework: Framework): string =>
    wrapCodeBlocks(marked.parse(rewriteRelativeDocLinks(raw, framework), { async: false }) as string);
