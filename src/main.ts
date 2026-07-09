import { ViteSSG } from "vite-ssg";
import App from "./App.vue";
import { routes } from "./router";
import { vReveal } from "./directives/reveal";
import { framework } from "./framework";
import { DOCS_BY_FRAMEWORK } from "./docs-content";
import "@alann-estrada-ksh/sileo-vue/styles.css";
import "./style.css";

export const createApp = ViteSSG(
    App,
    {
        routes,
        base: import.meta.env.BASE_URL,
        scrollBehavior(to, from, savedPosition) {
            if (savedPosition) return savedPosition;
            if (to.hash) return { el: to.hash };
            return { top: 0 };
        },
    },
    ({ app, router }) => {
        app.directive("reveal", vReveal);

        // Bare /docs (no framework segment) redirects to whichever framework
        // is currently selected instead of 404ing or picking one arbitrarily.
        router.beforeEach((to) => {
            if (to.path === "/docs" || to.path === "/docs/") {
                return { path: `/docs/${framework.value}`, replace: true };
            }
        });
    },
);

// Prerender every doc page explicitly — the dynamic :framework/:slug params
// in the route pattern aren't concrete paths vite-ssg can discover on its own.
export async function includedRoutes() {
    const frameworks = Object.keys(DOCS_BY_FRAMEWORK) as (keyof typeof DOCS_BY_FRAMEWORK)[];
    const docPaths = frameworks.flatMap((fw) =>
        DOCS_BY_FRAMEWORK[fw].map((doc) => (doc.slug === "index" ? `/docs/${fw}` : `/docs/${fw}/${doc.slug}`)),
    );
    return ["/", ...docPaths];
}
