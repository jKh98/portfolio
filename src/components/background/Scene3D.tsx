import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useReducedMotion, useIsMobile } from "@/hooks";
import { Lighting } from "./Lighting";
import { FloatingShapes } from "./FloatingShapes";
import { ParticleField } from "./ParticleField";

/**
 * R3F Canvas wrapper - fixed full-viewport behind desktop.
 * Hidden on mobile (< 768px) and when reduced motion is preferred.
 */
export function Scene3D() {
  const reducedMotion = useReducedMotion();
  const isMobile = useIsMobile();

  // Don't render 3D scene on mobile or when reduced motion is preferred
  if (reducedMotion || isMobile) return null;

  return (
    <div className="fixed inset-0 -z-10" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 8], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: false, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <Lighting />
          <FloatingShapes />
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
}
