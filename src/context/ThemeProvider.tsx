import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import type { ThemeContextValue, ThemeMode } from "@/types";
import { usePreferences } from "@/hooks";
import { getPairedWallpaper } from "@/constants";
import { trackEvent, setUserProps } from "@/lib/analytics";

const ThemeContext = createContext<ThemeContextValue | null>(null);

function getInitialTheme(): ThemeMode {
  if (typeof window === "undefined") return "dark";
  const stored = localStorage.getItem("theme") as ThemeMode | null;
  if (stored === "dark" || stored === "light") return stored;
  if (window.matchMedia("(prefers-color-scheme: light)").matches)
    return "light";
  return "dark";
}

export interface ThemeProviderProps {
  children: React.ReactNode;
}

export function ThemeProvider({ children }: ThemeProviderProps) {
  const [theme, setThemeState] = useState<ThemeMode>(getInitialTheme);
  const { preferences, setWallpaper } = usePreferences();
  /** Track the previous theme so we only swap on actual changes. */
  const prevThemeRef = useRef(theme);

  // Apply .dark class and persist theme
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Auto-swap wallpaper when theme *changes* (not on mount).
  useEffect(() => {
    if (prevThemeRef.current === theme) return;
    prevThemeRef.current = theme;

    const paired = getPairedWallpaper(preferences.wallpaper, theme);
    if (paired) {
      setWallpaper(paired.id);
    }
  }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

  const toggleTheme = useCallback(() => {
    setThemeState((prev) => {
      const next = prev === "dark" ? "light" : "dark";
      trackEvent("theme_toggle", { theme: next });
      setUserProps({ theme: next });
      return next;
    });
  }, []);

  const setTheme = useCallback((mode: ThemeMode) => {
    trackEvent("theme_set", { theme: mode });
    setUserProps({ theme: mode });
    setThemeState(mode);
  }, []);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme(): ThemeContextValue {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}
