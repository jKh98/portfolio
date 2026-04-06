import { cn } from "@/utils/cn";

interface OutputLine {
  id: number;
  text: string;
  isCommand?: boolean;
}

export interface TerminalOutputProps {
  lines: OutputLine[];
}

export function TerminalOutput({ lines }: TerminalOutputProps) {
  return (
    <div className="space-y-0">
      {lines.map((line) => (
        <div
          key={line.id}
          className={cn(
            "whitespace-pre-wrap break-all leading-relaxed",
            line.isCommand
              ? "text-[var(--accent)]"
              : "text-[var(--terminal-text)]",
          )}
        >
          {line.text || "\u00A0"}
        </div>
      ))}
    </div>
  );
}
