import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useTheme } from "@/context";
import type { Mesh } from "three";

interface ShapeConfig {
  position: [number, number, number];
  geometry: "icosahedron" | "octahedron" | "dodecahedron";
  scale: number;
  rotationSpeed: [number, number, number];
  driftFrequency: number;
  driftAmplitude: number;
}

function generateShapes(): ShapeConfig[] {
  const shapes: ShapeConfig[] = [];
  const geometries: ShapeConfig["geometry"][] = [
    "icosahedron",
    "octahedron",
    "dodecahedron",
  ];
  const count = 6;

  for (let i = 0; i < count; i++) {
    shapes.push({
      position: [
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ],
      geometry: geometries[i % geometries.length],
      scale: 0.4 + Math.random() * 0.6,
      rotationSpeed: [
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.3,
        (Math.random() - 0.5) * 0.2,
      ],
      driftFrequency: 0.3 + Math.random() * 0.4,
      driftAmplitude: 0.2 + Math.random() * 0.3,
    });
  }
  return shapes;
}

function FloatingShape({ config }: { config: ShapeConfig }) {
  const meshRef = useRef<Mesh>(null);
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const initialY = config.position[1];

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    // Slow rotation
    meshRef.current.rotation.x += config.rotationSpeed[0] * 0.01;
    meshRef.current.rotation.y += config.rotationSpeed[1] * 0.01;
    meshRef.current.rotation.z += config.rotationSpeed[2] * 0.01;

    // Sine wave drift on Y axis
    meshRef.current.position.y =
      initialY + Math.sin(t * config.driftFrequency) * config.driftAmplitude;
  });

  const geometryElement = (() => {
    switch (config.geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 0]} />;
      case "octahedron":
        return <octahedronGeometry args={[1, 0]} />;
      case "dodecahedron":
        return <dodecahedronGeometry args={[1, 0]} />;
    }
  })();

  return (
    <mesh ref={meshRef} position={config.position} scale={config.scale}>
      {geometryElement}
      <meshStandardMaterial
        color="#06b6d4"
        transparent
        opacity={isDark ? 0.1 : 0.05}
        wireframe
      />
    </mesh>
  );
}

/** 6 semi-transparent polyhedra with slow rotation and drift */
export function FloatingShapes() {
  const shapes = useMemo(() => generateShapes(), []);

  return (
    <>
      {shapes.map((config, i) => (
        <FloatingShape key={i} config={config} />
      ))}
    </>
  );
}
