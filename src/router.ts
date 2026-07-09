import type { RouteRecordRaw } from "vue-router";
import HomePage from "./pages/HomePage.vue";
import DocsPage from "./pages/DocsPage.vue";

// vite-ssg (see main.ts) builds the actual router from this route list —
// it needs history injected differently for the SSG render pass (memory)
// vs the browser (real paths), so it owns createRouter/createWebHistory,
// not this file. Framework is baked into the URL
// (/docs/vue/getting-started vs /docs/flutter/getting-started) instead of
// living only in a client-side toggle, so each doc is its own indexable,
// prerenderable page — see main.ts's includedRoutes for the full list.
export const routes: RouteRecordRaw[] = [
    { path: "/", component: HomePage },
    { path: "/docs/:framework(vue|flutter)?/:slug?", component: DocsPage },
];
