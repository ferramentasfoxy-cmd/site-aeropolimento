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
      gsap.set(outerGroupRef.current.scale, { x: 1.85, y: 1.85, z: 1.85 });
      gsap.set(outerGroupRef.current.rotation, { y: -Math.PI / 7 });
      gsap.set(outerGroupRef.current.position, { y: -0.45 });
      return;
    }
    // Entrada cinematográfica V3: zoom-in girando (scale 0→1.85 + rotação 2.5 voltas) + flutuação suave.
    // Durations custom mantidas — timing especial de entrada do produto 3D, alinhado com fade+blur do container.
    gsap.fromTo(
      outerGroupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1.85, y: 1.85, z: 1.85, duration: 3.2, ease: "expo.out", delay: 0.6 }
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
      { y: -0.45, duration: 2.8, ease: EASE.snappy, delay: 0.6 }
    );
  }, []);

  const clock = React.useRef({ floatT: 0 });

  useFrame((_, delta) => {
    if (!innerGroupRef.current) return;
    
    // Float orgânico contínuo (no grupo interno para NÃO brigar com o GSAP do grupo externo)
    clock.current.floatT += delta * 0.8;
    innerGroupRef.current.position.y = Math.sin(clock.current.floatT) * 0.05;
    
    // Micro-oscilação direcional
    innerGroupRef.current.rotation.z = Math.sin(clock.current.floatT * 0.5) * 0.015;
    innerGroupRef.current.rotation.x = Math.cos(clock.current.floatT * 0.5) * 0.01;
  });

  return (
    <group ref={outerGroupRef} position={[0, -0.45, 0]} rotation={[0, -Math.PI / 7, 0]} scale={0}>
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
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", 8, 28]} />

      <ambientLight intensity={1.1} />
      <Environment preset="studio" environmentIntensity={0.6} resolution={256} />
      {/* Ajuste suave nas luzes principais para destacar os vincos do frasco branco */}
      <directionalLight position={[4, 10, 6]} intensity={0.7} castShadow shadow-mapSize={[1024, 1024]} />
      <directionalLight position={[-5, 5, -2]} intensity={0.25} />

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

      <ContactShadows
        position={[0, -1.25, 0]} // Ajustado para a nova escala menor
        opacity={0.15}
        scale={8}
        blur={4.5}
        far={3.5}
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
            camera={{ position: [0, 0.8, 10], fov: 30 }}
            gl={{
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
              antialias: true,
            }}
          >
            <Scene />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <ProductFallback />
      )}

      {/* --- HUD TÁTICO SOBREPOSTO (B2B ENGINEERING) --- */}
      <HudReadouts accent="#BD1622" />

      {/* Vinheta lateral */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.6)_0%,_transparent_60%)]" />
      <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none z-20 bg-gradient-to-r from-white to-transparent" />
    </div>
  );
}

// ─────────────────────────────────────────────────────────────
// HUD READOUTS (Camada de Dados Técnicos V2)
// ─────────────────────────────────────────────────────────────
function HudReadouts({ accent: _accent }: { accent: string }) {
  // HUD readouts simplificados — Axis Y + Bússola Radial removidos (feios, mal posicionados).
  // Mantém apenas a camada base; readouts adicionais podem voltar em phases futuras se for caso.
  return null;
}

useGLTF.preload("/models/ap001.glb");
