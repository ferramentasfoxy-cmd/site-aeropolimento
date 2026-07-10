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
import { prefersReducedMotion, EASE } from "@/lib/animations/defaults";

// ─────────────────────────────────────────────────────────────
// Product3D — vitrine 3D reutilizável para os blocos de produto.
//
// Difere do HeroProduct em três pontos deliberados:
//   1. PRESERVA a textura original do modelo (Meshy) — não repinta de branco.
//   2. AUTO-FIT: normaliza escala/centro de qualquer GLB via bounding box,
//      então cada frasco enquadra igual sem ajuste manual por modelo.
//   3. LAZY-MOUNT: o <Canvas> só monta quando o bloco se aproxima do viewport
//      (IntersectionObserver) e DESMONTA ao sair — nunca há 4 contextos WebGL
//      vivos ao mesmo tempo (Hero + 3 produtos), protegendo o frame-rate.
// ─────────────────────────────────────────────────────────────

interface Product3DProps {
  modelSrc: string;
  fallbackSrc: string;
  alt: string;
  /** Distância da câmera no eixo Z. Menor = objeto MAIOR no canvas. Padrão home: 6.6. */
  cameraZ?: number;
  /** Alvo vertical da câmera (enquadramento). Padrão: -0.15 (levemente pra baixo). */
  targetY?: number;
  /** Tamanho normalizado do modelo em unidades de cena. Padrão: 2.6. */
  targetSize?: number;
  /** Classe Tailwind de altura mínima do container do canvas. */
  heightClass?: string;
}

// ── Detecção de WebGL (uma vez, client-side) ──
function detectWebGL(): boolean {
  if (typeof window === "undefined") return false;
  try {
    const canvas = document.createElement("canvas");
    return !!(
      window.WebGLRenderingContext &&
      (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
    );
  } catch {
    return false;
  }
}

// ── Fallback PNG (sem WebGL ou fora do viewport) ──
function ProductFallback({ src, alt }: { src: string; alt: string }) {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <div
        className="relative w-full max-w-[340px] lg:max-w-[420px] aspect-[4/5]"
        style={{ animation: "product3dFloat 5s ease-in-out infinite" }}
      >
        <Image
          src={src}
          fill
          alt={alt}
          sizes="(max-width: 768px) 80vw, (max-width: 1280px) 45vw, 420px"
          className="object-contain drop-shadow-[0_40px_44px_rgba(0,0,0,0.11)]"
        />
      </div>
      <div className="absolute bottom-[8%] left-1/2 -translate-x-1/2 w-[55%] h-[20px] bg-black/[0.07] blur-[18px] rounded-full pointer-events-none" />
      <style>{`
        @keyframes product3dFloat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-16px); }
        }
      `}</style>
    </div>
  );
}

// ── Error boundary — degrada para o PNG se o WebGL estourar ──
class WebGLErrorBoundary extends React.Component<
  { children: React.ReactNode; fallbackSrc: string; alt: string },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode; fallbackSrc: string; alt: string }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(error: Error) {
    console.warn("[Product3D] WebGL fallback ativado:", error.message);
  }
  render() {
    if (this.state.hasError) {
      return <ProductFallback src={this.props.fallbackSrc} alt={this.props.alt} />;
    }
    return this.props.children;
  }
}

// ── Modelo: auto-fit + textura preservada + entrada GSAP + turntable ──
const TARGET_SIZE = 2.6; // altura-alvo normalizada (unidades de cena)

function ProductModel({ modelSrc, targetSize = TARGET_SIZE }: { modelSrc: string; targetSize?: number }) {
  const { scene } = useGLTF(modelSrc);
  const outerGroupRef = React.useRef<THREE.Group>(null);
  const innerGroupRef = React.useRef<THREE.Group>(null);

  // Clona + normaliza: centraliza na origem e escala para TARGET_SIZE.
  // useMemo por modelSrc → cada frasco computa o seu fit uma única vez, e o
  // clone evita mutar a scene cacheada (compartilhada entre montagens).
  const fitted = React.useMemo(() => {
    const clone = scene.clone(true);

    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxDim = Math.max(size.x, size.y, size.z) || 1;
    const scale = targetSize / maxDim;

    clone.scale.setScalar(scale);
    // position NÃO é afetada pela própria escala → multiplicamos manualmente.
    clone.position.set(-center.x * scale, -center.y * scale, -center.z * scale);

    // Tuning de material PRESERVANDO o map de textura (brief: acabamento fílmico
    // sem estourar; mantém a cor real do produto, ao contrário do Hero).
    clone.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        const mats = Array.isArray(child.material) ? child.material : [child.material];
        mats.forEach((mat) => {
          if ("roughness" in mat) (mat as THREE.MeshStandardMaterial).roughness = 0.4;
          if ("metalness" in mat) (mat as THREE.MeshStandardMaterial).metalness = 0.0;
          if ("envMapIntensity" in mat)
            (mat as THREE.MeshStandardMaterial).envMapIntensity = 0.85;
          mat.needsUpdate = true;
        });
      }
    });

    return clone;
  }, [scene, targetSize]);

  // Entrada cinematográfica: zoom-in girando + assentamento vertical.
  React.useEffect(() => {
    if (!outerGroupRef.current) return;
    if (prefersReducedMotion()) {
      gsap.set(outerGroupRef.current.scale, { x: 1, y: 1, z: 1 });
      gsap.set(outerGroupRef.current.rotation, { y: -Math.PI / 7 });
      gsap.set(outerGroupRef.current.position, { y: -0.1 });
      return;
    }
    gsap.fromTo(
      outerGroupRef.current.scale,
      { x: 0, y: 0, z: 0 },
      { x: 1, y: 1, z: 1, duration: 2.6, ease: "expo.out" }
    );
    gsap.fromTo(
      outerGroupRef.current.rotation,
      { y: -Math.PI / 7 + Math.PI * 2 },
      { y: -Math.PI / 7, duration: 3.0, ease: "expo.out" }
    );
    gsap.fromTo(
      outerGroupRef.current.position,
      { y: -1.6 },
      { y: -0.1, duration: 2.4, ease: EASE.snappy }
    );
  }, []);

  const clock = React.useRef({ floatT: 0 });

  useFrame((_, delta) => {
    if (innerGroupRef.current) {
      clock.current.floatT += delta * 0.8;
      innerGroupRef.current.rotation.y -= delta * 0.3; // turntable horário
      innerGroupRef.current.position.y = Math.sin(clock.current.floatT) * 0.05;
      innerGroupRef.current.rotation.z = Math.sin(clock.current.floatT * 0.5) * 0.015;
      innerGroupRef.current.rotation.x = Math.cos(clock.current.floatT * 0.5) * 0.01;
    }
  });

  return (
    <group ref={outerGroupRef} position={[0, -0.1, 0]} rotation={[0, -Math.PI / 7, 0]} scale={0}>
      <group ref={innerGroupRef}>
        <primitive object={fitted} />
      </group>
    </group>
  );
}

// ── Cena: relight de estúdio + sombra de contato (espelha o Hero) ──
function Scene({ modelSrc, targetY = -0.15, targetSize }: { modelSrc: string; targetY?: number; targetSize?: number }) {
  const controlsRef = React.useRef<OrbitControlsImpl>(null);

  return (
    <>
      <ambientLight intensity={0.42} />
      {/* HDRI local (era preset via CDN raw.githack.com, que falhava em produção
          e derrubava o Canvas pro PNG). Same-origin Cloudflare = confiável.
          Suspense próprio: sem boundary, a suspensão do .hdr (1.68MB) bloqueava a cena
          inteira → em mobile lento o frasco ficava em branco. Isolado, o modelo aparece
          já com as luzes direcionais e o reflexo HDRI entra quando terminar de baixar. */}
      <React.Suspense fallback={null}>
        <Environment files="/hdri/studio_small_03_1k.hdr" environmentIntensity={0.7} resolution={256} />
      </React.Suspense>
      {/* Key quente — alto-esquerda define volume */}
      <directionalLight position={[-5, 8.5, 6]} intensity={1.45} color="#fff3e0" />
      {/* Rim frio — borda direita destaca o contorno */}
      <directionalLight position={[6, 4, -5]} intensity={1.4} color="#d6e4ff" />
      {/* Fill frontal suave */}
      <directionalLight position={[-3, 2, 4]} intensity={0.28} />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate
        enableDamping
        dampingFactor={0.04}
        target={[0, targetY, 0]}
        minPolarAngle={Math.PI / 2 - 0.3}
        maxPolarAngle={Math.PI / 2 + 0.15}
        makeDefault
      />

      <React.Suspense fallback={null}>
        <ProductModel modelSrc={modelSrc} targetSize={targetSize} />
      </React.Suspense>

      {/* Núcleo de contato — aterra o produto, mas suave (fundos limpos) */}
      <ContactShadows
        position={[0.1, -1.35, 0.1]}
        opacity={0.32}
        scale={[4, 5]}
        blur={3.4}
        far={2}
        resolution={1024}
        color="#0a0a0a"
      />
      {/* Halo de profundidade — largo e difuso */}
      <ContactShadows
        position={[0.35, -1.37, 0.25]}
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
// EXPORT — Product3D com lazy-mount por viewport
// ─────────────────────────────────────────────────────────────
export function Product3D({
  modelSrc,
  fallbackSrc,
  alt,
  cameraZ = 6.6,
  targetY = -0.15,
  targetSize = 2.6,
  heightClass = "min-h-[40vh] md:min-h-[60vh]",
}: Product3DProps) {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const [webglAvailable, setWebglAvailable] = React.useState<boolean>(false);
  const [inView, setInView] = React.useState<boolean>(false);

  React.useEffect(() => {
    setWebglAvailable(detectWebGL());
  }, []);

  // Monta o Canvas a meia tela de distância; desmonta ao sair com folga.
  // Garante no máximo ~1–2 contextos WebGL vivos na página inteira.
  React.useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { rootMargin: "50% 0px 50% 0px", threshold: 0.01 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const show3D = webglAvailable && inView;

  return (
    <div
      ref={containerRef}
      className={`relative w-full h-full ${heightClass} transform-gpu`}
      style={{ cursor: show3D ? "grab" : "default" }}
      onMouseDown={(e) => {
        if (show3D) e.currentTarget.style.cursor = "grabbing";
      }}
      onMouseUp={(e) => {
        if (show3D) e.currentTarget.style.cursor = "grab";
      }}
    >
      {show3D ? (
        <WebGLErrorBoundary fallbackSrc={fallbackSrc} alt={alt}>
          <Canvas
            shadows
            dpr={[1, 1.5]}
            camera={{ position: [0, 0.4, cameraZ], fov: 32 }}
            gl={{
              alpha: true,
              powerPreference: "default",
              failIfMajorPerformanceCaveat: false,
              antialias: true,
              toneMapping: THREE.ACESFilmicToneMapping,
              toneMappingExposure: 1.1,
            }}
          >
            <Scene modelSrc={modelSrc} targetY={targetY} targetSize={targetSize} />
          </Canvas>
        </WebGLErrorBoundary>
      ) : (
        <ProductFallback src={fallbackSrc} alt={alt} />
      )}
    </div>
  );
}
