import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

describe("schedule card interaction styles", () => {
  const css = readFileSync(resolve(process.cwd(), "client/src/index.css"), "utf8");
  const home = readFileSync(resolve(process.cwd(), "client/src/pages/Home.tsx"), "utf8");

  it("includes hover lift, deeper shadow, and reduced-motion safeguards", () => {
    expect(css).toContain(".schedule-card:hover");
    expect(css).toContain("translateY(-6px)");
    expect(css).toContain("box-shadow: 0 18px 36px");
    expect(css).toContain("prefers-reduced-motion: reduce");
    expect(css).toContain(".schedule-card:focus-visible");
    expect(css).toContain(".schedule-card:focus-within");
  });

  it("keeps schedule cards keyboard-focusable", () => {
    expect(home).toContain('tabIndex={0} aria-label="11:30 AM Reception"');
    expect(home).toContain('tabIndex={0} aria-label="12:00 PM Ceremony and Luncheon"');
  });
});
