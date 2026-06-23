/**
 * Tests do Contact Worker (FORM-01).
 *
 * API 2026: usa `exports` de 'cloudflare:workers' (não SELF binding).
 * Requer `import '../src/index'` explícito para o Vitest pegar mudanças
 * no source durante watch mode.
 *
 * Nota: o caminho de SUCESSO de envio chama a Resend API (rede real) e exige
 * RESEND_API_KEY — não coberto aqui de propósito. Estes testes validam a
 * lógica determinística do worker (roteamento, validação, honeypot, guarda
 * de config), que é onde moram os bugs.
 */
import { exports } from 'cloudflare:workers'
import { describe, expect, it } from 'vitest'
import '../src/index'

function post(body: unknown) {
  return exports.default.fetch(
    new Request('https://example.com/api/contact', {
      method: 'POST',
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
    })
  )
}

const contatoValido = {
  formType: 'contato',
  nome: 'João Silva',
  email: 'joao@empresa.com',
  telefone: '+55 31 99999-0000',
  mensagem: 'Gostaria de um orçamento para polimento de fuselagem.',
}

describe('Contact Worker — FORM-01', () => {
  it('GET /health retorna 200 {status:"ok"}', async () => {
    const res = await exports.default.fetch(new Request('https://example.com/health'))
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ status: 'ok' })
  })

  it('rejeita JSON malformado com 400', async () => {
    const res = await exports.default.fetch(
      new Request('https://example.com/api/contact', {
        method: 'POST',
        body: '{ não é json',
        headers: { 'content-type': 'application/json' },
      })
    )
    expect(res.status).toBe(400)
  })

  it('rejeita payload inválido com 400 (validação Zod)', async () => {
    const res = await post({ formType: 'contato', nome: 'x', email: 'nao-email' })
    expect(res.status).toBe(400)
    const body = (await res.json()) as { ok: boolean }
    expect(body.ok).toBe(false)
  })

  it('rejeita formType desconhecido com 400', async () => {
    const res = await post({ formType: 'outro', foo: 'bar' })
    expect(res.status).toBe(400)
  })

  it('honeypot preenchido retorna 200 fake sem enviar', async () => {
    const res = await post({ ...contatoValido, _gotcha: 'sou-um-bot' })
    expect(res.status).toBe(200)
    expect(await res.json()).toEqual({ ok: true })
  })

  it('payload válido sem RESEND_API_KEY falha com 500 (guarda de config)', async () => {
    // No ambiente de teste só há as [vars] do wrangler.toml; o secret
    // RESEND_API_KEY não existe -> a guarda de config dispara após a validação.
    const res = await post(contatoValido)
    expect(res.status).toBe(500)
  })

  it('revendedor válido também passa pela validação (chega na guarda de config)', async () => {
    const res = await post({
      formType: 'revendedor',
      empresa: 'Aviação Brasil LTDA',
      cnpj: '12.345.678/0001-90',
      regiao: 'Sudeste',
      emailResponsavel: 'compras@aviacaobrasil.com',
    })
    expect(res.status).toBe(500)
  })
})
