import { expect, test } from "@playwright/test";

const PAGES = ["/getting-started", "/advanced-features", "/styling", "/examples", "/migration-guide"];

for (const slug of PAGES) {
    test(`every demo on /docs/vue${slug} runs and shows a toast`, async ({ page }) => {
        const failures: string[] = [];
        page.on("console", (msg) => {
            if (msg.type() === "error") failures.push(msg.text());
        });
        await page.goto(`docs/vue${slug}`);

        const runs = page.locator(".demo-run");
        const count = await runs.count();
        expect(count).toBeGreaterThan(0);
        for (let i = 0; i < count; i++) {
            await page.evaluate(() => (window as any).sileo?.clear?.());
            await runs.nth(i).scrollIntoViewIfNeeded();
            await runs.nth(i).click();
            await expect(page.locator("[data-sileo-toast]").first()).toBeVisible();
        }
        expect(failures.filter((f) => f.includes("docs demo failed"))).toEqual([]);
    });
}

test("Code tab reveals the snippet and Preview tab hides it", async ({ page }) => {
    await page.goto("docs/vue/examples");
    const block = page.locator(".demo-block").first();
    await expect(block.locator("pre")).toBeHidden();
    await block.getByRole("tab", { name: "Code" }).click();
    await expect(block.locator("pre")).toBeVisible();
    await block.getByRole("tab", { name: "Preview" }).click();
    await expect(block.locator("pre")).toBeHidden();
});

test("screenshot rich description example", async ({ page }) => {
    await page.goto("docs/vue/examples");
    const block = page.locator(".demo-block", { hasText: "3 new members joined" });
    await block.locator(".demo-run").click();
    await page.waitForTimeout(1500);
    await page.screenshot({ path: "test-results/rich.png" });
});

test("Spanish docs demos also run", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("sileo-landing-locale", "es"));
    await page.goto("docs/vue/examples");
    const runs = page.locator(".demo-run");
    expect(await runs.count()).toBeGreaterThan(10);
    await runs.nth(0).click();
    await expect(page.locator("[data-sileo-toast]").first()).toBeVisible();
});

for (const slug of ["", "/getting-started", "/styling", "/api-reference"]) {
    test(`Flutter docs /docs/flutter${slug} are code-only (no live preview)`, async ({ page }) => {
        await page.goto(`docs/flutter${slug}`);
        await expect(page.locator(".prose")).toBeVisible();
        await expect(page.locator(".demo-block")).toHaveCount(0);
        await expect(page.locator(".demo-run")).toHaveCount(0);
        if (slug) await expect(page.locator(".code-block pre").first()).toBeVisible();
    });
}

test.describe("Spanish locale is respected on docs", () => {
    test.beforeEach(async ({ page }) => {
        await page.addInitScript(() => localStorage.setItem("sileo-landing-locale", "es"));
    });

    test("demo labels, back link and content are Spanish after hydration", async ({ page }) => {
        await page.goto("docs/vue/examples");
        await expect(page.locator("html")).toHaveAttribute("lang", "es");
        await expect(page.getByRole("link", { name: "← Volver al inicio" })).toBeVisible();
        const block = page.locator(".demo-block").first();
        await expect(block.getByRole("tab", { name: "Vista previa" })).toBeVisible();
        await expect(block.getByRole("tab", { name: "Código" })).toBeVisible();
        await expect(block.getByRole("button", { name: "Ejecutar ejemplo" })).toBeVisible();
        await expect(page.locator(".prose")).toContainText("Esta página se enfoca");
        await expect(page.locator(".demo-tab", { hasText: /^Preview$/ })).toHaveCount(0);
        await expect(page.locator(".copy-code-btn").first()).toHaveAttribute("aria-label", "Copiar código");
    });

    test("theme demos fire Spanish sample toasts", async ({ page }) => {
        await page.goto("docs/vue/examples");
        await page.locator(".demo-block[data-demo='vue-demo-colored'] .demo-run").first().click();
        await expect(page.locator("[data-sileo-title]", { hasText: "Despliegue completo" }).first()).toBeVisible();
    });

    test("home page is Spanish too", async ({ page }) => {
        await page.goto("");
        await expect(page.locator("html")).toHaveAttribute("lang", "es");
        await expect(page.locator("body")).not.toContainText("Back to home");
    });
});

test("English locale keeps English labels", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("sileo-landing-locale", "en"));
    await page.goto("docs/vue/examples");
    await expect(page.locator(".demo-block").first().getByRole("tab", { name: "Preview" })).toBeVisible();
});

test("Spanish snippets fire Spanish toast text", async ({ page }) => {
    await page.addInitScript(() => localStorage.setItem("sileo-landing-locale", "es"));
    await page.goto("docs/vue/getting-started");
    await page.locator(".demo-run").first().click();
    await expect(page.locator("[data-sileo-title]", { hasText: "Listo" }).first()).toBeVisible();
    await expect(page.locator("[data-sileo-title]", { hasText: "Upload failed" })).toHaveCount(0);
});
