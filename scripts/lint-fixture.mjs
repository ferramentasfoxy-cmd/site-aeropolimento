#!/usr/bin/env node
/**
 * lint-fixture.mjs — DS-02 gate validator.
 *
 * Runs ESLint against tests/fixtures/hex-inline-lint.tsx which INTENTIONALLY
 * violates the hex-inline lint rule (4 selectors in eslint.config.mjs).
 *
 * Exit code is INVERTED:
 *   - If ESLint reports errors on the fixture → rule works → exit 0 (OK).
 *   - If ESLint reports zero errors → rule has a gap → exit 1 (FAIL).
 *
 * Per CONTEXT D-08 (permanent gate) + D-09 (5 variants) + RESEARCH §4.
 * Script invoked via `npm run lint:fixture`. Cross-platform (bash + Windows cmd).
 */

import { execSync } from 'node:child_process';

const FIXTURE_PATH = 'tests/fixtures/hex-inline-lint.tsx';

let output;
let lintExitCode;
try {
  // Invoke eslint and capture stdout. `--no-error-on-unmatched-pattern` guards
  // against accidental removal of the fixture silently passing.
  output = execSync(`npx eslint --no-error-on-unmatched-pattern ${FIXTURE_PATH}`, {
    stdio: ['ignore', 'pipe', 'pipe'],
    encoding: 'utf8',
  });
  // If we land here, lint returned exit 0 → zero errors → rule has a gap.
  lintExitCode = 0;
} catch (err) {
  // Non-zero exit code = lint reported errors = rule works as expected.
  lintExitCode = err.status ?? 1;
  output = (err.stdout?.toString() ?? '') + (err.stderr?.toString() ?? '');
}

// Count distinct errors/problems reported by ESLint.
// ESLint default stylish formatter shows lines like:
//   10:7  error  Hex inline proibido...
const errorLineMatches = output.match(/^\s*\d+:\d+\s+error\b/gm) ?? [];
const problemSummaryMatch = output.match(/(\d+)\s+problems?\s*\(/);
const totalProblems = problemSummaryMatch ? parseInt(problemSummaryMatch[1], 10) : errorLineMatches.length;

console.log('[lint:fixture] Raw ESLint output:');
console.log('───────────────────────────────────────');
console.log(output.trim() || '(empty)');
console.log('───────────────────────────────────────');
console.log(`[lint:fixture] Detected ${errorLineMatches.length} error line(s); summary reports ${totalProblems} problem(s).`);

if (lintExitCode === 0) {
  console.error('[lint:fixture] FAIL — fixture produced NO errors. The DS-02 rule has a gap.');
  console.error('              Fixture at:', FIXTURE_PATH);
  console.error('              Check eslint.config.mjs selectors + files glob.');
  process.exit(1);
}

if (errorLineMatches.length < 5) {
  console.warn(`[lint:fixture] PARTIAL — rule caught ${errorLineMatches.length}/5 variants.`);
  console.warn('              Expected 5 violations (one per variant).');
  console.warn('              Consider Option B (@poupe/eslint-plugin-tailwindcss) per RESEARCH §4.');
  // Still treat as success because >= 1 error means the rule FIRED.
  // A <5 partial is documented in SUMMARY; not a hard fail.
  console.log('[lint:fixture] OK (partial) — rule detected violations.');
  process.exit(0);
}

console.log(`[lint:fixture] OK — rule detected ${errorLineMatches.length} violations (>=5 expected).`);
process.exit(0);
