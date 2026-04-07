import { Eraser, Type } from "lucide-react";
import { cn } from "@/utils/cn";

export interface TerminalToolbarProps {
  onClear: () => void;
  onToggleFontSize: () => void;
}

export function TerminalToolbar({
  onClear,
  onToggleFontSize,
}: TerminalToolbarProps) {
  return (
    <div
      className={cn(
        "flex items-center gap-1 px-3 py-1.5",
        "border-b border-[var(--terminal-border)]",
      )}
    >
      <button
        onClick={onClear}
        className="p-1 rounded hover:bg-[var(--terminal-border)] text-[var(--terminal-muted)] transition-colors cursor-pointer"
        aria-label="Clear terminal"
        title="Clear"
      >
        <Eraser size={14} />
      </button>
      <button
        onClick={onToggleFontSize}
        className="p-1 rounded hover:bg-[var(--terminal-border)] text-[var(--terminal-muted)] transition-colors cursor-pointer"
        aria-label="Toggle font size"
        title="Font size"
      >
        <Type size={14} />
      </button>
    </div>
  );
}
