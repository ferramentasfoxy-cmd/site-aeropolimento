'use client';

import { useRef } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { prefersReducedMotion, DURATION, EASE } from '@/lib/animations/defaults';
import { useT } from '@/i18n/LanguageProvider';

gsap.registerPlugin(useGSAP);

export function HeroProduct() {
  const { t } = useT();
  const container = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      // Reduced-motion gate (UI-SPEC §3.4 + DS-05 contract)
      if (prefersReducedMotion()) {
        gsap.set('.hero-product-img', { opacity: 1, scale: 1, y: 0 });
        gsap.set('.hud-readout', { opacity: 1, y: 0, filter: 'blur(0px)' });
        return;
      }

      // Entrance timeline — handoff from Preloader via delay 2.8s (UI-SPEC §3.4 stages 2-3)
      const tl = gsap.timeline({ delay: 2.8 + 0.2 }); // +0.2s offset for product stage 2

      tl.from('.hero-product-img', {
        opacity: 0,
        scale: 0.96,
        y: 20,
        duration: DURATION.cinematic,
        ease: EASE.standard,
      }).from(
        '.hud-readout',
        {
          opacity: 0,
          y: 15,
          filter: 'blur(5px)',
          duration: DURATION.slow,
          stagger: 0.15,
          ease: EASE.standard,
        },
        '-=0.9' // overlap — HUD starts ~0.3s after product (§3.4 stage 3 delay 0.5s total)
      );
    },
    { scope: container }
  );

  return (
    <div ref={container} className="relative w-full h-full flex items-center justify-center">
      {/* Frasco AP001 — visual hero, conteúdo relevante (alt obrigatório) */}
      <Image
        src="/images/products/ap001_new.png"
        alt="Frasco AP001 — produto homologado ANAC de polimento aeronáutico"
        width={400}
        height={560}
        priority
        className="hero-product-img object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.18)] z-10"
      />

      {/* SVG HUD overlay — decorativo no wrapper; readouts factuais expostos via aria-label */}
      <div className="hud-layer" aria-hidden="true">
        {/* HUD-TL: ANAC cert ID */}
        <div className="hud-readout hud-tl">
          <div className="hud-key">{t.hero.hudCertKey}</div>
          <div
            className="hud-val"
            data-placeholder="true"
            aria-label="Certificação ANAC — pendente de confirmação oficial do cliente"
          >
            ANAC-1002
          </div>
        </div>

        {/* HUD-TR: ficha técnica mini */}
        <div className="hud-readout hud-tr">
          <dl className="flex flex-col gap-1 items-end">
            <div className="flex gap-2">
              <dt className="hud-key">VISC</dt>
              <dd
                className="hud-val"
                data-placeholder="true"
                aria-label="Viscosidade — valor pendente de confirmação oficial do cliente"
              >
                850 cSt
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="hud-key">pH</dt>
              <dd
                className="hud-val"
                data-placeholder="true"
                aria-label="pH — valor pendente de confirmação oficial do cliente"
              >
                7.2
              </dd>
            </div>
            <div className="flex gap-2">
              <dt className="hud-key">COMPAT</dt>
              <dd className="hud-val">{t.hero.hudCompatValue}</dd>
            </div>
          </dl>
        </div>

        {/* HUD-BL: AXIS readout decorativo */}
        <div className="hud-readout hud-bl">
          <div className="hud-key">AXIS Y</div>
          <div className="hud-val" aria-hidden="true">
            000.0°
          </div>
        </div>

        {/* HUD-BR: selo HOMOLOGADO ANAC */}
        <div className="hud-readout hud-br hud-cert">
          <div className="hud-cert-seal">
            <span className="hud-cert-dot" aria-hidden="true" />
            <span className="hud-key">{t.hero.hudSeal}</span>
          </div>
        </div>

        {/* Bússola decorativa — geometria estática (sem useFrame) */}
        <svg
          className="hud-compass opacity-30"
          viewBox="0 0 800 800"
          width="800"
          height="800"
          aria-hidden="true"
        >
          <circle cx="400" cy="400" r="350" fill="none" stroke="currentColor" strokeWidth="1" opacity="0.2" />
          <circle
            cx="400"
            cy="400"
            r="280"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="4 8"
            opacity="0.15"
          />
          {/* 24 tick marks every 15° */}
          {Array.from({ length: 24 }).map((_, i) => {
            const angle = (i * 15 * Math.PI) / 180;
            const x1 = 400 + 340 * Math.cos(angle);
            const y1 = 400 + 340 * Math.sin(angle);
            const x2 = 400 + 360 * Math.cos(angle);
            const y2 = 400 + 360 * Math.sin(angle);
            return (
              <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="currentColor" strokeWidth="1" opacity="0.25" />
            );
          })}
        </svg>
      </div>
    </div>
  );
}
