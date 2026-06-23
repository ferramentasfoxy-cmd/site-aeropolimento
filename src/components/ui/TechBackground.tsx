'use client';

interface TechBackgroundProps {
  /** 'light' para seções #FAFAFA, 'dark' para #0F0F0F (ex.: Anac) */
  variant?: 'light' | 'dark';
  /** centro do respiro do grid + glow (CSS position), ex.: "72% 44%" */
  focus?: string;
  /** mostra o glow radial (respiro) atrás do conteúdo focal */
  glow?: boolean;
}

/**
 * Atmosfera técnica compartilhada ("nível Hero"): grid blueprint mascarado que
 * "respira" no foco + glow radial opcional + vignette sutil. Fonte ÚNICA da
 * verdade pro tratamento de fundo — evita divergência entre seções.
 *
 * Uso: colocar como PRIMEIRO filho de uma `<section className="relative ...">`.
 * É puramente decorativo (-z-10 + pointer-events-none), então o conteúdo da
 * seção fica por cima sem precisar de ajuste de z-index.
 */
export function TechBackground({
  variant = 'light',
  focus = '50% 42%',
  glow = true,
}: TechBackgroundProps) {
  const dark = variant === 'dark';
  const line = dark ? 'rgba(255,255,255,1)' : 'rgba(0,0,0,1)';
  const glowColor = dark ? 'rgba(255,255,255,0.05)' : 'rgba(255,255,255,0.85)';
  const vignetteColor = dark ? 'rgba(0,0,0,0.30)' : 'rgba(0,0,0,0.05)';
  const mask = `radial-gradient(ellipse 68% 64% at ${focus}, transparent 0%, transparent 32%, black 80%)`;

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Grid blueprint mascarado — respira no foco, aparece nas bordas */}
      <div
        className={dark ? 'absolute inset-0 opacity-[0.05]' : 'absolute inset-0 opacity-[0.06]'}
        style={{
          backgroundImage: `linear-gradient(to right, ${line} 1px, transparent 1px), linear-gradient(to bottom, ${line} 1px, transparent 1px)`,
          backgroundSize: '32px 32px',
          maskImage: mask,
          WebkitMaskImage: mask,
        }}
      />
      {/* Respiro radial opcional */}
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
