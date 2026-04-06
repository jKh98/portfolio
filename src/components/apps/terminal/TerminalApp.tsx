import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/utils/cn";
import { useWindowManager, useTheme } from "@/context";
import { executeCommand, ASCII_BANNER } from "@/data/terminal-commands";
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
        text: `visitor@jalkhurfan.com ~ $ ${input}`,
        isCommand: true,
      };

      const result = executeCommand(input);

      if (result.action?.type === "clear") {
        setLines([]);
        handleAction(result);
      } else {
        const outputLines: OutputLine[] = result.output.map((text) => ({
          id: lineId++,
          text,
        }));
        setLines((prev) => [...prev, commandLine, ...outputLines]);
        handleAction(result);
      }

      if (input.trim()) {
        setHistory((prev) => [...prev, input]);
        setHistoryIndex(-1);
      }
    },
    [handleAction],
  );

  const handleClear = useCallback(() => {
    setLines([]);
  }, []);

  const toggleFontSize = useCallback(() => {
    setFontSize((prev) => (prev === "sm" ? "base" : "sm"));
  }, []);

  return (
    <div
      className={cn(
        "flex flex-col h-full",
        "bg-[#0d1117] text-[#c9d1d9]",
        "font-mono",
        fontSize === "sm" ? "text-xs" : "text-sm",
      )}
    >
      <TerminalToolbar onClear={handleClear} onToggleFontSize={toggleFontSize} />
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-3 scroll-shadow">
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
