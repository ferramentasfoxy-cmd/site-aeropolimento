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
 *   5. Envio via Cloudflare Email Sending (binding `EMAIL`) -> e-mail institucional,
 *      reply_to do remetente. Sem API key: a autorização vem do domínio onboardado
 *      (`wrangler email sending enable aeropolimentoprodutos.com.br` / dashboard).
 *
 * Vars/bindings (wrangler.toml):
 *   EMAIL             (send_email binding) -> envio nativo Cloudflare
 *   CONTACT_TO_EMAIL  (var)     -> destino dos dois forms (ou só contato)
 *   RESELLER_TO_EMAIL (var, opc)-> destino separado de revenda (default: CONTACT_TO_EMAIL)
 *   EMAIL_FROM        (var)     -> remetente no domínio onboardado, ex: formulario@aeropolimentoprodutos.com.br
 *   EMAIL_FROM_NAME   (var, opc)-> nome amigável do remetente
 *   CONTACT_RATELIMIT (KV, opc) -> rate-limit por IP
 */
import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { z } from 'zod'

// Binding de envio nativo da Cloudflare (Email Sending, API por objeto).
interface EmailSendBinding {
  send(message: {
    to: string | string[]
    from: { email: string; name?: string }
    replyTo?: string
    subject: string
    html: string
    text: string
  }): Promise<{ messageId: string }>
}

type Bindings = {
  EMAIL: EmailSendBinding
  CONTACT_TO_EMAIL: string
  RESELLER_TO_EMAIL?: string
  EMAIL_FROM: string
  EMAIL_FROM_NAME?: string
  CONTACT_RATELIMIT?: KVNamespace
}

// Origens autorizadas: domínio institucional real + qualquer deploy do projeto
// Pages (produção e previews *.aeropolimento.pages.dev) + dev local.
const ALLOWED_EXACT = new Set([
  'https://aeropolimentoprodutos.com.br',
  'https://www.aeropolimentoprodutos.com.br',
  'http://localhost:3000',
])
function isAllowedOrigin(origin: string): boolean {
  if (ALLOWED_EXACT.has(origin)) return true
  // produção alias + previews do Cloudflare Pages deste projeto
  return /^https:\/\/([a-z0-9-]+\.)?aeropolimento\.pages\.dev$/.test(origin)
}

// Rate-limit: máx N envios por IP dentro da janela (segundos).
const RATE_LIMIT_MAX = 5
const RATE_LIMIT_WINDOW = 60 * 10 // 10 min

const app = new Hono<{ Bindings: Bindings }>()

// ── CORS — reflete a origem só se estiver na allowlist ──
app.use(
  '/api/*',
  cors({
    origin: (origin) => (origin && isAllowedOrigin(origin) ? origin : ''),
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

function buildEmail(p: Payload): { subject: string; html: string; text: string; replyTo: string } {
  if (p.formType === 'contato') {
    const fields: [string, string][] = [
      ['Nome', p.nome],
      ['E-mail', p.email],
      ['Telefone', p.telefone],
      ['Mensagem', p.mensagem],
    ]
    return {
      subject: `[Site] Novo contato — ${p.nome}`,
      replyTo: p.email,
      html: emailShell('Novo contato comercial', fields.map(([l, v]) => renderRow(l, v)).join('')),
      text: `Novo contato comercial\n\n${fields.map(([l, v]) => `${l}: ${v}`).join('\n')}`,
    }
  }
  const fields: [string, string][] = [
    ['Empresa', p.empresa],
    ['CNPJ', p.cnpj],
    ['Região', p.regiao],
    ['E-mail responsável', p.emailResponsavel],
  ]
  return {
    subject: `[Site] Solicitação de revenda — ${p.empresa}`,
    replyTo: p.emailResponsavel,
    html: emailShell('Solicitação para revenda B2B', fields.map(([l, v]) => renderRow(l, v)).join('')),
    text: `Solicitação para revenda B2B\n\n${fields.map(([l, v]) => `${l}: ${v}`).join('\n')}`,
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
        Enviado pelo formulário de aeropolimentoprodutos.com.br
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
  if (!c.env.EMAIL || !c.env.EMAIL_FROM || !c.env.CONTACT_TO_EMAIL) {
    console.error('[contact] Config ausente (EMAIL binding / EMAIL_FROM / CONTACT_TO_EMAIL)')
    return c.json({ ok: false, error: 'Serviço de e-mail não configurado' }, 500)
  }

  const to =
    payload.formType === 'revendedor' && c.env.RESELLER_TO_EMAIL
      ? c.env.RESELLER_TO_EMAIL
      : c.env.CONTACT_TO_EMAIL

  const { subject, html, text, replyTo } = buildEmail(payload)

  // 6. Envio via Cloudflare Email Sending
  try {
    await c.env.EMAIL.send({
      to,
      from: { email: c.env.EMAIL_FROM, name: c.env.EMAIL_FROM_NAME || 'Site Aeropolimento' },
      replyTo,
      subject,
      html,
      text,
    })
  } catch (err) {
    const code = (err as { code?: string; message?: string })?.code
    console.error('[contact] Falha no envio (Email Sending)', code, (err as { message?: string })?.message)
    return c.json({ ok: false, error: 'Não foi possível enviar agora' }, 502)
  }

  return c.json({ ok: true }, 200)
})

export default app
