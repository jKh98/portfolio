import { cn } from "@/utils/cn";

export interface WindowContentProps {
  children: React.ReactNode;
  className?: string;
}

export function WindowContent({ children, className }: WindowContentProps) {
  return (
    <div
      className={cn("flex-1 overflow-y-auto p-6", "scroll-smooth", className)}
    >
      {children}
    </div>
  );
}
