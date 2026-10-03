import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test("full create → preview → conflict → apply → budget → undo journey", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/");
  await expect(
    page.getByRole("heading", { name: /The best trips/ }),
  ).toBeVisible();
  await page.screenshot({
    path: "test-results/landing-desktop.png",
    fullPage: true,
  });
  await page.goto("/create");
  await expect(page.getByLabel("Your destination")).toHaveValue("Goa");
  await page.getByRole("button", { name: "Review trip brief" }).click();
  await expect(
    page.getByRole("heading", { name: "Does this feel like your trip?" }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Create my itinerary" }).click();
  await expect(
    page.getByRole("heading", { name: "Your slower days are ready." }),
  ).toBeVisible();
  await page.getByRole("link", { name: "See my Goa trip" }).click();
  await page
    .getByRole("link", { name: "Explore itinerary", exact: true })
    .click();
  await expect(page.getByRole("heading", { name: "Goa", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Plan", exact: true })).toHaveAttribute("aria-current", "page");
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");
  await page.screenshot({
    path: "test-results/workspace-desktop.png",
    fullPage: true,
  });
  await page.locator("#activity-cafe").click();
  await expect(
    page.getByRole("button", { name: /Stop 2: A slow coffee/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: /Stop 3: A taste of the Goan coast/ }).click();
  await expect(page.locator("#activity-lunch")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#activity-lunch")).toBeVisible();
  await page
    .getByRole("button", { name: "Move A slow coffee at Assagao", exact: true })
    .click();
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.getByRole("button", { name: "Preview move" }).click();
  await expect(
    page.getByRole("heading", { name: "You’re 20 minutes short." }),
  ).toBeVisible();
  await expect(
    page.getByText("+₹400 estimated transport", { exact: true }),
  ).toBeVisible();
  await expect(page.locator(".impact-ledger-column.before")).toContainText(
    "Day 1₹5,400Day 2₹6,000Trip₹37,600",
  );
  await expect(page.locator(".impact-ledger-column.after")).toContainText(
    "Day 1₹4,600Day 2₹7,200Trip₹38,000",
  );
  await expect(
    page.getByRole("button", { name: "Choose a resolution" }),
  ).toBeDisabled();
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");
  await page.screenshot({
    path: "test-results/conflict-desktop.png",
    fullPage: false,
  });
  await page
    .getByRole("button", { name: /Move café earlier/ })
    .click();
  await expect(page.getByText(/No schedule conflicts/)).toBeVisible();
  await expect(
    page.getByRole("checkbox", { name: /A little walk/ }),
  ).not.toBeChecked();
  await page.getByRole("button", { name: "Apply change", exact: true }).click();
  await expect(page.getByRole("dialog")).not.toBeVisible();
  await expect(page.getByTestId("accepted-total")).toContainText("₹38,000");
  await expect(page.locator("#activity-cafe")).toBeFocused();
  await expect(page.getByTestId("map")).toHaveAttribute("data-revision", "2");
  await expect(page.getByTestId("day-2")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(
    page.getByRole("button", { name: /Stop 2: A slow coffee/ }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("button", { name: "View changes" }).click();
  await expect(page.getByRole("heading", { name: "How the plan changed" })).toBeVisible();
  await expect(page.getByRole("dialog")).toContainText("A slow coffee at Assagao moved to Day 2");
  await expect(page.getByRole("dialog")).toContainText("₹37,600 → ₹38,000");
  await page.getByRole("button", { name: "Done" }).click();
  await page.getByRole("link", { name: "Budget", exact: true }).click();
  await expect(page.getByTestId("budget-total")).toHaveText("₹38,000");
  await expect(page.getByText("WHAT CHANGED")).toBeVisible();
  await expect(page.getByText(/not added again/)).toBeVisible();
  await page.screenshot({
    path: "test-results/budget-desktop.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Undo last itinerary change" })
    .click();
  await expect(page.getByTestId("budget-total")).toHaveText("₹37,600");
  await page.getByRole("link", { name: "Back to plan" }).click();
  await expect(page.getByTestId("day-1")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await expect(page.getByTestId("map")).toHaveAttribute("data-revision", "3");
  await expect(page.locator("#activity-cafe")).toBeVisible();
  await page.reload();
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");
  expect(errors).toEqual([]);
});

test("desktop drag creates a proposal, discard restores accepted state", async ({
  page,
}) => {
  await page.goto("/trip/goa/plan");
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");
  await page
    .locator("#activity-cafe")
    .locator("xpath=ancestor::article[1]")
    .dragTo(page.getByTestId("day-2"));
  await expect(
    page.getByRole("heading", { name: "You’re 20 minutes short." }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Inspect on map" }).click();
  await expect(
    page.getByText("Your accepted plan is unchanged."),
  ).toBeVisible();
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");
  await expect(page.locator(".preview-route")).toBeVisible();
  await page.getByRole("button", { name: "Discard", exact: true }).click();
  await expect(page.locator(".preview-route")).toHaveCount(0);
  await expect(page.getByTestId("day-1")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("mobile non-drag flow, preserved view, keyboard dialog and accessibility", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.screenshot({
    path: "test-results/landing-mobile.png",
    fullPage: true,
  });
  await page.goto("/trip/goa/plan");
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");
  await page.screenshot({
    path: "test-results/workspace-mobile.png",
    fullPage: true,
  });
  await page
    .getByRole("button", { name: "Move A slow coffee at Assagao", exact: true })
    .focus();
  await page.keyboard.press("Enter");
  await page.getByRole("radio", { name: /day 2.*a little local life/i }).check();
  await page.getByRole("radio", { name: /Before Your sunset table/ }).check();
  await page.getByRole("button", { name: "Preview move" }).click();
  await page.screenshot({
    path: "test-results/conflict-mobile.png",
    fullPage: false,
  });
  const conflictAudit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(conflictAudit.violations).toEqual([]);
  await page
    .getByRole("button", { name: /Move café earlier/ })
    .click();
  await page.getByRole("button", { name: "Inspect on map" }).click();
  await page.getByRole("button", { name: "Map", exact: true }).click();
  await expect(page.getByTestId("map")).toBeVisible();
  await expect(page.getByTestId("day-2")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
  await page.getByRole("button", { name: "Fit day" }).click();
  await page.getByRole("button", { name: /Stop 1: Little finds in Anjuna/ }).click();
  await page.getByRole("button", { name: "Timeline", exact: true }).click();
  await expect(page.locator("#activity-market")).toHaveAttribute("aria-pressed", "true");
  await expect(page.locator("#activity-market")).toBeVisible();
  await page.screenshot({
    path: "test-results/map-mobile.png",
    fullPage: true,
  });
  await page.getByRole("button", { name: "Review impact" }).click();
  await page.getByRole("button", { name: "Apply change", exact: true }).click();
  await expect(page.getByTestId("accepted-total")).toContainText("₹38,000");
  await expect(page.locator("#activity-cafe")).toBeFocused();
  await page
    .getByRole("button", { name: "Undo last change", exact: true })
    .click();
  await expect(page.getByTestId("accepted-total")).toContainText("₹37,600");
  await page.getByRole("button", { name: "Dismiss confirmation" }).click();
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.setViewportSize({ width: 320, height: 800 });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBeTruthy();
});

test("supporting routes remain readable and accessible on mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  for (const route of [
    "/",
    "/create",
    "/create/review",
    "/trip/goa",
    "/trip/goa/budget",
  ]) {
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
      .analyze();
    expect(audit.violations, route).toEqual([]);
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
      route,
    ).toBeTruthy();
  }
});
