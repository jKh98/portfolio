import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { Volume2, VolumeX, Volume1 } from "lucide-react";
import { cn } from "@/utils/cn";
import { useAudio } from "@/hooks";
import { IconButton } from "@/components/ui";

export function VolumePopover() {
  const { t } = useTranslation();
  const { muted, volume, setMuted, setVolume } = useAudio();
  const [open, setOpen] = useState(false);
  const anchorRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (
        anchorRef.current?.contains(e.target as Node) ||
        popoverRef.current?.contains(e.target as Node)
      ) {
        return;
      }
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open]);

  const VolumeIcon = muted || volume === 0
    ? VolumeX
    : volume < 0.5
      ? Volume1
      : Volume2;

  return (
    <div ref={anchorRef} className="relative inline-flex">
      <IconButton
        label={t("topbar.volume")}
        size="sm"
        onClick={() => setOpen((prev) => !prev)}
      >
        <VolumeIcon size={14} />
      </IconButton>

      {open &&
        createPortal(
          <VolumePanel
            ref={popoverRef}
            anchorRef={anchorRef}
            muted={muted}
            volume={volume}
            onMuteToggle={() => setMuted(!muted)}
            onVolumeChange={setVolume}
            muteLabel={t("apps.settings.sound.enableSounds")}
            volumeLabel={t("apps.settings.sound.volume")}
          />,
          document.body,
        )}
    </div>
  );
}

interface VolumePanelProps {
  anchorRef: React.RefObject<HTMLDivElement | null>;
  muted: boolean;
  volume: number;
  onMuteToggle: () => void;
  onVolumeChange: (v: number) => void;
  muteLabel: string;
  volumeLabel: string;
}

import { forwardRef, useLayoutEffect, useState as useStateLayout } from "react";

const VolumePanel = forwardRef<HTMLDivElement, VolumePanelProps>(
  function VolumePanel(
    { anchorRef, muted, volume, onMuteToggle, onVolumeChange, muteLabel, volumeLabel },
    ref,
  ) {
    const [pos, setPos] = useStateLayout({ top: 0, right: 0 });
    const [measured, setMeasured] = useStateLayout(false);

    useLayoutEffect(() => {
      const anchor = anchorRef.current;
      if (!anchor) return;
      const rect = anchor.getBoundingClientRect();
      setPos({
        top: rect.bottom + 6,
        right: window.innerWidth - rect.right,
      });
      setMeasured(true);
      // eslint-disable-next-line react-hooks/exhaustive-deps -- state setters are stable
    }, [anchorRef]);

    return (
      <div
        ref={ref}
        className={cn(
          "fixed z-[9999]",
          "w-56 rounded-xl p-3",
          "backdrop-blur-2xl backdrop-saturate-150",
          "bg-[var(--bg-glass)] border border-[var(--border)]",
          "shadow-[var(--shadow-lg)]",
          "transition-opacity duration-150",
          measured ? "opacity-100" : "opacity-0",
        )}
        style={{ top: pos.top, right: pos.right }}
      >
        {/* Mute toggle row */}
        <button
          onClick={onMuteToggle}
          className={cn(
            "flex items-center gap-2 w-full rounded-lg px-2 py-1.5",
            "text-sm transition-colors cursor-pointer",
            "hover:bg-[var(--bg-glass-hover)]",
            muted
              ? "text-[var(--text-tertiary)]"
              : "text-[var(--text-primary)]",
          )}
        >
          {muted ? <VolumeX size={14} /> : <Volume2 size={14} />}
          <span>{muteLabel}</span>
          <span
            className={cn(
              "ms-auto w-2 h-2 rounded-full",
              muted ? "bg-[var(--text-tertiary)]" : "bg-[var(--accent)]",
            )}
          />
        </button>

        {/* Volume slider */}
        <div
          className={cn(
            "flex items-center gap-2 px-2 pt-2 transition-opacity",
            muted && "opacity-40 pointer-events-none",
          )}
        >
          <VolumeX size={12} className="text-[var(--text-tertiary)] shrink-0" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.05}
            value={volume}
            onChange={(e) => onVolumeChange(parseFloat(e.target.value))}
            className={cn(
              "flex-1 h-1 rounded-full appearance-none cursor-pointer",
              "bg-[var(--border)]",
              "[&::-webkit-slider-thumb]:appearance-none",
              "[&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3",
              "[&::-webkit-slider-thumb]:rounded-full",
              "[&::-webkit-slider-thumb]:bg-[var(--accent)]",
              "[&::-webkit-slider-thumb]:shadow-sm",
              "[&::-webkit-slider-thumb]:cursor-pointer",
              "[&::-moz-range-thumb]:w-3 [&::-moz-range-thumb]:h-3",
              "[&::-moz-range-thumb]:rounded-full",
              "[&::-moz-range-thumb]:bg-[var(--accent)]",
              "[&::-moz-range-thumb]:border-0",
              "[&::-moz-range-thumb]:cursor-pointer",
            )}
            aria-label={volumeLabel}
          />
          <Volume2 size={12} className="text-[var(--text-tertiary)] shrink-0" />
        </div>
      </div>
    );
  },
);
