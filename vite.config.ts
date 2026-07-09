import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// GitHub Pages serves project sites from https://<user>.github.io/<repo>/,
// so production builds need the repo name as the base path. Local dev/preview
// stays at "/". The Vue playground pulls the toast component straight from
// the published @alann-estrada-ksh/sileo-vue package — no source alias
// needed now that this site lives in its own repo.
export default defineConfig(({ mode }) => ({
    base: mode === "production" ? "/sileo-notifications/" : "/",
    server: { port: Number(process.env.PORT) || 5176 },
    plugins: [vue()],
    ssgOptions: {
        // /docs/vue/getting-started/index.html instead of getting-started.html
        // — matches how GitHub Pages serves extension-less directory paths.
        dirStyle: "nested",
        formatting: "minify",
        // Critical-CSS inlining (beasties) is an extra peer dep for a marginal
        // win on a page this size — skip it rather than pull it in.
        beastiesOptions: false,
    },
}));
