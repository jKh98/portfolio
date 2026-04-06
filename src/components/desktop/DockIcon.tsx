import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useMotionValueEvent,
  useSpring,
} from "framer-motion";
import {
  User,
  Briefcase,
  Code,
  Mail,
  Terminal,
  FolderGit2,
  Folder,
  StickyNote,
  Settings,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { Tooltip } from "@/components/ui";
import { ANIMATION } from "@/constants";
import type { AppId, DockIconSize } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  User,
  Briefcase,
  Code,
  Mail,
  Terminal,
  FolderGit2,
  Folder,
  StickyNote,
  Settings,
};

export interface DockIconProps {
  appId: AppId;
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  onContextMenu?: (e: React.MouseEvent) => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  index: number;
  /** Compact mode for mobile - smaller icons */
  compact?: boolean;
  /** User-preferred icon size */
  iconSize?: DockIconSize;
  /** Disable magnification on hover (mobile/tablet) */
  disableMagnification?: boolean;
  /** Suppress tooltip (e.g. when context menu is open for this icon) */
  tooltipDisabled?: boolean;
  /** Long press pointer event handlers (desktop only) */
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
}

/** Base sizes per DockIconSize preference */
const SIZE_MAP: Record<
  DockIconSize,
  { base: number; max: number; icon: number }
> = {
  small: { base: 36, max: 52, icon: 16 },
  medium: { base: 48, max: 68, icon: 22 },
  large: { base: 60, max: 80, icon: 26 },
};

const COMPACT_SIZE = 36;
const MAG_RANGE = 150;

export function DockIcon({
  appId,
  icon,
  label,
  isActive,
  onClick,
  onContextMenu,
  mouseX,
  index,
  compact = false,
  iconSize = "medium",
  disableMagnification = false,
  tooltipDisabled = false,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: DockIconProps) {
  const reducedMotion = useReducedMotion();
  const IconComponent = ICON_MAP[icon];
  const sizeConfig = SIZE_MAP[iconSize];
  const currentBase = compact ? COMPACT_SIZE : sizeConfig.base;
  const currentMax = compact ? COMPACT_SIZE : sizeConfig.max;

  const buttonRef = useRef<HTMLButtonElement>(null);

  // Direct motion value for the target size (no useTransform chain)
  const targetSize = useMotionValue(currentBase);

  // When reducedMotion is on, use an instant spring (no animation) so
  // magnification still works — it just snaps instead of animating.
  const springConfig = reducedMotion
    ? { stiffness: 1000, damping: 100, mass: 0.1 }
    : { stiffness: 300, damping: 25 };
  const size = useSpring(targetSize, springConfig);

  // Sync base size when props change (e.g. iconSize preference changes).
  // Always update when mouse isn't hovering; magnification event handler
  // will take over once the user hovers.
  useEffect(() => {
    if (disableMagnification || mouseX.get() === -1) {
      targetSize.set(currentBase);
    }
  }, [currentBase, disableMagnification, targetSize, mouseX]);

  // Listen to mouseX changes and compute magnified size
  useMotionValueEvent(mouseX, "change", (latestX) => {
    if (disableMagnification || latestX === -1) {
      targetSize.set(currentBase);
      return;
    }

    const el = buttonRef.current;
    if (!el) {
      targetSize.set(currentBase);
      return;
    }

    const bounds = el.getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    const dist = Math.abs(latestX - center);

    if (dist >= MAG_RANGE) {
      targetSize.set(currentBase);
    } else {
      // Cosine interpolation for smooth bell-curve falloff
      const progress = (1 + Math.cos((Math.PI * dist) / MAG_RANGE)) / 2;
      targetSize.set(currentBase + (currentMax - currentBase) * progress);
    }
  });

  if (!IconComponent) return null;

  const lucideSize = compact ? 18 : sizeConfig.icon;

  return (
    <Tooltip content={label} disabled={tooltipDisabled}>
      <motion.button
        ref={buttonRef}
        data-dock-icon={appId}
        data-index={index}
        type="button"
        role="button"
        aria-label={label}
        aria-pressed={isActive}
        tabIndex={0}
        onClick={onClick}
        onContextMenu={onContextMenu}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        style={{ width: size, height: size }}
        whileTap={reducedMotion ? undefined : { scale: 0.9 }}
        transition={ANIMATION.spring.snappy}
        className={cn(
          "relative flex items-center justify-center rounded-xl",
          "bg-[var(--bg-glass-inner)] backdrop-blur-sm",
          "border border-[var(--border)]",
          "text-[var(--text-secondary)]",
          "hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)] hover:border-[var(--border-accent)]",
          "transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "cursor-pointer",
        )}
      >
        <IconComponent size={lucideSize} />
        {/* Active indicator dot */}
        {isActive && (
          <motion.span
            layoutId={`dock-dot-${appId}`}
            className={cn(
              "absolute -bottom-1.5 left-1/2 -translate-x-1/2",
              "w-1 h-1 rounded-full bg-[var(--accent)]",
            )}
          />
        )}
      </motion.button>
    </Tooltip>
  );
}
