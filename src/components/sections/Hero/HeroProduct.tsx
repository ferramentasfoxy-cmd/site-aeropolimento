'use client';
import * as React from "react";
import gsap from "gsap";
import Image from "next/image";
import { Canvas } from "@react-three/fiber";
import { Float, useGLTF, OrbitControls, MeshReflectorMaterial, Environment, ContactShadows } from "@react-three/drei";
import * as THREE from "three";

// -------------------------------------------------------------
// 🛡️ BARRICADA ANTI-CRASH (ERROR BOUNDARY)
// Usado para Degradação Elegante (Graceful Degradation)
// -------------------------------------------------------------
class WebGLErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError(_: Error) {
    return { hasError: true }; // Ativa o Paraquedas se o Canvas Crashar
  }
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.warn("WebGL Fallback Ativado: O hardware da máquina ou navegador barrou o WebGL.", error.message);
  }
  render() {
    if (this.state.hasError) {
      // 🪂 O PARAQUEDAS (Fallback PNG Altamente Polido)
      return (
        <div className="relative w-full h-[80vh] flex items-center justify-center animate-[floatSlow_6s_ease-in-out_infinite]">
            <Image 
              src="/images/ap001.png" 
              alt="Produto Aeropolimento AP001" 
              width={350} 
              height={500} 
              className="object-contain drop-shadow-[0_45px_45px_rgba(0,0,0,0.2)]"
              priority
            />
        </div>
      );
    }
    return this.props.children;
  }
}

// -------------------------------------------------------------
// MOTOR E LÓGICA DE MESH
// -------------------------------------------------------------
function ProductModel() {
  const { scene } = useGLTF("/models/ap001.glb");

  React.useEffect(() => {
    // Clonagem e tratamento seguro da malha, garantindo que o WebGL não crashe por manipulação indevida de cache
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (child.material) {
          // Garante que se for array, não causemos type error. E aplicamos as cores com segurança
          const matArray = Array.isArray(child.material) ? child.material : [child.material];
          matArray.forEach(mat => {
            if ('color' in mat && typeof mat.color.set === 'function') {
               mat.color.set(0xf5f5f5);
            }
            if ('roughness' in mat) mat.roughness = 0.2;
            if ('metalness' in mat) mat.metalness = 0.05;
            mat.needsUpdate = true;
          });
        }
      }
    });
  }, [scene]);

  return <primitive object={scene} />;
}

// -------------------------------------------------------------
// COMPONENTE PRINCIPAL EXPORTADO
// -------------------------------------------------------------
export function HeroProduct() {
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { autoAlpha: 0, y: 50, filter: "blur(15px)", scale: 0.95 },
        { 
           autoAlpha: 1, 
           y: 0, 
           filter: "blur(0px)", 
           scale: 1, 
           duration: 3, 
           delay: 2.8, 
           ease: "expo.out" 
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={containerRef} className="hero-product-container relative w-full h-full cursor-grab active:cursor-grabbing invisible transform-gpu">
      
      {/* 🛡️ Tenda protetora englobando o Canvas suscetível a erros de Hardware do cliente */}
      <WebGLErrorBoundary>
        
        {/* OTIMIZAÇÃO 1: Relaxamento das exigências de Hardware (gl prop) */}
        <Canvas 
          shadows 
          dpr={[1, 1.5]} 
          camera={{ position: [0, 2, 10], fov: 35 }}
          gl={{ 
            powerPreference: 'default', 
            failIfMajorPerformanceCaveat: false, // Força a placa a tentar de qualquer jeito (até via CPU/Software)
            antialias: true 
          }}
        >
          
          <color attach="background" args={['#ffffff']} />
          <fog attach="fog" args={['#ffffff', 5, 25]} />

          <ambientLight intensity={0.8} />
          <Environment preset="studio" environmentIntensity={0.6} resolution={256} />
          
          <directionalLight 
            position={[0, 10, 5]} 
            intensity={0.5} 
            castShadow 
            shadow-mapSize={1024} 
          />
          <OrbitControls 
            enableZoom={false}
            enablePan={false}
            autoRotate={true}
            autoRotateSpeed={1.0} 
            enableDamping={true}
            dampingFactor={0.04}
            makeDefault
          />

          <group position={[0, -0.6, 0]} scale={2.2}>
            <Float speed={0.6} rotationIntensity={0.06} floatIntensity={0.15} floatingRange={[-0.02, 0.02]}>
              <React.Suspense fallback={null}>
                <ProductModel />
              </React.Suspense>
            </Float>

            <ContactShadows 
              position={[0, -1.6, 0]} 
              opacity={0.35} 
              scale={12} 
              blur={5} 
              far={4.5} 
              resolution={512} 
              color="#000000" 
            />

            <mesh position={[0, -1.65, 0]} rotation={[-Math.PI / 2, 0, 0]}>
              <planeGeometry args={[50, 50]} />
              <MeshReflectorMaterial
                blur={[150, 50]}
                resolution={256}
                mixBlur={2}
                mixStrength={15}
                roughness={0.85}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#fafafa"
                metalness={0.05}
                mirror={0.15}
              />
            </mesh>
          </group>

        </Canvas>
      </WebGLErrorBoundary>

      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-white via-transparent to-transparent opacity-80 z-20" />
    </div>
  );
}

useGLTF.preload("/models/ap001.glb");
