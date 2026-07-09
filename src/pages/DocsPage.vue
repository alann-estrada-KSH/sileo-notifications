<script setup lang="ts">
import { computed, watch } from "vue";
import { useRoute } from "vue-router";
import { t, locale } from "../i18n";
import { framework, setFramework, type Framework } from "../framework";
import { DOCS_BY_FRAMEWORK, DEFAULT_SLUG, DOC_REPO_PATH, findDoc } from "../docs-content";
import { renderMarkdown } from "../lib/renderMarkdown";
import FrameworkToggle from "../components/FrameworkToggle.vue";

const route = useRoute();

// The URL is the source of truth for which framework's docs to show — keep
// the global toggle (nav, other sections) in sync with it rather than the
// other way around, so a direct link to /docs/flutter/styling renders
// Flutter even if the visitor never touched the toggle.
const routeFramework = computed<Framework>(() =>
    route.params.framework === "flutter" ? "flutter" : "vue",
);
watch(routeFramework, (fw) => {
    if (fw !== framework.value) setFramework(fw);
}, { immediate: true });

const docPath = (fw: Framework, slug: string) => (slug === DEFAULT_SLUG ? `/docs/${fw}` : `/docs/${fw}/${slug}`);

const docs = computed(() => DOCS_BY_FRAMEWORK[routeFramework.value]);
const activeSlug = computed(() => (typeof route.params.slug === "string" ? route.params.slug : DEFAULT_SLUG));
const activeDoc = computed(() => findDoc(routeFramework.value, activeSlug.value));
const renderedHtml = computed(() => renderMarkdown(activeDoc.value.raw[locale.value], routeFramework.value));

const githubUrl = computed(
    () => `${DOC_REPO_PATH[routeFramework.value]}/${activeDoc.value.slug}.md`,
);

// Code blocks are raw HTML (v-html, see renderMarkdown's wrapCodeBlocks) —
// Vue can't bind a handler to a button that isn't a real Vue element, so
// this delegates from the .prose container instead of one listener per block.
const onProseClick = async (event: MouseEvent) => {
    const btn = (event.target as HTMLElement).closest<HTMLButtonElement>(".copy-code-btn");
    if (!btn) return;
    const code = btn.closest(".code-block")?.querySelector("code");
    if (!code?.textContent) return;
    try {
        await navigator.clipboard.writeText(code.textContent);
        btn.classList.add("copied");
        setTimeout(() => btn.classList.remove("copied"), 1600);
    } catch {
        // clipboard permissions can be denied — button just won't flash "copied"
    }
};
</script>

<template>
    <div class="docs-page container">
        <div class="docs-top">
            <router-link class="back-link" to="/">{{ t("docsPage").backHome }}</router-link>
            <FrameworkToggle />
        </div>

        <div class="docs-layout">
            <aside class="sidebar">
                <router-link
                    v-for="doc in docs"
                    :key="doc.slug"
                    class="sidebar-link"
                    :class="{ active: doc.slug === activeSlug }"
                    :to="docPath(routeFramework, doc.slug)"
                >
                    <span class="sidebar-title">{{ doc.title[locale] }}</span>
                    <span class="sidebar-desc">{{ doc.desc[locale] }}</span>
                </router-link>
            </aside>

            <article class="prose" v-html="renderedHtml" @click="onProseClick"></article>
        </div>

        <a class="github-link" :href="githubUrl" target="_blank" rel="noreferrer">{{ t("docsPage").viewOnGithub }}</a>
    </div>
</template>

<style scoped>
.docs-page {
    padding-block: 3rem 6rem;
    min-height: 100vh;
}

.docs-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 1rem;
    margin-bottom: 2rem;
}

.back-link {
    display: inline-block;
    font-family: var(--font-mono);
    font-size: 0.85rem;
    color: var(--paper-dim);
    text-decoration: none;
    transition: color 180ms var(--ease-out-expo);
}

.back-link:hover {
    color: var(--accent);
}

.docs-layout {
    display: grid;
    grid-template-columns: 260px minmax(0, 1fr);
    gap: 2.5rem;
    align-items: start;
}

.sidebar {
    position: sticky;
    top: 1.5rem;
    display: flex;
    flex-direction: column;
    gap: 0.35rem;
}

.sidebar-link {
    display: flex;
    flex-direction: column;
    gap: 0.15rem;
    padding: 0.6rem 0.8rem;
    border-radius: var(--radius-sm);
    text-decoration: none;
    border: 1px solid transparent;
    transition: background 160ms var(--ease-out-expo), border-color 160ms var(--ease-out-expo);
}

.sidebar-link:hover {
    background: var(--ink-1);
}

.sidebar-link.active {
    border-color: var(--line);
    background: var(--ink-1);
}

.sidebar-title {
    font-size: 0.9rem;
    font-weight: 600;
    color: var(--paper);
}

.sidebar-link.active .sidebar-title {
    color: var(--accent);
}

.sidebar-desc {
    font-size: 0.76rem;
    color: var(--paper-faint);
}

.github-link {
    display: inline-block;
    margin-top: 3rem;
    font-family: var(--font-mono);
    font-size: 0.82rem;
    color: var(--paper-dim);
    text-decoration: none;
}

.github-link:hover {
    color: var(--accent);
}

@media (max-width: 860px) {
    .docs-layout {
        grid-template-columns: 1fr;
    }

    .sidebar {
        position: static;
        flex-direction: row;
        flex-wrap: wrap;
    }

    .sidebar-link {
        flex: 1 1 220px;
    }
}

/* ── Prose (rendered markdown) ──────────────────────────────────────────── */

.prose {
    min-width: 0;
    font-size: 1rem;
    line-height: 1.7;
    color: var(--paper-dim);
}

.prose :deep(h1) {
    font-family: var(--font-display);
    font-size: clamp(2rem, 4vw, 2.6rem);
    color: var(--paper);
    margin: 0 0 1.25rem;
}

.prose :deep(h2) {
    font-family: var(--font-display);
    font-size: 1.5rem;
    color: var(--paper);
    margin: 2.5rem 0 1rem;
    padding-top: 1.5rem;
    border-top: 1px solid var(--line);
}

.prose :deep(h2:first-child) {
    margin-top: 0;
    padding-top: 0;
    border-top: 0;
}

.prose :deep(h3) {
    font-size: 1.15rem;
    color: var(--paper);
    margin: 1.75rem 0 0.75rem;
}

.prose :deep(p) {
    margin: 0 0 1rem;
}

.prose :deep(ul),
.prose :deep(ol) {
    margin: 0 0 1rem;
    padding-left: 1.4rem;
}

.prose :deep(li) {
    margin-bottom: 0.4rem;
}

.prose :deep(a) {
    color: var(--accent);
    text-decoration: underline;
    text-underline-offset: 2px;
}

.prose :deep(code) {
    font-family: var(--font-mono);
    font-size: 0.86em;
    background: var(--ink-1);
    padding: 0.15em 0.4em;
    border-radius: 5px;
    color: var(--paper);
}

.prose :deep(.code-block) {
    position: relative;
    margin: 0 0 1.25rem;
}

.prose :deep(pre) {
    margin: 0;
    padding: 1.1rem 1.3rem;
    border-radius: var(--radius-md);
    border: 1px solid var(--line);
    background: var(--ink-0);
    overflow-x: auto;
}

.prose :deep(pre code) {
    background: none;
    padding: 0;
    color: var(--paper-dim);
    font-size: 0.85rem;
    line-height: 1.6;
}

.prose :deep(.copy-code-btn) {
    position: absolute;
    top: 0.7rem;
    right: 0.7rem;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 30px;
    height: 30px;
    border-radius: var(--radius-sm);
    border: 1px solid var(--line);
    background: var(--ink-1);
    color: var(--paper-faint);
    cursor: pointer;
    opacity: 0;
    transition: opacity 160ms var(--ease-out-expo), color 160ms var(--ease-out-expo), border-color 160ms var(--ease-out-expo);
}

.prose :deep(.code-block:hover .copy-code-btn),
.prose :deep(.copy-code-btn:focus-visible) {
    opacity: 1;
}

.prose :deep(.copy-code-btn:hover) {
    color: var(--paper);
    border-color: var(--accent);
}

.prose :deep(.copy-code-btn svg) {
    width: 15px;
    height: 15px;
}

.prose :deep(.copy-code-btn .icon-check) {
    display: none;
}

.prose :deep(.copy-code-btn.copied) {
    opacity: 1;
    color: var(--state-success);
    border-color: var(--state-success);
}

.prose :deep(.copy-code-btn.copied .icon-copy) {
    display: none;
}

.prose :deep(.copy-code-btn.copied .icon-check) {
    display: inline-flex;
}

@media (hover: none) {
    /* No hover on touch — keep the button visible instead of unreachable. */
    .prose :deep(.copy-code-btn) {
        opacity: 1;
    }
}

.prose :deep(table) {
    width: 100%;
    border-collapse: collapse;
    margin: 0 0 1.25rem;
    font-size: 0.9rem;
}

.prose :deep(th),
.prose :deep(td) {
    text-align: left;
    padding: 0.55rem 0.75rem;
    border: 1px solid var(--line);
}

.prose :deep(th) {
    color: var(--paper);
    background: var(--ink-1);
}

.prose :deep(blockquote) {
    margin: 0 0 1.25rem;
    padding: 0.25rem 1.1rem;
    border-left: 2px solid var(--accent);
    color: var(--paper-faint);
}
</style>
