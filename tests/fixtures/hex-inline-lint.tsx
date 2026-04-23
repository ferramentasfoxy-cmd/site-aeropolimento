// tests/fixtures/hex-inline-lint.tsx
//
// DS-02 FIXTURE — This file INTENTIONALLY violates the hex-inline lint rule.
//
// Rule: eslint.config.mjs → no-restricted-syntax → 4 selectors (see RESEARCH §4).
// Verification: `npm run lint:fixture` MUST report errors (non-zero exit code).
// If it prints < 5 distinct errors, the rule has a gap — document in 02-04-SUMMARY.md
// and consider Option B fallback (@poupe/eslint-plugin-tailwindcss) per D-09.
//
// DO NOT add `/* eslint-disable */` — we WANT errors here.
// Excluded from production build via eslint.config.mjs `files` scope:
// the rule is scoped to both `src/**/*.{ts,tsx}` AND `tests/**/*.{ts,tsx}`,
// so the fixture is intentionally caught and reported.

import { cn } from "@/lib/utils";

export function HexInlineLintFixture() {
  return (
    <div>
      {/* Variant 1 — JSX className arbitrary-value (most common violation) */}
      <div className="bg-[#BD1622]">hex in className literal</div>

      {/* Variant 2 — cn() call with string-literal arg */}
      <div className={cn("text-[#000000]", "p-4")}>hex in cn() arg</div>

      {/* Variant 3 — template literal static part */}
      <div className={`border-[#FF00FF]`}>hex in template literal</div>

      {/* Variant 4 — SVG fill="#..." attribute */}
      <svg width="10" height="10" viewBox="0 0 10 10">
        <path fill="#ffffff" d="M0 0h10v10H0z" />
      </svg>

      {/* Variant 5 — inline style object with hex literal */}
      <div style={{ color: "#BD1622", backgroundColor: "#0F0F0F" }}>
        hex in inline style
      </div>
    </div>
  );
}
