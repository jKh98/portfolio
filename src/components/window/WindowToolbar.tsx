import { cn } from "@/utils/cn";

export interface WindowToolbarProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Reusable toolbar that sits between WindowHeader and WindowContent.
 * Glass background, 36px height, border-bottom.
 */
export function WindowToolbar({ children, className }: WindowToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 h-9 px-3 shrink-0",
        "bg-[var(--bg-glass)] backdrop-blur-sm",
        "border-b border-[var(--border)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
