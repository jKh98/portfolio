import {
  createContext,
  useCallback,
  useEffect,
  useReducer,
} from "react";
import type {
  Preferences,
  PreferencesAction,
  PreferencesContextValue,
  AccentColor,
  AnimationSpeed,
  FontSize,
  DockIconSize,
  AudioCategory,
} from "@/types";
import { applyAccentColor, DEFAULT_WALLPAPER_ID } from "@/constants";
import { DEFAULT_AUDIO_PREFERENCES } from "@/constants/audio";
import { trackEvent, setUserProps } from "@/lib/analytics";

const STORAGE_KEY = "portfolio-preferences";

const DEFAULT_PREFERENCES: Preferences = {
  accentColor: "indigo",
  dockMagnification: true,
  dockIconSize: "medium",
  animationSpeed: "normal",
  autoCascade: true,
  reduceMotion: null,
  fontSize: "normal",
  wallpaper: DEFAULT_WALLPAPER_ID,
  audio: DEFAULT_AUDIO_PREFERENCES,
};

function loadPreferences(): Preferences {
  if (typeof window === "undefined") return DEFAULT_PREFERENCES;
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return DEFAULT_PREFERENCES;
    return { ...DEFAULT_PREFERENCES, ...JSON.parse(stored) };
  } catch {
    return DEFAULT_PREFERENCES;
  }
}

function savePreferences(prefs: Preferences): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
  } catch {
    // Storage full or unavailable -- silently ignore
  }
}

function preferencesReducer(
  state: Preferences,
  action: PreferencesAction,
): Preferences {
  switch (action.type) {
    case "SET_ACCENT_COLOR":
      return { ...state, accentColor: action.color };
    case "SET_DOCK_MAGNIFICATION":
      return { ...state, dockMagnification: action.enabled };
    case "SET_DOCK_ICON_SIZE":
      return { ...state, dockIconSize: action.size };
    case "SET_ANIMATION_SPEED":
      return { ...state, animationSpeed: action.speed };
    case "SET_AUTO_CASCADE":
      return { ...state, autoCascade: action.enabled };
    case "SET_REDUCE_MOTION":
      return { ...state, reduceMotion: action.value };
    case "SET_FONT_SIZE":
      return { ...state, fontSize: action.size };
    case "SET_WALLPAPER":
      return { ...state, wallpaper: action.wallpaper };
    case "SET_AUDIO_MUTED":
      return { ...state, audio: { ...state.audio, muted: action.muted } };
    case "SET_AUDIO_VOLUME":
      return { ...state, audio: { ...state.audio, volume: action.volume } };
    case "SET_AUDIO_CATEGORY":
      return {
        ...state,
        audio: {
          ...state.audio,
          categories: { ...state.audio.categories, [action.category]: action.enabled },
        },
      };
    case "RESET":
      return DEFAULT_PREFERENCES;
    default:
      return state;
  }
}

export const PreferencesContext =
  createContext<PreferencesContextValue | null>(null);

export interface PreferencesProviderProps {
  children: React.ReactNode;
}

export function PreferencesProvider({ children }: PreferencesProviderProps) {
  const [preferences, dispatch] = useReducer(
    preferencesReducer,
    undefined,
    loadPreferences,
  );

  // Persist to localStorage on every change
  useEffect(() => {
    savePreferences(preferences);
  }, [preferences]);

  // Apply accent color CSS variables
  useEffect(() => {
    applyAccentColor(preferences.accentColor);
  }, [preferences.accentColor]);

  // Apply font size to :root
  useEffect(() => {
    const root = document.documentElement;
    const sizeMap: Record<FontSize, string> = {
      small: "14px",
      normal: "16px",
      large: "18px",
    };
    root.style.fontSize = sizeMap[preferences.fontSize];
  }, [preferences.fontSize]);

  const setAccentColor = useCallback(
    (color: AccentColor) => {
      trackEvent("preference_change", { setting: "accent_color", value: color });
      setUserProps({ accent_color: color });
      dispatch({ type: "SET_ACCENT_COLOR", color });
    },
    [],
  );
  const setDockMagnification = useCallback(
    (enabled: boolean) =>
      dispatch({ type: "SET_DOCK_MAGNIFICATION", enabled }),
    [],
  );
  const setDockIconSize = useCallback(
    (size: DockIconSize) => dispatch({ type: "SET_DOCK_ICON_SIZE", size }),
    [],
  );
  const setAnimationSpeed = useCallback(
    (speed: AnimationSpeed) =>
      dispatch({ type: "SET_ANIMATION_SPEED", speed }),
    [],
  );
  const setAutoCascade = useCallback(
    (enabled: boolean) => dispatch({ type: "SET_AUTO_CASCADE", enabled }),
    [],
  );
  const setReduceMotion = useCallback(
    (value: boolean | null) =>
      dispatch({ type: "SET_REDUCE_MOTION", value }),
    [],
  );
  const setFontSize = useCallback(
    (size: FontSize) => dispatch({ type: "SET_FONT_SIZE", size }),
    [],
  );
  const setWallpaper = useCallback(
    (wallpaper: string) => {
      trackEvent("preference_change", { setting: "wallpaper", value: wallpaper });
      dispatch({ type: "SET_WALLPAPER", wallpaper });
    },
    [],
  );
  const setAudioMuted = useCallback(
    (muted: boolean) => {
      trackEvent("preference_change", { setting: "audio_muted", value: String(muted) });
      dispatch({ type: "SET_AUDIO_MUTED", muted });
    },
    [],
  );
  const setAudioVolume = useCallback(
    (volume: number) => dispatch({ type: "SET_AUDIO_VOLUME", volume }),
    [],
  );
  const setAudioCategory = useCallback(
    (category: AudioCategory, enabled: boolean) =>
      dispatch({ type: "SET_AUDIO_CATEGORY", category, enabled }),
    [],
  );
  const resetPreferences = useCallback(
    () => dispatch({ type: "RESET" }),
    [],
  );

  return (
    <PreferencesContext.Provider
      value={{
        preferences,
        dispatch,
        setAccentColor,
        setDockMagnification,
        setDockIconSize,
        setAnimationSpeed,
        setAutoCascade,
        setReduceMotion,
        setFontSize,
        setWallpaper,
        setAudioMuted,
        setAudioVolume,
        setAudioCategory,
        resetPreferences,
      }}
    >
      {children}
    </PreferencesContext.Provider>
  );
}
