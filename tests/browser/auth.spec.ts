import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("new user signs up, reaches Trips Home and starts another trip", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Plan a trip" }).click();
  await expect(page).toHaveURL(/\/signup$/);
  await expect(page.getByRole("heading", { name: /Make room for/ })).toBeVisible();

  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page.getByText("Tell us what to call you.")).toBeVisible();
  await expect(page.getByText("Enter a complete email address.")).toBeVisible();
  await expect(page.getByText("Password needs at least 8 characters.")).toBeVisible();

  await page.getByLabel("Name").fill("Mitali Giri");
  await page.getByLabel("Email").fill("mitali@example.com");
  await page.getByLabel("Password", { exact: true }).fill("journey123");
  await page.getByRole("button", { name: "Show password" }).click();
  await expect(page.getByLabel("Password", { exact: true })).toHaveAttribute("type", "text");
  await page.getByRole("button", { name: "Create account" }).click();

  await expect(page).toHaveURL(/\/trips$/);
  await expect(page.getByRole("heading", { name: /Where are we going next/ })).toBeVisible();
  await expect(page.locator(".current-trip-bottom strong")).toHaveText("₹37,600");
  await page.getByRole("link", { name: "Plan another trip" }).click();
  await expect(page).toHaveURL(/\/create$/);
});

test("returning user logs in, continues Goa and can log out", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Email").fill("mitali@example.com");
  await page.getByLabel("Password", { exact: true }).fill("journey123");
  await page.getByRole("button", { name: "Log in", exact: true }).click();
  await expect(page).toHaveURL(/\/trips$/);
  await page.getByRole("link", { name: "Continue planning" }).click();
  await expect(page).toHaveURL(/\/trip\/goa\/plan$/);
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");

  await page.getByLabel(/Open account menu for Mitali/).click();
  await page.getByRole("button", { name: "Log out" }).click();
  await expect(page).toHaveURL(/\/$/);
  await expect(page.getByRole("link", { name: "Log in" })).toBeVisible();
});

test("portfolio demo bypasses authentication and password reset resolves locally", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Explore a sample trip" }).click();
  await expect(page).toHaveURL(/\/trip\/goa\/plan$/);
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");

  await page.goto("/forgot-password");
  await page.getByLabel("Email").fill("mitali@example.com");
  await page.getByRole("button", { name: "Send reset link" }).click();
  await expect(page.getByRole("heading", { name: "Check your inbox." })).toBeVisible();
  await expect(page.getByText("mitali@example.com", { exact: true })).toBeVisible();
});

test("authentication and Trips Home are accessible and responsive on mobile", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const route of ["/signup", "/login", "/forgot-password"]) {
    await page.goto(route);
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(audit.violations, route).toEqual([]);
    expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), route).toBeTruthy();
  }

  await page.goto("/signup");
  await page.getByLabel("Name").fill("Mitali Giri");
  await page.getByLabel("Email").fill("mitali@example.com");
  await page.getByLabel("Password", { exact: true }).fill("journey123");
  await page.getByRole("button", { name: "Create account" }).click();
  await expect(page).toHaveURL(/\/trips$/);
  await expect(page.getByRole("link", { name: "Continue planning" })).toBeVisible();
  const tripsAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(tripsAudit.violations).toEqual([]);
  expect(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth)).toBeTruthy();
});

test("login keeps a focused form beside the editorial image on large screens", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/login");

  const layout = await page.evaluate(() => {
    const content = document.querySelector<HTMLElement>(".auth-content")!;
    const visual = document.querySelector<HTMLElement>(".auth-visual")!;
    const contentBox = content.getBoundingClientRect();
    const visualBox = visual.getBoundingClientRect();
    return {
      overflow: document.documentElement.scrollWidth > innerWidth,
      contentWidth: contentBox.width,
      visualWidth: visualBox.width,
      visualVisible: getComputedStyle(visual).display !== "none",
      visualLeftOfContent: visualBox.left < contentBox.left,
    };
  });

  expect(layout.overflow).toBeFalsy();
  expect(layout.contentWidth).toBeLessThanOrEqual(500);
  expect(layout.visualWidth).toBeGreaterThanOrEqual(440);
  expect(layout.visualVisible).toBeTruthy();
  expect(layout.visualLeftOfContent).toBeTruthy();
});
