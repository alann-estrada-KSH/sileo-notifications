<script setup lang="ts">
import { computed, watchEffect } from "vue";
import { useRoute } from "vue-router";
import SiteNav from "./components/SiteNav.vue";
import TheFooter from "./components/TheFooter.vue";
import { t, locale } from "./i18n";
import { framework } from "./framework";
import { findDoc } from "./docs-content";

const route = useRoute();
const SITE_URL = "https://alann-estrada-ksh.github.io/sileo-notifications";

// Docs pages get their own title/description (their doc's, not the generic
// site one) so each /docs/:slug is a distinct, meaningfully-indexable page
// instead of every route sharing one title — the single highest-leverage
// thing for Google actually surfacing a specific doc page in results.
const pageMeta = computed(() => {
    if (route.path.startsWith("/docs")) {
        const slug = typeof route.params.slug === "string" ? route.params.slug : undefined;
        const doc = findDoc(framework.value, slug);
        return {
            title: `${doc.title[locale.value]} · Sileo Docs`,
            description: doc.desc[locale.value],
        };
    }
    return t("meta");
});

// The static English copy in index.html still serves as the crawler-visible
// default for the initial (unhydrated) response; Googlebot executes JS and
// picks up these updates for indexing, which is what actually matters here.
watchEffect(() => {
    document.title = pageMeta.value.title;
    document.querySelector('meta[name="description"]')?.setAttribute("content", pageMeta.value.description);

    const canonical = document.querySelector('link[rel="canonical"]');
    canonical?.setAttribute("href", `${SITE_URL}${route.fullPath}`);
});
</script>

<template>
    <SiteNav />
    <router-view />
    <TheFooter />
</template>
