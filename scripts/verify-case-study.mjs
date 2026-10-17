import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

await mkdir("test-results", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath: process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

for (const viewport of [
  { name: "desktop", width: 1440, height: 1000 },
  { name: "mobile", width: 390, height: 844 },
]) {
  const context = await browser.newContext({ viewport: { width: viewport.width, height: viewport.height } });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/case-study", { waitUntil: "domcontentloaded" });
  await page.getByRole("heading", { name: /Great trips begin/ }).waitFor();
  await page.waitForTimeout(600);
  await page.screenshot({ path: `test-results/case-study-${viewport.name}.png`, fullPage: true });
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth > innerWidth);
  if (overflow) throw new Error(`${viewport.name} case study has horizontal overflow`);
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  if (audit.violations.length) {
    const details = audit.violations
      .flatMap((violation) => violation.nodes.map((node) => `${violation.id}: ${node.target.join(" ")} — ${node.failureSummary}`))
      .join("\n");
    throw new Error(`${viewport.name} accessibility violations:\n${details}`);
  }
  await context.close();
}

await browser.close();
