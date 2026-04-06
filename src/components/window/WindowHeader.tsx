import { useState, useCallback } from "react";
import type { DragControls } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/utils/cn";

export interface WindowHeaderProps {
  title: string;
  onClose: () => void;
  onMinimize?: () => void;
  onMaximize?: () => void;
  isMaximized?: boolean;
  dragControls?: DragControls;
  className?: string;
}

export function WindowHeader({
  title,
  onClose,
  onMinimize,
  onMaximize,
  isMaximized = false,
  dragControls,
  className,
}: WindowHeaderProps) {
  const { t } = useTranslation();
  const [isHoveringTrafficLights, setIsHoveringTrafficLights] = useState(false);

  const handleDoubleClick = useCallback(() => {
    onMaximize?.();
  }, [onMaximize]);

  return (
    <div
      className={cn(
        "flex items-center h-10 px-3 shrink-0",
        "border-b border-[var(--border)]",
        "select-none",
        dragControls && "cursor-grab active:cursor-grabbing",
        className,
      )}
      onPointerDown={(e) => {
        // Only start drag from the title bar area, not the buttons
        if ((e.target as HTMLElement).closest("button")) return;
        dragControls?.start(e);
      }}
      onDoubleClick={(e) => {
        // Don't trigger maximize on button double-click
        if ((e.target as HTMLElement).closest("button")) return;
        handleDoubleClick();
      }}
    >
      {/* Traffic light buttons */}
      <div
        className="flex items-center gap-2"
        onMouseEnter={() => setIsHoveringTrafficLights(true)}
        onMouseLeave={() => setIsHoveringTrafficLights(false)}
      >
        <button
          type="button"
          aria-label={t("common.close")}
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          className={cn(
            "w-3 h-3 rounded-full",
            "bg-[#ff5f57] hover:bg-[#ff3b30]",
            "transition-colors duration-150",
            "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
          )}
        />
        {onMinimize && (
          <button
            type="button"
            aria-label={t("common.minimize")}
            onClick={(e) => {
              e.stopPropagation();
              onMinimize();
            }}
            className={cn(
              "w-3 h-3 rounded-full",
              "bg-[#febc2e] hover:bg-[#f5a623]",
              "transition-colors duration-150",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
            )}
          />
        )}
        {onMaximize ? (
          <button
            type="button"
            aria-label={
              isMaximized ? t("common.restore") : t("common.maximize")
            }
            onClick={(e) => {
              e.stopPropagation();
              onMaximize();
            }}
            className={cn(
              "w-3 h-3 rounded-full",
              "bg-[#28c840] hover:bg-[#1aab29]",
              "transition-colors duration-150",
              "flex items-center justify-center",
              "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]",
            )}
          >
            {isHoveringTrafficLights &&
              (isMaximized ? (
                <Minimize2 className="w-2 h-2 text-black/80" strokeWidth={3} />
              ) : (
                <Maximize2 className="w-2 h-2 text-black/80" strokeWidth={3} />
              ))}
          </button>
        ) : (
          <div
            className="w-3 h-3 rounded-full bg-[#28c840] opacity-50"
            aria-hidden="true"
          />
        )}
      </div>

      {/* Window title */}
      <span
        className={cn(
          "flex-1 text-center text-sm font-medium truncate",
          "text-[var(--text-secondary)]",
        )}
      >
        {title}
      </span>

      {/* Spacer to balance the traffic lights */}
      <div
        className={cn(onMinimize ? "w-[52px]" : "w-[36px]")}
        aria-hidden="true"
      />
    </div>
  );
}
