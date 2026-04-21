/**
 * Module augmentation for `cloudflare:workers` / `ctx.exports` typing.
 *
 * Cloudflare Workers runtime ships `exports` under `cloudflare:workers`, but
 * its shape is driven by `Cloudflare.GlobalProps.mainModule`. Declaring this
 * here makes `exports.default` resolve to our Hono app (`./src/index`) — so
 * `exports.default.fetch(new Request(...))` typechecks in tests.
 *
 * Reference: node_modules/@cloudflare/workers-types/.../index.d.ts §Cloudflare.GlobalProps
 * Phase 4 (FORM-01) may add `durableNamespaces` if we adopt Durable Objects.
 */
declare global {
  namespace Cloudflare {
    interface GlobalProps {
      mainModule: typeof import('./src/index')
    }
  }
}

export {}
