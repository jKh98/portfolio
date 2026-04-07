import { cn } from "@/utils/cn";

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  /** Classes applied to the inner content wrapper (relative z-[1]) */
  innerClassName?: string;
  hoverable?: boolean;
}

export function GlassCard({
  children,
  className,
  innerClassName,
  hoverable = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "relative rounded-xl backdrop-blur-xl backdrop-saturate-150 border",
        "bg-[var(--bg-glass-inner)] border-[var(--border)]",
        "shadow-[var(--shadow-md)]",
        "glass-noise glass-gradient glass-inner-highlight",
        "transition-all duration-200",
        hoverable && [
          "hover:bg-[var(--accent-subtle)]",
          "hover:border-[var(--border-accent)]",
          "hover:shadow-[var(--shadow-lg)]",
          "hover:-translate-y-0.5",
          "active:scale-[0.98]",
          "cursor-pointer",
        ],
        className,
      )}
    >
      <div className={cn("relative z-[1]", innerClassName)}>{children}</div>
    </div>
  );
}
