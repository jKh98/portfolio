import { cn } from "@/utils/cn";

export interface BadgeProps {
  children: React.ReactNode;
  className?: string;
  variant?: "default" | "accent";
}

export function Badge({
  children,
  className,
  variant = "default",
}: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2.5 py-0.5",
        "text-xs font-medium leading-tight",
        "transition-colors duration-200",
        variant === "default" && [
          "bg-[var(--bg-glass-inner)] text-[var(--text-secondary)]",
          "border border-[var(--border)]",
        ],
        variant === "accent" && [
          "bg-[var(--accent-glow)] text-[var(--accent)]",
          "border border-[var(--border-accent)]",
        ],
        className,
      )}
    >
      {children}
    </span>
  );
}
