import { cn } from "@/utils/cn";

export interface IconButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  className?: string;
  /** Accessible label for screen readers */
  label: string;
  size?: "sm" | "md";
}

export function IconButton({
  children,
  className,
  label,
  size = "md",
  ...props
}: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={label}
      className={cn(
        "inline-flex items-center justify-center rounded-lg",
        "text-[var(--text-secondary)]",
        "transition-all duration-200",
        "hover:bg-[var(--accent-subtle)] hover:text-[var(--accent)]",
        "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
        "active:scale-95",
        "cursor-pointer",
        size === "sm" && "h-7 w-7",
        size === "md" && "h-9 w-9",
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
}
