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
