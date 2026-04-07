import { useTranslation } from "react-i18next";
import { Play, Volume2, VolumeX } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAudio } from "@/hooks";
import { ToggleSwitch, IconButton } from "@/components/ui";
import { AUDIO_CATEGORIES, getSoundsByCategory } from "@/constants/audio";
import { synthesizeSound } from "@/lib/audio-engine";
import type { AudioCategory, SoundEffect } from "@/types/audio";

export function SoundSection() {
  const { t } = useTranslation();
  const { muted, volume, setMuted, setVolume, setCategoryEnabled, isCategoryEnabled } =
    useAudio();

  const handlePreview = (category: AudioCategory) => {
    const sounds = getSoundsByCategory(category);
    if (sounds.length > 0) {
      // Play the first sound of the category as preview
      synthesizeSound(sounds[0] as SoundEffect, volume);
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {t("apps.settings.sections.sound")}
      </h2>

      {/* Master mute toggle */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          {muted ? (
            <VolumeX size={16} className="text-[var(--text-tertiary)]" />
          ) : (
            <Volume2 size={16} className="text-[var(--accent)]" />
          )}
          <div>
            <label className="text-sm text-[var(--text-secondary)]">
              {t("apps.settings.sound.enableSounds")}
            </label>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
              {t("apps.settings.sound.enableSoundsDesc")}
            </p>
          </div>
        </div>
        <ToggleSwitch
          checked={!muted}
          onChange={(checked) => setMuted(!checked)}
          className="ms-4"
        />
      </div>

      {/* Master volume slider */}
      <div className={cn("space-y-2 transition-opacity", muted && "opacity-40 pointer-events-none")}>
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {t("apps.settings.sound.volume")}
        </label>
        <div className="flex items-center gap-3">
          <VolumeX size={14} className="text-[var(--text-tertiary)] shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className={cn(
              "flex-1 h-1.5 rounded-full appearance-none cursor-pointer",
              "bg-[var(--border)]",
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-[var(--accent)]",
              "[&::-webkit-slider-thumb]:shadow-md",
              "[&::-webkit-slider-thumb]:cursor-pointer",
              "[&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4",
              "[&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:bg-[var(--accent)]",
              "[&::-moz-range-thumb]:border-0",
              "[&::-moz-range-thumb]:cursor-pointer",
            )}
            aria-label={t("apps.settings.sound.volume")}
          />
          <Volume2 size={14} className="text-[var(--text-tertiary)] shrink-0" />
          <span className="text-xs text-[var(--text-tertiary)] w-8 text-end tabular-nums">
            {Math.round(volume * 100)}%
          </span>
        </div>
      </div>

      {/* Per-category toggles */}
      <div className={cn("space-y-3 transition-opacity", muted && "opacity-40 pointer-events-none")}>
        <label className="text-sm font-medium text-[var(--text-secondary)]">
          {t("apps.settings.sound.categories.title")}
        </label>
        <div className="space-y-2">
          {AUDIO_CATEGORIES.map(({ id, labelKey, descKey }) => (
            <div
              key={id}
              className={cn(
                "flex items-center justify-between rounded-lg px-3 py-2",
                "border border-[var(--border)] bg-[var(--bg-glass)]",
              )}
            >
              <div className="flex-1 min-w-0">
                <div className="text-sm text-[var(--text-primary)]">
                  {t(labelKey)}
                </div>
                <div className="text-xs text-[var(--text-tertiary)] mt-0.5">
                  {t(descKey)}
                </div>
              </div>
              <div className="flex items-center gap-2 ms-3 shrink-0">
                <IconButton
                  label={t("apps.settings.sound.preview")}
                  size="sm"
                  onClick={() => handlePreview(id)}
                  disabled={!isCategoryEnabled(id)}
                >
                  <Play size={12} />
                </IconButton>
                <ToggleSwitch
                  checked={isCategoryEnabled(id)}
                  onChange={(enabled) => setCategoryEnabled(id, enabled)}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
