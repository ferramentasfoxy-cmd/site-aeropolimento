'use client';
import * as React from "react";
import gsap from "gsap";
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
// MODELO 3D + ANIMAÇÃO DE IDLE VIA useFrame
// ─────────────────────────────────────────────────────────────
function ProductModel() {
  const { scene } = useGLTF("/models/ap001.glb");
  const groupRef = React.useRef<THREE.Group>(null);

  React.useEffect(() => {
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mats = Array.isArray(child.material)
          ? child.material
          : [child.material];
        mats.forEach((mat) => {
          if ("color" in mat && typeof mat.color?.set === "function")
            mat.color.set(0xf2f2f2);
          if ("roughness" in mat) mat.roughness = 0.18;
          if ("metalness" in mat) mat.metalness = 0.05;
          mat.needsUpdate = true;
        });
      }
    });
  }, [scene]);

  const clock = React.useRef({ theta: 0, floatT: 0 });

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    clock.current.theta += delta * 0.35;
    groupRef.current.rotation.y = clock.current.theta;
    clock.current.floatT += delta * 0.6;
    groupRef.current.position.y = Math.sin(clock.current.floatT) * 0.08 - 0.55;
  });

  return (
    <group ref={groupRef} position={[0, -0.55, 0]} scale={2.3}>
      <primitive object={scene} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// CENA 3D COMPLETA
// ─────────────────────────────────────────────────────────────
function Scene() {
  const controlsRef = React.useRef<OrbitControlsImpl>(null);
  const resumeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStart = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
  };

  const handleEnd = () => {
    resumeTimer.current = setTimeout(() => {}, 2000);
  };

  return (
    <>
      <color attach="background" args={["#ffffff"]} />
      <fog attach="fog" args={["#ffffff", 8, 28]} />

      <ambientLight intensity={1.0} />
      <Environment preset="studio" environmentIntensity={0.5} resolution={128} />
      <directionalLight position={[3, 8, 5]} intensity={0.6} castShadow shadow-mapSize={[512, 512]} />
      <directionalLight position={[-4, 4, -2]} intensity={0.3} />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableDamping
        dampingFactor={0.05}
        onStart={handleStart}
        onEnd={handleEnd}
        makeDefault
      />

      <React.Suspense fallback={null}>
        <ProductModel />
      </React.Suspense>

      <ContactShadows
        position={[0, -1.55, 0]}
        opacity={0.22}
        scale={8}
        blur={3.5}
        far={3.5}
        resolution={256}
        color="#1a1a1a"
      />
    </>
  );
}

// ─────────────────────────────────────────────────────────────
// COMPONENTE EXPORTADO — HeroProduct
// ─────────────────────────────────────────────────────────────
export function HeroProduct() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  // Detecta WebGL UMA VEZ na inicialização — sem retries, sem spam
  const [webglAvailable] = React.useState<boolean>(() => detectWebGL());

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 40, filter: "blur(12px)", scale: 0.97 },
        {
          autoAlpha: 1,
          y: 0,
          filter: "blur(0px)",
          scale: 1,
          duration: 2.4,
          delay: 2.6,
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

      {/* Vinheta lateral */}
      <div className="absolute inset-0 pointer-events-none z-20 bg-[radial-gradient(ellipse_at_top_right,_rgba(255,255,255,0.6)_0%,_transparent_60%)]" />
      <div className="absolute inset-y-0 left-0 w-1/4 pointer-events-none z-20 bg-gradient-to-r from-white to-transparent" />
    </div>
  );
}

useGLTF.preload("/models/ap001.glb");
