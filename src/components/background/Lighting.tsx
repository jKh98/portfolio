import { useTheme } from "@/context";

/** Theme-aware ambient + point light for the 3D scene */
export function Lighting() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <ambientLight intensity={isDark ? 0.3 : 0.1} />
      <pointLight
        position={[5, 5, 5]}
        intensity={isDark ? 0.5 : 0.2}
        color="#06b6d4"
      />
    </>
  );
}
