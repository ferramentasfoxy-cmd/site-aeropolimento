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
// MODELO 3D + ANIMAÇÃO DE FLOAT ELEGANTE VIA useFrame
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
          if ("color" in mat && typeof mat.color?.set === "function") {
            // Branco premium, mais puro
            mat.color.set(0xfafafa);
          }
          if ("roughness" in mat) mat.roughness = 0.12;
          if ("metalness" in mat) mat.metalness = 0.08;
          mat.needsUpdate = true;
        });
      }
    });
  }, [scene]);

  // Aumentamos levemente a escala (2.4) para destacar mais e melhorar o enquadramento "close-up"
  const clock = React.useRef({ floatT: 0 });

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    
    // Float orgânico muito suave no eixo Y
    clock.current.floatT += delta * 0.8;
    groupRef.current.position.y = Math.sin(clock.current.floatT) * 0.05 - 0.45;
    
    // Pequena inclinação para não ficar 100% rígido e complementar a iluminação
    groupRef.current.rotation.z = Math.sin(clock.current.floatT * 0.5) * 0.015;
    groupRef.current.rotation.x = Math.cos(clock.current.floatT * 0.5) * 0.01;
  });

  // Escala contida (1.85) para maior respiro negativo no bounding box, deixando o design mais clean e refinado
  return (
    <group ref={groupRef} position={[0, -0.45, 0]} scale={1.85}>
      <primitive object={scene} />
    </group>
  );
}

// ─────────────────────────────────────────────────────────────
// CENA 3D COMPLETA
// ─────────────────────────────────────────────────────────────
function Scene() {
  const controlsRef = React.useRef<OrbitControlsImpl>(null);
  
  // Timer para reiniciar o autoRotate após interação do usuário
  const resumeTimer = React.useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleStart = () => {
    if (resumeTimer.current) clearTimeout(resumeTimer.current);
    if (controlsRef.current) controlsRef.current.autoRotate = false;
  };

  const handleEnd = () => {
    // Retoma a rotação automática de forma elegante após 3 segundos
    resumeTimer.current = setTimeout(() => {
      if (controlsRef.current) controlsRef.current.autoRotate = true;
    }, 3000);
  };

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
        enableDamping
        dampingFactor={0.04}
        autoRotate={true}
        autoRotateSpeed={0.8} // Rotação bem suave e premium
        minPolarAngle={Math.PI / 2 - 0.3} // Limita a visão aérea
        maxPolarAngle={Math.PI / 2 + 0.15} // Limita a visão inferior
        onStart={handleStart}
        onEnd={handleEnd}
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
