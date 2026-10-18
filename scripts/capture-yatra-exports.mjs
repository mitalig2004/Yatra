import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";

const base = process.env.YATRA_URL ?? "http://127.0.0.1:3000/work/yatra";
const output = "exports/yatra-behance";
const chrome = process.env.CHROME_PATH ?? "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";

await mkdir(output, { recursive: true });
const browser = await chromium.launch({ headless: true, executablePath: chrome });
const context = await browser.newContext({
  viewport: { width: 1600, height: 1000 },
  deviceScaleFactor: 1,
  reducedMotion: "reduce",
});
const page = await context.newPage();
await page.emulateMedia({ reducedMotion: "reduce" });
await page.goto(base, { waitUntil: "networkidle" });
await page.getByRole("heading", { name: /Every great journey/ }).waitFor();
await page.addStyleTag({ content: ".skip-link{display:none!important}" });

const height = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < height; y += 760) {
  await page.evaluate((nextY) => window.scrollTo(0, nextY), y);
  await page.waitForTimeout(55);
}
await page.evaluate(() => window.scrollTo(0, 0));
await page.waitForTimeout(350);

await page.screenshot({ path: `${output}/00-project-cover.png` });
await page.screenshot({
  path: `${output}/00-behance-thumbnail.png`,
  clip: { x: 0, y: 84, width: 808, height: 632 },
});

const panels = [
  ["02-project-overview", "02-overview"],
  ["03-planning-problem", "03-problem"],
  ["04-research-and-competition", "04-research"],
  ["05-journey-and-architecture", "05-journey-map"],
  ["06-wireframes-and-decisions", "06-wireframes"],
  ["07-brand-and-illustrations", "07-identity"],
  ["08-authentic-product", "08-product"],
  ["09-signature-revision-story", "09-revision"],
  ["10-details-and-accessibility", "10-details"],
  ["11-responsive-showcase", "11-responsive"],
  ["12-refinement-and-validation", "12-refinement"],
  ["13-outcomes-and-reflection", "13-closing"],
];

for (const [file, key] of panels) {
  const element = page.locator(`[data-export-panel="${key}"]`);
  await element.scrollIntoViewIfNeeded();
  await page.waitForTimeout(100);
  await element.screenshot({ path: `${output}/${file}.png`, animations: "disabled" });
  console.log(file);
}

await browser.close();
