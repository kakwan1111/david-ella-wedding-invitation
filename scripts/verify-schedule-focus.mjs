import { chromium } from "playwright";

const browser = await chromium.launch({
  headless: true,
  executablePath: "/usr/bin/chromium",
  args: ["--no-sandbox"],
});

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
  await page.goto("http://127.0.0.1:3000/", { waitUntil: "networkidle" });
  await page.keyboard.press("Tab");

  let focusedCard = null;
  for (let index = 0; index < 40; index += 1) {
    focusedCard = await page.evaluate(() => {
      const element = document.activeElement;
      if (!(element instanceof HTMLElement) || !element.matches(".schedule-card")) return null;
      const styles = getComputedStyle(element);
      return {
        label: element.getAttribute("aria-label"),
        focusVisible: element.matches(":focus-visible"),
        outlineStyle: styles.outlineStyle,
        outlineWidth: styles.outlineWidth,
        transform: styles.transform,
      };
    });

    if (focusedCard) break;
    await page.keyboard.press("Tab");
  }

  if (!focusedCard) throw new Error("Keyboard Tab did not reach a schedule card");
  if (!focusedCard.focusVisible) throw new Error("Focused schedule card did not match :focus-visible");
  if (focusedCard.outlineStyle === "none" || focusedCard.outlineWidth === "0px") {
    throw new Error("Focused schedule card did not show a visible focus outline");
  }

  await page.screenshot({ path: "/home/ubuntu/screenshots/schedule-card-focus-visible.png", fullPage: false });
  console.log(JSON.stringify(focusedCard, null, 2));
} finally {
  await browser.close();
}
