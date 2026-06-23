/**
 * Aeropolimento Contact Worker — FORM-01
 *
 * Endpoint real dos formulários do site (static export não tem backend próprio):
 * - GET  /health       -> 200 {status:'ok'}            (smoke test)
 * - POST /api/contact  -> processa contato OU revendedor (discriminado por formType)
 *
 * Pipeline de /api/contact:
 *   1. CORS (allowlist de origens conhecidas)
 *   2. Honeypot — campo oculto preenchido = bot -> 200 fake (engana sem enviar)
 *   3. Rate-limit por IP via KV (opcional: só roda se o binding existir)
 *   4. Validação Zod (discriminated union contato | revendedor)
 *   5. Envio via Resend API -> e-mail institucional, reply_to do remetente
 *
 * Secrets/vars (wrangler):
 *   RESEND_API_KEY     (secret)  -> wrangler secret put RESEND_API_KEY
 *   CONTACT_TO_EMAIL   (var)     -> destino dos dois forms (ou só contato)
 *   RESELLER_TO_EMAIL  (var, opc)-> destino separado de revenda (default: CONTACT_TO_EMAIL)
 *   RESEND_FROM        (var)     -> remetente verificado, ex: "Aeropolimento <site@aeropolimento.com.br>"
 *   CONTACT_RATELIMIT  (KV, opc) -> rate-limit por IP
 */
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { z } from 'zod'

type Bindings = {
  RESEND_API_KEY: string
  CONTACT_TO_EMAIL: string
  RESELLER_TO_EMAIL?: string
  RESEND_FROM: string
  CONTACT_RATELIMIT?: KVNamespace
}

// Origens autorizadas a chamar o worker (site institucional + dev local).
const ALLOWED_ORIGINS = [
  'https://aeropolimento.com.br',
  'https://www.aeropolimento.com.br',
  'https://aeropolimento.pages.dev',
  'http://localhost:3000',
]

// Rate-limit: máx N envios por IP dentro da janela (segundos).
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 10 // 10 min

const app = new Hono<{ Bindings: Bindings }>()

// ── CORS — reflete a origem só se estiver na allowlist ──
app.use(
  '/api/*',
  cors({
    origin: (origin) => (ALLOWED_ORIGINS.includes(origin) ? origin : ''),
    allowMethods: ['POST', 'OPTIONS'],
    allowHeaders: ['Content-Type'],
    maxAge: 86400,
  })
)

// ── Smoke test (FUND-05 acceptance gate) ──
app.get('/health', (c) => c.json({ status: 'ok' }, 200))

// ─────────────────────────────────────────────────────────────
// Schemas — campos paralelos ao ContactSection (contato | revendedor).
// honeypot opcional em ambos; o campo "_gotcha" é o trap anti-bot.
// ─────────────────────────────────────────────────────────────
const baseHoneypot = { _gotcha: z.string().max(0).optional() }

const contatoSchema = z.object({
  formType: z.literal('contato'),
  nome: z.string().trim().min(2, 'Nome muito curto').max(120),
  email: z.string().trim().email('E-mail inválido').max(160),
  telefone: z.string().trim().min(8, 'Telefone inválido').max(40),
  mensagem: z.string().trim().min(5, 'Mensagem muito curta').max(4000),
  ...baseHoneypot,
})

const revendedorSchema = z.object({
  formType: z.literal('revendedor'),
  empresa: z.string().trim().min(2, 'Empresa inválida').max(160),
  cnpj: z.string().trim().min(11, 'CNPJ inválido').max(20),
  regiao: z.string().trim().min(2, 'Região inválida').max(120),
  emailResponsavel: z.string().trim().email('E-mail inválido').max(160),
  ...baseHoneypot,
})

const payloadSchema = z.discriminatedUnion('formType', [contatoSchema, revendedorSchema])
type Payload = z.infer<typeof payloadSchema>

// ── Escapa HTML pra não injetar markup no e-mail ──
function esc(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function renderRow(label: string, value: string): string {
  return `<tr>
    <td style="padding:8px 12px;font:600 12px/1.4 monospace;color:#737373;text-transform:uppercase;letter-spacing:.08em;vertical-align:top;white-space:nowrap">${label}</td>
    <td style="padding:8px 12px;font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;color:#171717">${esc(value)}</td>
  </tr>`
}

function buildEmail(p: Payload): { subject: string; html: string; replyTo: string } {
  if (p.formType === 'contato') {
    return {
      subject: `[Site] Novo contato — ${p.nome}`,
      replyTo: p.email,
      html: emailShell(
        'Novo contato comercial',
        renderRow('Nome', p.nome) +
          renderRow('E-mail', p.email) +
          renderRow('Telefone', p.telefone) +
          renderRow('Mensagem', p.mensagem)
      ),
    }
  }
  return {
    subject: `[Site] Solicitação de revenda — ${p.empresa}`,
    replyTo: p.emailResponsavel,
    html: emailShell(
      'Solicitação para revenda B2B',
      renderRow('Empresa', p.empresa) +
        renderRow('CNPJ', p.cnpj) +
        renderRow('Região', p.regiao) +
        renderRow('E-mail responsável', p.emailResponsavel)
    ),
  }
}

function emailShell(title: string, rows: string): string {
  return `<!doctype html><html><body style="margin:0;background:#fafafa;padding:32px">
    <table style="max-width:560px;margin:0 auto;background:#fff;border:1px solid #e5e5e5;border-radius:8px;overflow:hidden">
      <tr><td style="background:#171717;padding:20px 24px">
        <span style="font:700 13px/1 monospace;color:#fff;letter-spacing:.12em;text-transform:uppercase">AEROPOLIMENTO</span>
        <span style="font:600 11px/1 monospace;color:#bd1622;letter-spacing:.12em;margin-left:8px">${esc(title)}</span>
      </td></tr>
      <tr><td style="padding:8px 12px"><table style="width:100%;border-collapse:collapse">${rows}</table></td></tr>
      <tr><td style="padding:14px 24px;border-top:1px solid #eee;font:400 11px/1.4 monospace;color:#a3a3a3">
        Enviado pelo formulário de aeropolimento.com.br
      </td></tr>
    </table></body></html>`
}

// ── Rate-limit por IP (no-op se o KV não estiver bindado) ──
async function isRateLimited(c: { req: { header: (k: string) => string | undefined }; env: Bindings }): Promise<boolean> {
  const kv = c.env.CONTACT_RATELIMIT
  if (!kv) return false
  const ip = c.req.header('CF-Connecting-IP') ?? 'unknown'
  const key = `rl:${ip}`
  const current = parseInt((await kv.get(key)) ?? '0', 10)
  if (current >= RATE_LIMIT_MAX) return true
  await kv.put(key, String(current + 1), { expirationTtl: RATE_LIMIT_WINDOW })
  return false
}

// ── POST /api/contact ──
app.post('/api/contact', async (c) => {
  // 1. Body JSON
  let raw: unknown
  try {
    raw = await c.req.json()
  } catch {
    return c.json({ ok: false, error: 'JSON inválido' }, 400)
  }

  // 2. Honeypot — bot preencheu o trap: finge sucesso, não envia nada.
  if (raw && typeof raw === 'object' && '_gotcha' in raw && (raw as { _gotcha?: unknown })._gotcha) {
    return c.json({ ok: true }, 200)
  }

  // 3. Rate-limit por IP
  if (await isRateLimited(c)) {
    return c.json({ ok: false, error: 'Muitas tentativas. Tente novamente em alguns minutos.' }, 429)
  }

  // 4. Validação
  const parsed = payloadSchema.safeParse(raw)
  if (!parsed.success) {
    return c.json({ ok: false, error: 'Dados inválidos', issues: parsed.error.flatten() }, 400)
  }
  const payload = parsed.data

  // 5. Config presente?
  if (!c.env.RESEND_API_KEY || !c.env.RESEND_FROM || !c.env.CONTACT_TO_EMAIL) {
    console.error('[contact] Variáveis ausentes (RESEND_API_KEY/RESEND_FROM/CONTACT_TO_EMAIL)')
    return c.json({ ok: false, error: 'Serviço de e-mail não configurado' }, 500)
  }

  const to =
    payload.formType === 'revendedor' && c.env.RESELLER_TO_EMAIL
      ? c.env.RESELLER_TO_EMAIL
      : c.env.CONTACT_TO_EMAIL

  const { subject, html, replyTo } = buildEmail(payload)

  // 6. Envio via Resend
  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${c.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: c.env.RESEND_FROM,
        to: [to],
        reply_to: replyTo,
        subject,
        html,
      }),
    })

    if (!res.ok) {
      const detail = await res.text()
      console.error('[contact] Resend falhou', res.status, detail)
      return c.json({ ok: false, error: 'Não foi possível enviar agora' }, 502)
    }
  } catch (err) {
    console.error('[contact] Erro de rede ao chamar Resend', err)
    return c.json({ ok: false, error: 'Não foi possível enviar agora' }, 502)
  }

  return c.json({ ok: true }, 200)
})

export default app
