import { useCallback } from "react";
import { usePreferences } from "./usePreferences";
import { SOUND_DEFINITIONS } from "@/constants/audio";
import { synthesizeSound } from "@/lib/audio-engine";
import type { SoundEffect, AudioCategory } from "@/types/audio";

export interface UseAudioReturn {
  /** Play a sound effect (respects mute, volume, and category settings) */
  playSound: (sound: SoundEffect) => void;
  /** Current muted state */
  muted: boolean;
  /** Current volume (0–1) */
  volume: number;
  /** Set master mute */
  setMuted: (muted: boolean) => void;
  /** Set master volume */
  setVolume: (volume: number) => void;
  /** Toggle a category on/off */
  setCategoryEnabled: (category: AudioCategory, enabled: boolean) => void;
  /** Check if a category is enabled */
  isCategoryEnabled: (category: AudioCategory) => boolean;
}

export function useAudio(): UseAudioReturn {
  const { preferences, setAudioMuted, setAudioVolume, setAudioCategory } =
    usePreferences();
  const { audio } = preferences;

  const playSound = useCallback(
    (sound: SoundEffect) => {
      // Respect mute
      if (audio.muted) return;
      // Respect category toggle
      const def = SOUND_DEFINITIONS[sound];
      if (!def) return;
      if (!audio.categories[def.category]) return;
      // Play with master volume
      synthesizeSound(sound, audio.volume);
    },
    [audio.muted, audio.volume, audio.categories],
  );

  const isCategoryEnabled = useCallback(
    (category: AudioCategory) => audio.categories[category] ?? true,
    [audio.categories],
  );

  return {
    playSound,
    muted: audio.muted,
    volume: audio.volume,
    setMuted: setAudioMuted,
    setVolume: setAudioVolume,
    setCategoryEnabled: setAudioCategory,
    isCategoryEnabled,
  };
}
