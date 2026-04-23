import { defineConfig, globalIgnores } from "eslint/config";
import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,

  // ═══════════════════════════════════════════════════════════════
  // DS-02 — Ban hex inline values across src/ and tests/
  // Per UI-SPEC §4.5 + RESEARCH §4. Gate permanente per CONTEXT D-08.
  // Fixture: tests/fixtures/hex-inline-lint.tsx (intentionally violates;
  //   `npm run lint:fixture` MUST report errors).
  // ═══════════════════════════════════════════════════════════════
  {
    files: ["src/**/*.{ts,tsx}", "tests/**/*.{ts,tsx}"],
    rules: {
      "no-restricted-syntax": [
        "error",
        {
          // Selector 1 — JSX className string literal OR cn() string-literal arg.
          // Catches: className="bg-[#BD1622]"  |  cn("text-[#000000]", ...)
          selector:
            "Literal[value=/(?:bg|text|border|fill|stroke)-\\[#[0-9a-fA-F]{3,8}\\]/]",
          message:
            "Hex inline proibido. Use utilities do design system (bg-aero-red, text-[var(--color-text-primary)]) ou CSS var. Ver UI-SPEC §4 + REQUIREMENTS.md DS-02.",
        },
        {
          // Selector 2 — Template literal static part (tagged and untagged).
          // Catches: className={`bg-[#BD1622]`}
          selector:
            "TemplateElement[value.raw=/(?:bg|text|border|fill|stroke)-\\[#[0-9a-fA-F]{3,8}\\]/]",
          message:
            "Hex inline proibido (template literal). Use utility class ou CSS var. Ver DS-02.",
        },
        {
          // Selector 3 — SVG JSX attribute fill="#..." or stroke="#..."
          // Catches: <path fill="#ffffff" />
          selector:
            "JSXAttribute[name.name=/^(fill|stroke)$/][value.value=/^#[0-9a-fA-F]{3,8}$/]",
          message:
            "SVG fill/stroke com hex inline proibido. Use currentColor + className, ou style={{ fill: 'var(--color-*)' }}.",
        },
        {
          // Selector 4 — Inline style object with hex Literal value (Option A, RESEARCH §4).
          // Catches: style={{ color: '#BD1622' }}
          selector:
            "JSXExpressionContainer > ObjectExpression Property[value.type='Literal'][value.value=/^#[0-9a-fA-F]{3,8}$/]",
          message:
            "Hex literal em inline style proibido. Use CSS var: style={{ color: 'var(--color-aero-red)' }} ou migre para className.",
        },
      ],
    },
  },

  // Override default ignores of eslint-config-next.
  globalIgnores([
    // Default ignores of eslint-config-next:
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
]);

export default eslintConfig;
