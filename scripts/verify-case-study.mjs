import { chromium } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";
import { mkdir } from "node:fs/promises";

await mkdir("test-results", { recursive: true });
const browser = await chromium.launch({
  headless: true,
  executablePath:
    process.env.CHROME_PATH ??
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
});

const viewports = [
  { name: "phone-320", width: 320, height: 720 },
  { name: "phone-375", width: 375, height: 812 },
  { name: "phone-390", width: 390, height: 844 },
  { name: "tablet-768", width: 768, height: 1024 },
  { name: "laptop-1024", width: 1024, height: 768 },
  { name: "desktop-1440", width: 1440, height: 1000 },
  { name: "wide-1920", width: 1920, height: 1080 },
];

for (const viewport of viewports) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
  });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3000/work/yatra", {
    waitUntil: "domcontentloaded",
  });
  await page.getByRole("heading", { name: /Every great journey/ }).waitFor();

  const pageHeight = await page.evaluate(() => document.documentElement.scrollHeight);
  for (let y = 0; y < pageHeight; y += Math.max(480, viewport.height * 0.75)) {
    await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
    await page.waitForTimeout(35);
  }

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth,
  );
  if (overflow) {
    throw new Error(`${viewport.name} case study has horizontal overflow`);
  }

  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  if (audit.violations.length) {
    const details = audit.violations
      .flatMap((violation) =>
        violation.nodes.map(
          (node) =>
            `${violation.id}: ${node.target.join(" ")} — ${node.failureSummary}`,
        ),
      )
      .join("\n");
    throw new Error(`${viewport.name} accessibility violations:\n${details}`);
  }

  if (viewport.name === "phone-390" || viewport.name === "desktop-1440") {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `test-results/yatra-case-study-${viewport.name}.png`,
      fullPage: false,
    });
    if (viewport.name === "desktop-1440") {
      await page.emulateMedia({ media: "print", reducedMotion: "reduce" });
      await page.pdf({
        path: "test-results/YATRA-case-study-static.pdf",
        format: "A3",
        printBackground: true,
        margin: { top: "10mm", right: "8mm", bottom: "10mm", left: "8mm" },
      });
    }
  }

  await context.close();
}

const revisionContext = await browser.newContext({ viewport: { width: 1440, height: 1000 } });
const revisionPage = await revisionContext.newPage();
await revisionPage.goto("http://127.0.0.1:3000/work/yatra", { waitUntil: "domcontentloaded" });
await revisionPage.getByRole("heading", { name: /Every great journey/ }).waitFor();
const revisionSteps = revisionPage.locator("[data-revision-step]");
const expectedRevisionLabels = [
  "ACCEPTED PLAN · REVISION 1",
  "PROPOSAL · NOT APPLIED",
  "CONFLICT · 20 MINUTES",
  "PROPOSAL · CONFLICT CLEARED",
  "ACCEPTED PLAN · REVISION 2",
  "RESTORED · REVISION 1",
];
for (let index = 0; index < expectedRevisionLabels.length; index += 1) {
  const targetY = await revisionSteps.nth(index).evaluate(
    (element) => window.scrollY + element.getBoundingClientRect().top - window.innerHeight * 0.5,
  );
  await revisionPage.evaluate((nextY) => window.scrollTo(0, nextY), targetY);
  await revisionPage.waitForTimeout(520);
  const label = await revisionPage.locator("[data-revision-status] span").textContent();
  if (label?.trim() !== expectedRevisionLabels[index]) {
    throw new Error(`Revision story step ${index + 1} did not activate: ${label}`);
  }
}
const firstStepY = await revisionSteps.first().evaluate(
  (element) => window.scrollY + element.getBoundingClientRect().top - window.innerHeight * 0.5,
);
await revisionPage.evaluate((nextY) => window.scrollTo(0, nextY), firstStepY);
await revisionPage.waitForTimeout(520);
const restoredBackwardLabel = await revisionPage.locator("[data-revision-status] span").textContent();
if (restoredBackwardLabel?.trim() !== expectedRevisionLabels[0]) {
  throw new Error(`Revision story did not reverse on upward scroll: ${restoredBackwardLabel}`);
}
await revisionContext.close();

const legacyContext = await browser.newContext({ viewport: { width: 1024, height: 768 } });
const legacyPage = await legacyContext.newPage();
await legacyPage.goto("http://127.0.0.1:3000/case-study", {
  waitUntil: "domcontentloaded",
});
if (!legacyPage.url().endsWith("/work/yatra")) {
  throw new Error(`Legacy route did not redirect: ${legacyPage.url()}`);
}
await legacyContext.close();

await browser.close();
