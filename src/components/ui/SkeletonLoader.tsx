import { cn } from "@/utils/cn";

export interface SkeletonLoaderProps {
  className?: string;
  /** Number of skeleton lines to render */
  lines?: number;
}

export function SkeletonLoader({ className, lines = 3 }: SkeletonLoaderProps) {
  return (
    <div className={cn("flex flex-col gap-3", className)} aria-hidden="true">
      {Array.from({ length: lines }, (_, i) => (
        <div
          key={i}
          className={cn(
            "h-4 rounded-md animate-pulse",
            "bg-[var(--bg-glass)]",
            i === lines - 1 && "w-2/3",
          )}
        />
      ))}
    </div>
  );
}
