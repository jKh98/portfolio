import { cn } from "@/utils/cn";

export interface SkillBadgeProps {
  name: string;
  className?: string;
}

export function SkillBadge({ name, className }: SkillBadgeProps) {
  return (
    <span
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
    </span>
  );
}
