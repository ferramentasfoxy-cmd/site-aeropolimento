'use client';
import * as React from "react";
import gsap from "gsap";
import { prefersReducedMotion, EASE } from "@/lib/animations/defaults";
import Image from "next/image";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  useGLTF,
  OrbitControls,
  ContactShadows,
  Environment,
} from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// ─────────────────────────────────────────────────────────────
// DETECÇÃO DE WebGL — verifica UMA VEZ antes de montar o Canvas
// Elimina spam de erros no console quando WebGL não está disponível
// ─────────────────────────────────────────────────────────────
function detectWebGL(): boolean {
  if (typeof window === 'undefined') return false;
  try {
    const canvas = document.createElement('canvas');
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext('webgl') || canvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

// ─────────────────────────────────────────────────────────────
// 🛡️ ERROR BOUNDARY — Graceful Degradation
// ─────────────────────────────────────────────────────────────
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("[HeroProduct] WebGL fallback ativado:", error.message);
  }
  render() {
    if (this.state.hasError) {
      return <ProductFallback />;
    }
    return this.props.children;
  }
}

// ─────────────────────────────────────────────────────────────
// FALLBACK PNG — animação CSS para quando WebGL não disponível
// ─────────────────────────────────────────────────────────────
function ProductFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div style={{ animation: 'fallbackFloat 5s ease-in-out infinite' }}>
        <Image
          src="/images/products/ap001_new.png"
          alt="Produto Aeropolimento AP001"
          width={400}
          height={560}
          className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.12)]"
          priority
        />
      </div>
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[55%] h-[20px] bg-black/[0.07] blur-[18px] rounded-full pointer-events-none" />
      <style>{`
        @keyframes fallbackFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// MODELO 3D + ANIMAÇÃO DE FLOAT ELEGANTE VIA useFrame
// ─────────────────────────────────────────────────────────────
function ProductModel({ targetScale = 2.0, autoFit = false }: { targetScale?: number; autoFit?: boolean }) {
  const { scene } = useGLTF("/models/ap001.glb");
  const outerGroupRef = React.useRef<THREE.Group>(null);
  const innerGroupRef = React.useRef<THREE.Group>(null);

  // AUTO-FIT (mobile): o modelo ap001 não tem origem no centro, então mirar a
  // câmera em qualquer y fixo nunca centraliza. Aqui medimos o bounding box,
  // centramos na origem e normalizamos p/ maxDim=1 — a câmera passa a enquadrar
  // por matemática (mira [0,0,0]), sem chute. targetScale vira o tamanho final.
  const fit = React.useMemo(() => {
    if (!autoFit) return null;
    const box = new THREE.Box3().setFromObject(scene);
    const c = box.getCenter(new THREE.Vector3());
    const s = box.getSize(new THREE.Vector3());
    const maxDim = Math.max(s.x, s.y, s.z) || 1;
    const norm = 1 / maxDim;
    return { position: [-c.x * norm, -c.y * norm, -c.z * norm] as [number, number, number], scale: norm };
  }, [scene, autoFit]);
  const restY = autoFit ? 0 : -0.15;

  React.useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        mats.forEach((mat) => {
          if ("color" in mat && typeof mat.color?.set === "function") {
            mat.color.set(0xfafafa);
          }
          // Especular controlado no plástico (sem estourar — brief §iluminação)
          if ("roughness" in mat) mat.roughness = 0.18;
          if ("metalness" in mat) mat.metalness = 0.08;
          mat.needsUpdate = true;
        });
      }
    });
  }, [scene]);

  React.useEffect(() => {
    // Animação espetacular de Entrada (Scale + Rotação 3D)
    if (!outerGroupRef.current) return;
    const o = outerGroupRef.current;

    // MOBILE (autoFit): estado final IMEDIATO (escala/posição fixas) — sem pop de
    // escala/posição que possa ficar preso num meio-termo se a timeline for
    // interrompida (remount/resize/preloader). Só o giro de entrada + turntable.
    if (autoFit) {
      gsap.set(o.scale, { x: targetScale, y: targetScale, z: targetScale });
      gsap.set(o.position, { y: 0 });
      if (prefersReducedMotion()) {
        gsap.set(o.rotation, { y: -Math.PI / 7 });
      } else {
        gsap.fromTo(o.rotation, { y: -Math.PI / 7 + Math.PI * 2 }, { y: -Math.PI / 7, duration: 2.4, ease: "expo.out", delay: 0.4 });
      }
      return;
    }

    if (prefersReducedMotion()) {
      gsap.set(o.scale, { x: targetScale, y: targetScale, z: targetScale });
      gsap.set(o.rotation, { y: -Math.PI / 7 });
      gsap.set(o.position, { y: restY });
      return;
    }
    // Entrada cinematográfica V3 (desktop): zoom-in girando + flutuação suave.
    gsap.fromTo(
      o.scale,
      { x: 0, y: 0, z: 0 },
      { x: targetScale, y: targetScale, z: targetScale, duration: 3.2, ease: "expo.out", delay: 0.6 }
    );
    gsap.fromTo(
      o.rotation,
      { y: -Math.PI / 7 + Math.PI * 2.5 },
      { y: -Math.PI / 7, duration: 3.6, ease: "expo.out", delay: 0.6 }
    );
    gsap.fromTo(
      o.position,
      { y: -2 },
      { y: restY, duration: 2.8, ease: EASE.snappy, delay: 0.6 }
    );
  }, []);

  const clock = React.useRef({ floatT: 0 });

  useFrame((_, delta) => {
    // Float orgânico contínuo (no grupo interno para NÃO brigar com o GSAP do grupo externo)
    if (innerGroupRef.current) {
      clock.current.floatT += delta * 0.8;
      // Turntable horário (visto de cima): o produto gira de verdade → a
      // ContactShadows (projeção da silhueta) acompanha sozinha. Câmera e luz fixas.
      innerGroupRef.current.rotation.y -= delta * 0.3;
      innerGroupRef.current.position.y = Math.sin(clock.current.floatT) * 0.05;
      // Micro-oscilação direcional
      innerGroupRef.current.rotation.z = Math.sin(clock.current.floatT * 0.5) * 0.015;
      innerGroupRef.current.rotation.x = Math.cos(clock.current.floatT * 0.5) * 0.01;
    }
  });

  return (
    <group ref={outerGroupRef} position={[0, restY, 0]} rotation={[0, -Math.PI / 7, 0]} scale={0}>
      <group ref={innerGroupRef}>
        {fit ? (
          <group position={fit.position} scale={fit.scale}>
            <primitive object={scene} />
          </group>
        ) : (
          <primitive object={scene} />
        )}
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// CENA 3D COMPLETA E ATUALIZADOR DO HUD
// ─────────────────────────────────────────────────────────────
function Scene({ isMobile = false }: { isMobile?: boolean }) {
  const controlsRef = React.useRef<OrbitControlsImpl>(null);
  
  // Atualiza o HUD injetando direto no DOM para não engasgar o React a 60fps
  useFrame(() => {
    if (controlsRef.current) {
      const el = document.getElementById("hud-rot-val");
      if (el) {
        // getAzimuthalAngle retorna em radianos (-PI a PI), convertemos para Graus 0 a 360
        let deg = controlsRef.current.getAzimuthalAngle() * (180 / Math.PI);
        if (deg < 0) deg += 360;
        el.innerText = `${deg.toFixed(1).padStart(5, '0')}°`;
      }
    }
  });

  return (
    <>
      {/* Canvas transparente (gl.alpha) — o frasco vive no Studio Cove (CSS);
          tone mapping ACES no renderer faz o material responder de forma fílmica. */}

      {/* Relight de estúdio: key quente + rim frio + fill. Ambient baixo p/
          fechar a base do frasco (peso + tridimensionalidade — brief). */}
      <ambientLight intensity={0.42} />
      {/* HDRI hospedado no próprio site (era preset do drei via CDN raw.githack.com,
          que bloqueava/rate-limitava em produção → Environment lançava e o
          WebGLErrorBoundary derrubava o 3D pro PNG). Same-origin = sem CORS, confiável. */}
      <Environment files="/hdri/studio_small_03_1k.hdr" environmentIntensity={0.7} resolution={256} />
      {/* Key quente — ALTO-ESQUERDA, define volume (brief §iluminação) */}
      <directionalLight position={[-5, 8.5, 6]} intensity={1.45} color="#fff3e0" castShadow shadow-mapSize={[2048, 2048]} />
      {/* Rim frio — borda DIREITA, destaca o contorno contra o fundo (brief) */}
      <directionalLight position={[6, 4, -5]} intensity={1.4} color="#d6e4ff" />
      {/* Fill suave frontal */}
      <directionalLight position={[-3, 2, 4]} intensity={0.28} />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        enableDamping
        dampingFactor={0.04}
        target={[0, isMobile ? 0 : -0.2, 0]} // mobile: modelo já centrado (auto-fit) → mira na origem
        minPolarAngle={Math.PI / 2 - 0.3} // Limita a visão aérea
        maxPolarAngle={Math.PI / 2 + 0.15} // Limita a visão inferior
        makeDefault
      />

      <React.Suspense fallback={null}>
        <ProductModel targetScale={isMobile ? 2.6 : 2.0} autoFit={isMobile} />
      </React.Suspense>

      {/* ── Sombra de contato suave + alongada, falloff gradual (brief) ──
          Offset p/ baixo-direita (key vem do alto-esquerda) + escala não-uniforme
          = sombra alongada, não um disco. Re-renderiza por frame → acompanha o
          giro do produto. Nada de plano manual (que quebrou): só ContactShadows. */}
      {/* Núcleo de contato — sob a base: aterra o produto, mas SUAVE
          (fundos limpos sem grade → sombra mais clara e difusa que antes). */}
      <ContactShadows
        position={[0.15, -1.4, 0.1]}
        opacity={0.34}
        scale={[4, 5]}
        blur={3.4}
        far={2}
        resolution={1024}
        color="#0a0a0a"
      />
      {/* Halo de profundidade — largo, alongado e muito difuso (falloff gradual) */}
      <ContactShadows
        position={[0.4, -1.42, 0.25]}
        opacity={0.1}
        scale={[11, 16]}
        blur={14}
        far={5}
        resolution={512}
        color="#171717"
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE EXPORTADO — HeroProduct
// ─────────────────────────────────────────────────────────────
export function HeroProduct() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Assume WebGL is available during SSR and initial hydration to avoid Hydration Mismatch.
  // We check actual availability in the client-side useEffect.
  const [webglAvailable, setWebglAvailable] = React.useState<boolean>(true);
  // Frasco enquadrado maior/mais perto no mobile (câmera fixa era tuning só de desktop).
  const [isMobile, setIsMobile] = React.useState<boolean>(() =>
    typeof window !== "undefined" ? window.matchMedia("(max-width: 767px)").matches : false
  );

  React.useEffect(() => {
    setWebglAvailable(detectWebGL());
    const mq = window.matchMedia("(max-width: 767px)");
    const onChange = () => setIsMobile(mq.matches);
    onChange();
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  // O <Canvas> monta durante o preloader, quando o container ainda pode estar
  // colapsado — o ResizeObserver do R3F crava um tamanho errado (300×150) e não
  // remede sozinho. Empurramos re-medições após o layout assentar (e pós-preloader).
  React.useEffect(() => {
    const nudge = () => window.dispatchEvent(new Event("resize"));
    const ids = [120, 900, 3600].map((ms) => window.setTimeout(nudge, ms));
    return () => ids.forEach((id) => window.clearTimeout(id));
  }, []);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      if (prefersReducedMotion()) {
        gsap.set(containerRef.current, { autoAlpha: 1, y: 0 });
        return;
      }
      // Entrada cinematográfica V3: fade + blur + lift, sincronizada com o spin 3D (delay 0.4s vem antes do 3D 0.6s).
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 30, filter: "blur(24px)" },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.6,
          delay: 0.4,
          ease: "expo.out",
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="hero-product-container absolute inset-0 w-full h-full invisible transform-gpu"
      style={{ cursor: webglAvailable ? "grab" : "default" }}
      onMouseDown={(e) => { if (webglAvailable) e.currentTarget.style.cursor = "grabbing"; }}
      onMouseUp={(e) => { if (webglAvailable) e.currentTarget.style.cursor = "grab"; }}
    >
      {webglAvailable ? (
        <WebGLErrorBoundary>
          <Canvas
            key={isMobile ? "cam-mobile" : "cam-desktop"}
            shadows
            dpr={[1, 1.5]}
            camera={isMobile ? { position: [0, 0.3, 6.6], fov: 32 } : { position: [0, 0.9, 8.8], fov: 33 }}
            gl={{
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1, // contraste elevado mas elegante (brief)
            }}
          >
            <Scene isMobile={isMobile} />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <ProductFallback />
      )}

      {/* Máscaras brancas removidas — comiam o frasco no layout novo (produto agora ocupa a coluna inteira). */}
    </div>
  );
}

useGLTF.preload("/models/ap001.glb");
