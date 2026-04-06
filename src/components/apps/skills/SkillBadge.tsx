import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";

export interface SkillBadgeProps {
  name: string;
  index?: number;
  className?: string;
}

export function SkillBadge({ name, index = 0, className }: SkillBadgeProps) {
  const reduced = useReducedMotion();

  return (
    <motion.span
      initial={reduced ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduced ? 0 : ANIMATION.duration.fast,
        delay: reduced ? 0 : index * 0.03,
      }}
      className={cn(
        "inline-flex items-center rounded-lg px-3 py-1.5",
        "text-xs font-medium",
        "bg-[var(--bg-glass)] text-[var(--text-secondary)]",
        "border border-[var(--border)]",
        "backdrop-blur-sm",
        "transition-all duration-200",
        "hover:text-[var(--accent)] hover:border-[var(--border-accent)]",
        "hover:-translate-y-0.5 hover:shadow-[0_0_12px_var(--accent-glow)]",
        className,
      )}
    >
      {name}
    </motion.span>
  );
}
