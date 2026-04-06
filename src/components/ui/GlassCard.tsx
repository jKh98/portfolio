import { cn } from "@/utils/cn";

export interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverable?: boolean;
}

export function GlassCard({
  children,
  className,
  hoverable = false,
}: GlassCardProps) {
  return (
    <div
      className={cn(
        "rounded-xl backdrop-blur-md border",
        "bg-[var(--bg-glass)] border-[var(--border)]",
        "shadow-[var(--shadow-md)]",
        "transition-all duration-200",
        hoverable && [
          "hover:bg-[var(--bg-glass-hover)]",
          "hover:border-[var(--border-accent)]",
          "hover:shadow-[var(--shadow-lg)]",
          "hover:-translate-y-0.5",
          "active:scale-[0.98]",
          "cursor-pointer",
        ],
        className,
      )}
    >
      {children}
    </div>
  );
}
