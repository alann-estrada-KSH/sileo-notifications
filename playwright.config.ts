import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "./e2e",
    webServer: {
        command: "npm run preview -- --port 5184 --strictPort",
        url: "http://localhost:5184/sileo-notifications/",
        reuseExistingServer: false,
    },
    use: { baseURL: "http://localhost:5184/sileo-notifications/" },
});
