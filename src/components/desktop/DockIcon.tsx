import { useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { User, Briefcase, Code, Mail } from "lucide-react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { Tooltip } from "@/components/ui";
import { ANIMATION } from "@/constants";
import type { AppId } from "@/types";

const ICON_MAP: Record<string, React.ComponentType<{ size?: number }>> = {
  User,
  Briefcase,
  Code,
  Mail,
};

export interface DockIconProps {
  appId: AppId;
  icon: string;
  label: string;
  isActive: boolean;
  onClick: () => void;
  mouseX: ReturnType<typeof useMotionValue<number>>;
  index: number;
  /** Compact mode for mobile - smaller icons */
  compact?: boolean;
  /** Disable magnification on hover (mobile/tablet) */
  disableMagnification?: boolean;
  /** Long press pointer event handlers (desktop only) */
  onPointerDown?: (e: React.PointerEvent) => void;
  onPointerUp?: () => void;
  onPointerLeave?: () => void;
}

const BASE_SIZE = 48;
const COMPACT_SIZE = 36;
const MAX_SIZE = 68;

export function DockIcon({
  appId,
  icon,
  label,
  isActive,
  onClick,
  mouseX,
  index,
  compact = false,
  disableMagnification = false,
  onPointerDown,
  onPointerUp,
  onPointerLeave,
}: DockIconProps) {
  const reducedMotion = useReducedMotion();
  const IconComponent = ICON_MAP[icon];
  const currentBase = compact ? COMPACT_SIZE : BASE_SIZE;

  const ref = useCallback(
    (node: HTMLButtonElement | null) => {
      if (node) {
        node.dataset.index = String(index);
      }
    },
    [index],
  );

  // Calculate distance-based magnification
  const distance = useTransform(mouseX, (val: number) => {
    if (val === -1 || reducedMotion || disableMagnification) return 200;
    const rect = document.querySelector(`[data-dock-icon="${appId}"]`);
    if (!rect) return 200;
    const bounds = (rect as HTMLElement).getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    return Math.abs(val - center);
  });

  const size = useSpring(
    useTransform(
      distance,
      disableMagnification ? [0, 200] : [0, 100, 200],
      disableMagnification
        ? [currentBase, currentBase]
        : [MAX_SIZE, currentBase + 4, currentBase],
    ),
    { stiffness: 300, damping: 25 },
  );

  if (!IconComponent) return null;

  const iconSize = compact ? 18 : 22;

  return (
    <Tooltip content={label}>
      <motion.button
        ref={ref}
        data-dock-icon={appId}
        type="button"
        role="button"
        aria-label={label}
        aria-pressed={isActive}
        tabIndex={0}
        onClick={onClick}
        onPointerDown={onPointerDown}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
        style={{ width: size, height: size }}
        whileTap={reducedMotion ? undefined : { scale: 0.9 }}
        transition={ANIMATION.spring.snappy}
        className={cn(
          "relative flex items-center justify-center rounded-xl",
          "bg-[var(--bg-glass)] backdrop-blur-sm",
          "border border-[var(--border)]",
          "text-[var(--text-secondary)]",
          "hover:text-[var(--accent)] hover:border-[var(--border-accent)]",
          "transition-colors duration-200",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          "cursor-pointer",
        )}
      >
        <IconComponent size={iconSize} />
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
