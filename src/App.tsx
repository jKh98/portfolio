import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/i18n/useDirection";
import { useIsMobile, useReducedMotion, usePreferences } from "@/hooks";
import { Desktop } from "@/components/desktop";

const Scene3D = lazy(() =>
  import("@/components/background/Scene3D").then((m) => ({
    default: m.Scene3D,
  })),
);

/** SVG dot pattern for the "pattern" wallpaper option. */
const PATTERN_SVG =
  "url(\"data:image/svg+xml,%3Csvg width='20' height='20' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='2' cy='2' r='1' fill='rgba(128,128,128,0.15)'/%3E%3C/svg%3E\")";

export function App() {
  const { i18n } = useTranslation();
  const direction = useDirection();
  const isMobile = useIsMobile();
  const reducedMotion = useReducedMotion();
  const { preferences } = usePreferences();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  const wallpaper = preferences.wallpaper;
  const show3D =
    wallpaper === "3d-shapes" && !isMobile && !reducedMotion;

  return (
    <div className="relative h-full w-full bg-[var(--bg-primary)]">
      {/* Wallpaper backgrounds */}
      {wallpaper === "gradient" && (
        <div
          className="fixed inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, var(--accent-glow) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--accent-glow) 0%, transparent 50%), var(--bg-primary)",
          }}
          aria-hidden="true"
        />
      )}
      {wallpaper === "solid-dark" && (
        <div
          className="fixed inset-0 -z-10 bg-[#0a0a0a]"
          aria-hidden="true"
        />
      )}
      {wallpaper === "solid-light" && (
        <div
          className="fixed inset-0 -z-10 bg-[#f5f5f7]"
          aria-hidden="true"
        />
      )}
      {wallpaper === "pattern" && (
        <div
          className="fixed inset-0 -z-10 bg-[var(--bg-primary)]"
          style={{ backgroundImage: PATTERN_SVG }}
          aria-hidden="true"
        />
      )}
      {/* Gradient fallback when 3D wallpaper selected but unavailable */}
      {wallpaper === "3d-shapes" && !show3D && (
        <div
          className="fixed inset-0 -z-10"
          style={{
            background:
              "radial-gradient(ellipse at 30% 20%, var(--accent-glow) 0%, transparent 50%), radial-gradient(ellipse at 70% 80%, var(--accent-glow) 0%, transparent 50%), var(--bg-primary)",
          }}
          aria-hidden="true"
        />
      )}
      {show3D && (
        <Suspense fallback={null}>
          <Scene3D />
        </Suspense>
      )}
      <Desktop />
    </div>
  );
}
