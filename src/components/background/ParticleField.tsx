import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import { useTheme } from "@/context";
import type { Points as PointsType } from "three";

const PARTICLE_COUNT = 80;

function generatePositions(): Float32Array {
  const positions = new Float32Array(PARTICLE_COUNT * 3);
  for (let i = 0; i < PARTICLE_COUNT; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 16;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 12;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 8 - 2;
  }
  return positions;
}

/** 80 near-invisible dots that drift slowly for subtle depth */
export function ParticleField() {
  const pointsRef = useRef<PointsType>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const positions = useMemo(() => generatePositions(), []);

  useFrame(({ clock }) => {
    if (!pointsRef.current) return;
    const t = clock.getElapsedTime();
    // Very slow global rotation for drift effect
    pointsRef.current.rotation.y = t * 0.02;
    pointsRef.current.rotation.x = Math.sin(t * 0.01) * 0.05;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3}>
      <PointMaterial
        transparent
        color="#06b6d4"
        size={0.03}
        sizeAttenuation
        depthWrite={false}
        opacity={isDark ? 0.15 : 0.08}
      />
    </Points>
  );
}
