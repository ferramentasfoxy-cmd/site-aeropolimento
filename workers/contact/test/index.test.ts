/**
 * Smoke tests for the Contact Worker (Phase 1 FUND-05 gate).
 *
 * API 2026: uses `exports` from 'cloudflare:workers' (not SELF binding).
 * Requires explicit `import '../src/index'` so Vitest picks up changes
 * to the Worker source during watch mode.
 */
import { exports } from 'cloudflare:workers'
import { describe, expect, it } from 'vitest'
// Required in 2026: enables Vitest watch mode to rerun on src changes.
import '../src/index'

describe('Contact Worker — smoke tests (Phase 1 scaffold)', () => {
  it('GET /health returns 200 with {status: "ok"}', async () => {
    const response = await exports.default.fetch(
      new Request('https://example.com/health')
    )
    expect(response.status).toBe(200)
    const body = await response.json()
    expect(body).toEqual({ status: 'ok' })
  })

  it('POST /api/contact returns 501 (stub — Phase 4 FORM-01 fills this in)', async () => {
    const response = await exports.default.fetch(
      new Request('https://example.com/api/contact', {
        method: 'POST',
        body: JSON.stringify({ name: 'x', email: 'y@z.com', message: 'test' }),
        headers: { 'content-type': 'application/json' },
      })
    )
    expect(response.status).toBe(501)
  })
})
