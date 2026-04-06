import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/i18n/useDirection";
import { useIsMobile, useReducedMotion } from "@/hooks";
import { Desktop } from "@/components/desktop";

const Scene3D = lazy(() =>
  import("@/components/background/Scene3D").then((m) => ({
    default: m.Scene3D,
  })),
);

export function App() {
  const { i18n } = useTranslation();
  const direction = useDirection();
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  // Show gradient fallback when 3D scene is hidden
  const showGradient = isMobile || reducedMotion;

  return (
    <div className="relative h-full w-full bg-[var(--bg-primary)]">
      {/* CSS gradient background fallback when 3D is hidden */}
      {showGradient && (
        <div
          className="fixed inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, var(--accent-glow) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--accent-glow) 0%, transparent 50%), var(--bg-primary)",
          }}
          aria-hidden="true"
        />
      )}
      <Suspense fallback={null}>
        <Scene3D />
      </Suspense>
      <Desktop />
    </div>
  );
}
