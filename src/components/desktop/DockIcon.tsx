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
}

const BASE_SIZE = 48;
const MAX_SIZE = 68;

export function DockIcon({
  appId,
  icon,
  label,
  isActive,
  onClick,
  mouseX,
  index,
}: DockIconProps) {
  const reducedMotion = useReducedMotion();
  const IconComponent = ICON_MAP[icon];

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
    if (val === -1 || reducedMotion) return 200; // far away = no magnification
    const rect = document.querySelector(`[data-dock-icon="${appId}"]`);
    if (!rect) return 200;
    const bounds = (rect as HTMLElement).getBoundingClientRect();
    const center = bounds.left + bounds.width / 2;
    return Math.abs(val - center);
  });

  const size = useSpring(
    useTransform(distance, [0, 100, 200], [MAX_SIZE, BASE_SIZE + 4, BASE_SIZE]),
    { stiffness: 300, damping: 25 },
  );

  if (!IconComponent) return null;

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
        <IconComponent size={22} />
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
