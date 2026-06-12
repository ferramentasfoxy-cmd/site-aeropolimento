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
          className="object-contain drop-shadow-[0_40px_60px_rgba(0,0,0,0.18)]"
          priority
        />
      </div>
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[55%] h-[20px] bg-black/10 blur-[16px] rounded-full pointer-events-none" />
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
function ProductModel() {
  const { scene } = useGLTF("/models/ap001.glb");
  const outerGroupRef = React.useRef<THREE.Group>(null);
  const innerGroupRef = React.useRef<THREE.Group>(null);

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
          if ("roughness" in mat) mat.roughness = 0.12;
          if ("metalness" in mat) mat.metalness = 0.08;
          mat.needsUpdate = true;
        });
      }
    });
  }, [scene]);

  React.useEffect(() => {
    // Animação espetacular de Entrada (Scale + Rotação 3D)
    if (!outerGroupRef.current) return;
    if (prefersReducedMotion()) {
      gsap.set(outerGroupRef.current.scale, { x: 2.0, y: 2.0, z: 2.0 });
      gsap.set(outerGroupRef.current.rotation, { y: -Math.PI / 7 });
      gsap.set(outerGroupRef.current.position, { y: -0.15 });
      return;
    }
    // Entrada cinematográfica V3: zoom-in girando (scale 0→1.85 + rotação 2.5 voltas) + flutuação suave.
    // Durations custom mantidas — timing especial de entrada do produto 3D, alinhado com fade+blur do container.
    gsap.fromTo(
      outerGroupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 2.0, y: 2.0, z: 2.0, duration: 3.2, ease: "expo.out", delay: 0.6 }
    );

    // Rotação Y: 2.5 voltas completas durante a entrada (5π = 900° de spin) terminando na pose -π/7.
    gsap.fromTo(
      outerGroupRef.current.rotation,
      { y: -Math.PI / 7 + Math.PI * 2.5 },
      { y: -Math.PI / 7, duration: 3.6, ease: "expo.out", delay: 0.6 }
    );

    gsap.fromTo(
      outerGroupRef.current.position,
      { y: -2 },
      { y: -0.15, duration: 2.8, ease: EASE.snappy, delay: 0.6 }
    );
  }, []);

  const clock = React.useRef({ floatT: 0 });

  useFrame((_, delta) => {
    // Float orgânico contínuo (no grupo interno para NÃO brigar com o GSAP do grupo externo)
    if (innerGroupRef.current) {
      clock.current.floatT += delta * 0.8;
      innerGroupRef.current.position.y = Math.sin(clock.current.floatT) * 0.05;
      // Micro-oscilação direcional
      innerGroupRef.current.rotation.z = Math.sin(clock.current.floatT * 0.5) * 0.015;
      innerGroupRef.current.rotation.x = Math.cos(clock.current.floatT * 0.5) * 0.01;
    }
  });

  return (
    <group ref={outerGroupRef} position={[0, -0.15, 0]} rotation={[0, -Math.PI / 7, 0]} scale={0}>
      <group ref={innerGroupRef}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// CENA 3D COMPLETA E ATUALIZADOR DO HUD
// ─────────────────────────────────────────────────────────────
function Scene() {
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

      {/* Relight de estúdio: key quente + rim frio (recorta contra o topo cinza do cove) + fill. */}
      <ambientLight intensity={0.5} />
      <Environment preset="studio" environmentIntensity={0.7} resolution={256} />
      {/* Key quente — luz principal, frente-superior direita */}
      <directionalLight position={[5, 9, 6]} intensity={1.4} color="#fff3e0" castShadow shadow-mapSize={[2048, 2048]} />
      {/* Rim frio — recorta o frasco do cove (separação) */}
      <directionalLight position={[-6, 3.5, -5]} intensity={1.15} color="#d6e4ff" />
      {/* Fill suave frontal */}
      <directionalLight position={[-3, 2, 4]} intensity={0.28} />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={true}
        enableDamping
        dampingFactor={0.04}
        autoRotate={true} // Cinemático ativado infinitamente!
        autoRotateSpeed={1.2} // Rotação bem lenta, como gravação de estúdio
        minPolarAngle={Math.PI / 2 - 0.3} // Limita a visão aérea
        maxPolarAngle={Math.PI / 2 + 0.15} // Limita a visão inferior
        makeDefault
      />

      <React.Suspense fallback={null}>
        <ProductModel />
      </React.Suspense>

      {/* ── Profundidade por sombra em 2 camadas ──
          Núcleo escuro (aterra) + halo largo suave (finge oclusão ambiente) →
          o frasco ganha peso e descola do cove, sem os artefatos do reflexo. */}
      {/* Núcleo de contato — nítido e escuro logo sob a base */}
      <ContactShadows
        position={[0, -1.4, 0]}
        opacity={0.45}
        scale={6}
        blur={2.3}
        far={2}
        resolution={1024}
        color="#0a0a0a"
      />
      {/* Halo de profundidade — largo, muito difuso, baixa opacidade */}
      <ContactShadows
        position={[0, -1.42, 0]}
        opacity={0.14}
        scale={13}
        blur={9}
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

  React.useEffect(() => {
    setWebglAvailable(detectWebGL());
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
      className="hero-product-container relative w-full h-full invisible transform-gpu"
      style={{ cursor: webglAvailable ? "grab" : "default" }}
      onMouseDown={(e) => { if (webglAvailable) e.currentTarget.style.cursor = "grabbing"; }}
      onMouseUp={(e) => { if (webglAvailable) e.currentTarget.style.cursor = "grab"; }}
    >
      {webglAvailable ? (
        <WebGLErrorBoundary>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.1, 8.8], fov: 33 }}
            gl={{
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.05,
            }}
          >
            <Scene />
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
