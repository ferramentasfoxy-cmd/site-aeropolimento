/**
 * Aeropolimento Contact Worker
 *
 * Phase 1 (FUND-05) scaffold — handler Hono com:
 * - GET /health   -> 200 {status:'ok'}   (smoke test)
 * - POST /api/contact -> 501 Not Implemented (stub; Phase 4 FORM-01 preenche)
 *
 * Phase 4 estenderá Bindings (KV rate-limit, RESEND_API_KEY, etc.) e
 * substituirá o stub de /api/contact pela implementação real com
 * MailChannels + Zod validation + honeypot.
 */
import { Hono } from 'hono'

// Bindings estará vazio em Phase 1. Phase 4 vai adicionar:
//   CONTACT_RATELIMIT: KVNamespace
//   RESEND_API_KEY: string
//   MAILCHANNELS_DOMAIN: string
type Bindings = Record<string, never>

const app = new Hono<{ Bindings: Bindings }>()

// Smoke test endpoint (FUND-05 acceptance gate)
app.get('/health', (c) => c.json({ status: 'ok' }, 200))

// Stub — Phase 4 FORM-01 preenche com MailChannels + Zod + rate-limit + honeypot
app.post('/api/contact', (c) =>
  c.json({ error: 'Not Implemented' }, 501)
)

export default app
