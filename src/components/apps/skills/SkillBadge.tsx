import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION, SKILL_ICONS } from "@/constants";
import { GlassCard } from "@/components/ui";

export interface SkillBadgeProps {
  name: string;
  index?: number;
  className?: string;
}

export function SkillBadge({ name, index = 0, className }: SkillBadgeProps) {
  const reduced = useReducedMotion();
  const iconPath = SKILL_ICONS[name];

  return (
    <motion.span
      initial={reduced ? false : { opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{
        duration: reduced ? 0 : ANIMATION.duration.fast,
        delay: reduced ? 0 : index * 0.03,
      }}
      className="inline-flex"
    >
       <GlassCard
        hoverable
        className={cn(
          "rounded-lg px-3 py-1.5",
          "text-xs font-medium text-[var(--text-secondary)]",
          className,
        )}
        innerClassName="inline-flex items-center gap-1.5"
      >
        {iconPath && (
          <svg
            viewBox="0 0 24 24"
            fill="currentColor"
            className="w-4 h-4 shrink-0"
            aria-hidden="true"
          >
            <path d={iconPath} />
          </svg>
        )}
        {name}
      </GlassCard>
    </motion.span>
  );
}
