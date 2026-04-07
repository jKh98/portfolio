import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context/WindowProvider";
import { useTheme } from "@/context/ThemeProvider";
import { executeCommand, ASCII_BANNER } from "@/data/terminal-commands";
import { trackEvent } from "@/lib/analytics";
import { useAudio } from "@/hooks";
import type { CommandResult } from "@/data/terminal-commands";
import { TerminalOutput } from "./TerminalOutput";
import { TerminalInput } from "./TerminalInput";
import { TerminalToolbar } from "./TerminalToolbar";

interface OutputLine {
  id: number;
  text: string;
  isCommand?: boolean;
}

let lineId = 0;

export function TerminalApp() {
  const { openWindow, closeWindow } = useWindowManager();
  const { setTheme } = useTheme();
  const { playSound } = useAudio();
  const [lines, setLines] = useState<OutputLine[]>(() =>
    ASCII_BANNER.map((text) => ({ id: lineId++, text })),
  );
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [fontSize, setFontSize] = useState<"sm" | "base">("sm");
  const scrollRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    requestAnimationFrame(() => {
      scrollRef.current?.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "smooth",
      });
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [lines, scrollToBottom]);

  const handleAction = useCallback(
    (result: CommandResult) => {
      if (!result.action) return;
      switch (result.action.type) {
        case "open-app":
          openWindow(result.action.appId);
          break;
        case "close-app":
          closeWindow(result.action.appId);
          break;
        case "set-theme":
          setTheme(result.action.theme);
          break;
        case "clear":
          setLines([]);
          break;
      }
    },
    [openWindow, closeWindow, setTheme],
  );

  const handleSubmit = useCallback(
    (input: string) => {
      const commandLine: OutputLine = {
        id: lineId++,
        text: `visitor@jalkhurfan ~ $ ${input}`,
        isCommand: true,
      };

      const result = executeCommand(input, { history });

      if (result.action?.type === "clear") {
        setLines([]);
        handleAction(result);
        playSound("terminalClear");
      } else {
        const outputLines: OutputLine[] = result.output.map((text) => ({
          id: lineId++,
          text,
        }));
        setLines((prev) => [...prev, commandLine, ...outputLines]);
        handleAction(result);

        // Play error sound for unknown commands, success sound otherwise
        const isError = result.output.some(
          (line) => line.includes("command not found") || line.includes("not found"),
        );
        playSound(isError ? "terminalError" : "terminalExecute");
      }

      if (input.trim()) {
        setHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
        trackEvent("terminal_command", { command: input.trim().split(/\s+/)[0] });
      }
    },
    [handleAction, history, playSound],
  );

  const handleClear = useCallback(() => {
    setLines([]);
    playSound("terminalClear");
  }, [playSound]);

  const toggleFontSize = useCallback(() => {
    setFontSize((prev) => (prev === "sm" ? "base" : "sm"));
  }, []);

  return (
    <div
      dir="ltr"
      className={cn(
        "flex flex-col flex-1 min-h-0 overflow-hidden",
        "bg-[var(--terminal-bg)] text-[var(--terminal-text)]",
        "font-mono",
        fontSize === "sm" ? "text-xs" : "text-sm",
      )}
    >
      <TerminalToolbar onClear={handleClear} onToggleFontSize={toggleFontSize} />
      <div
        ref={scrollRef}
        className="flex-1 min-h-0 overflow-y-auto p-3 scroll-shadow [--scroll-bg:var(--terminal-bg)]"
      >
        <TerminalOutput lines={lines} />
      </div>
      <TerminalInput
        onSubmit={handleSubmit}
        history={history}
        historyIndex={historyIndex}
        setHistoryIndex={setHistoryIndex}
      />
    </div>
  );
}

export default TerminalApp;
