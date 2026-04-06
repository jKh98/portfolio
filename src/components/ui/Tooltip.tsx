import { useState } from "react";
import { cn } from "@/utils/cn";

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  className?: string;
}

export function Tooltip({ children, content, className }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div
      className={cn("relative inline-flex", className)}
      onMouseEnter={() => setVisible(true)}
      onMouseLeave={() => setVisible(false)}
      onFocus={() => setVisible(true)}
      onBlur={() => setVisible(false)}
    >
      {children}
      <span
        role="tooltip"
        className={cn(
          "pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2",
          "whitespace-nowrap rounded-md px-2.5 py-1",
          "text-xs font-medium",
          "bg-[var(--bg-surface)] text-[var(--text-primary)]",
          "border border-[var(--border)]",
          "shadow-[var(--shadow-sm)]",
          "transition-opacity duration-150",
          visible ? "opacity-100" : "opacity-0",
        )}
      >
        {content}
      </span>
    </div>
  );
}
