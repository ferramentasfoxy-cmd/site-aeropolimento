'use client';

interface TechBackgroundProps {
  /** 'light' para seções #FAFAFA, 'dark' para #0F0F0F (ex.: Anac) */
  variant?: 'light' | 'dark';
  /** centro do respiro/glow (CSS position), ex.: "72% 44%" */
  focus?: string;
  /** mostra o glow radial (respiro) atrás do conteúdo focal */
  glow?: boolean;
  /**
   * Intensidade do respiro radial (0–1). Omitido = default sutil por variante
   * (0.4 light / 0.05 dark). A Hero usa um valor mais alto (protagonista);
   * as demais seções herdam o default sutil = coesão sem competir com a Hero.
   */
  glowOpacity?: number;
}

/**
 * Atmosfera suave compartilhada: glow radial (respiro) + vignette sutil.
 * SEM grade blueprint (removida a pedido — profundidade vem só da luz).
 * Fonte ÚNICA da verdade pro tratamento de fundo — evita divergência entre seções.
 *
 * Uso: colocar como PRIMEIRO filho de uma `<section className="relative ...">`.
 * É puramente decorativo (-z-10 + pointer-events-none), então o conteúdo da
 * seção fica por cima sem precisar de ajuste de z-index.
 */
export function TechBackground({
  variant = 'light',
  focus = '50% 42%',
  glow = true,
  glowOpacity,
}: TechBackgroundProps) {
  const dark = variant === 'dark';
  const go = glowOpacity ?? (dark ? 0.05 : 0.4);
  const glowColor = `rgba(255,255,255,${go})`;
  const vignetteColor = dark ? 'rgba(0,0,0,0.30)' : 'rgba(0,0,0,0.05)';

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Respiro radial opcional — profundidade suave pela luz */}
      {glow && (
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(circle 30vw at ${focus}, ${glowColor} 0%, transparent 70%)`,
          }}
        />
      )}
      {/* Vignette sutil — foca o olhar no conteúdo */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(82% 88% at 50% 44%, transparent 56%, ${vignetteColor} 100%)`,
        }}
      />
    </div>
  );
}
