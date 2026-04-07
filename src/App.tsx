import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useDirection } from "@/i18n/useDirection";
import { usePreferences } from "@/hooks";
import { Desktop } from "@/components/desktop";
import { getWallpaper } from "@/constants";

export function App() {
  const { i18n } = useTranslation();
  const direction = useDirection();
  const { preferences } = usePreferences();

  useEffect(() => {
    document.documentElement.dir = direction;
    document.documentElement.lang = i18n.language;
  }, [direction, i18n.language]);

  const wp = getWallpaper(preferences.wallpaper);

  return (
    <div className="relative h-full w-full">
      {/* ── Wallpaper layer ─────────────────────────────── */}

      {/* CSS-only wallpaper (minimal category) */}
      {wp.css && (
        <div
          className="fixed inset-0 z-0"
          style={{ background: wp.css }}
          aria-hidden="true"
        />
      )}

      {/* Image-based wallpaper */}
      {wp.src && !wp.css && (
        <div
          className="fixed inset-0 z-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url(${wp.src})` }}
          aria-hidden="true"
        />
      )}

      <div className="relative z-10 h-full w-full">
        <Desktop />
      </div>
    </div>
  );
}
