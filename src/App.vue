<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { useHead } from "@unhead/vue";
import SiteNav from "./components/SiteNav.vue";
import TheFooter from "./components/TheFooter.vue";
import { t, locale } from "./i18n";
import { framework, setFramework, type Framework } from "./framework";
import { findDoc } from "./docs-content";

const route = useRoute();
const SITE_URL = "https://alann-estrada-ksh.github.io/sileo-notifications";

const routeFramework = computed<Framework>(() => (route.params.framework === "flutter" ? "flutter" : "vue"));

// `framework` is a module-level singleton (see framework.ts) — fine in the
// browser (one tab, one JS context), but vite-ssg prerenders every route in
// the same Node process, reusing the same module instances. Without this,
// rendering /docs/flutter/styling would leave framework.value = "flutter"
// bleeding into whichever route renders next in that build pass (e.g. the
// home page picking up the wrong install command). DocsPage.vue already
// syncs it from its own route params; this covers every other route by
// resetting it on the server for every render, before anything reads it.
// No-op on the client — real toggle/localStorage behavior is untouched.
if (import.meta.env.SSR) {
    setFramework(routeFramework.value);
}

// Docs pages get their own title/description (their doc's, not the generic
// site one) so each /docs/:slug is a distinct, meaningfully-indexable page
// instead of every route sharing one title — the single highest-leverage
// thing for Google actually surfacing a specific doc page in results.
// useHead (via vite-ssg's bundled @unhead/vue) is SSG-safe: it renders into
// the prerendered HTML at build time and merges reactively on the client,
// unlike directly poking `document.title` which only works post-hydration.
const pageMeta = computed(() => {
    if (route.path.startsWith("/docs")) {
        const slug = typeof route.params.slug === "string" ? route.params.slug : undefined;
        const doc = findDoc(routeFramework.value, slug);
        return {
            title: `${doc.title[locale.value]} · Sileo Docs`,
            description: doc.desc[locale.value],
        };
    }
    return t("meta");
});

useHead({
    title: () => pageMeta.value.title,
    meta: [
        { name: "description", content: () => pageMeta.value.description },
        { property: "og:title", content: () => pageMeta.value.title },
        { property: "og:description", content: () => pageMeta.value.description },
    ],
    link: [
        { rel: "canonical", href: () => `${SITE_URL}${route.fullPath}` },
    ],
});
</script>

<template>
    <SiteNav />
    <router-view />
    <TheFooter />
</template>
