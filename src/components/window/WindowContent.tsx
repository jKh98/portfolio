import { cn } from "@/utils/cn";

export interface WindowContentProps {
  children: React.ReactNode;
  className?: string;
}

/**
 * Flex container that fills remaining window space.
 * Apps render their own scrollable areas inside.
 */
export function WindowContent({ children, className }: WindowContentProps) {
  return (
    <div className={cn("flex flex-col flex-1 min-h-0", className)}>
      {children}
    </div>
  );
}
