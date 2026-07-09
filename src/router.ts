import { createRouter, createWebHistory } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import DocsPage from "./pages/DocsPage.vue";
import { framework } from "./framework";

// Real paths (not hash routes), with the framework baked into the URL
// (/docs/vue/getting-started vs /docs/flutter/getting-started) instead of
// living only in a client-side toggle — otherwise Google has no way to
// index the Flutter docs as anything other than a duplicate of the Vue
// docs at the same URL. public/404.html replays the SPA-on-GitHub-Pages
// trick (redirect deep links back through index.html) since GitHub Pages
// has no server-side rewrite.
export const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        { path: "/", component: HomePage },
        { path: "/docs/:framework(vue|flutter)?/:slug?", component: DocsPage },
    ],
    scrollBehavior(to, from, savedPosition) {
        if (savedPosition) return savedPosition;
        if (to.hash) return { el: to.hash };
        return { top: 0 };
    },
});

// Bare /docs (no framework segment) redirects to whichever framework is
// currently selected instead of 404ing or picking one arbitrarily.
router.beforeEach((to) => {
    if (to.path === "/docs" || to.path === "/docs/") {
        return { path: `/docs/${framework.value}`, replace: true };
    }
});
