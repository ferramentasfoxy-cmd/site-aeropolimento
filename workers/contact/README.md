# Aeropolimento — Contact Worker

Endpoint dos formulários do site (contato + revendedor). O site é static export
(sem backend próprio), então este Worker é quem valida e envia os e-mails.

- `GET /health` → `200 {status:"ok"}`
- `POST /api/contact` → processa **contato** ou **revendedor** (discriminado por `formType`)

Pipeline: CORS (allowlist) → honeypot → rate-limit por IP (KV, opcional) →
validação Zod → envio via **Resend**.

## Deploy

```bash
cd workers/contact
npm install

# 1. Secret da Resend (NÃO vai no wrangler.toml)
wrangler secret put RESEND_API_KEY      # cole a API key da conta Resend

# 2. (opcional) rate-limit por IP — cria o KV e cola o id no wrangler.toml
wrangler kv namespace create CONTACT_RATELIMIT

# 3. Ajuste as [vars] no wrangler.toml:
#    CONTACT_TO_EMAIL   = e-mail real que recebe os formulários
#    RESELLER_TO_EMAIL  = (opcional) destino separado de revenda
#    RESEND_FROM        = remetente com domínio verificado no Resend

# 4. Sobe o Worker
wrangler deploy
```

Após o deploy, o Wrangler imprime a URL pública
(`https://aeropolimento-contact.<subdomínio>.workers.dev`). Use-a no front:
defina `NEXT_PUBLIC_CONTACT_ENDPOINT=<url>/api/contact` no `.env` do site
(ver `.env.example` na raiz) e rebuilde o site.

## Pré-requisitos no Resend

1. Criar conta em resend.com.
2. **Verificar o domínio** `aeropolimento.com.br` (registros SPF/DKIM no DNS) —
   sem isso o `RESEND_FROM` é recusado.
3. Gerar a API key e colocá-la via `wrangler secret put RESEND_API_KEY`.

## Dev / testes

```bash
npm run dev        # wrangler dev local
npm test           # vitest (validação, honeypot, guarda de config)
npm run typecheck  # tsc --noEmit
```
