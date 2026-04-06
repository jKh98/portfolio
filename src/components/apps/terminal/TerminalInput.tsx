import { useCallback, useRef, useState } from "react";
import { COMMAND_NAMES, getPathCompletions } from "@/data/terminal-commands";

export interface TerminalInputProps {
  onSubmit: (input: string) => void;
  history: string[];
  historyIndex: number;
  setHistoryIndex: (index: number) => void;
}

export function TerminalInput({
  onSubmit,
  history,
  historyIndex,
  setHistoryIndex,
}: TerminalInputProps) {
  const [value, setValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleTab = useCallback(
    (currentValue: string) => {
      const trimmed = currentValue.trimStart();
      const parts = trimmed.split(/\s+/);

      // Complete command name if typing the first word
      if (parts.length <= 1) {
        const prefix = parts[0]?.toLowerCase() || "";
        const matches = COMMAND_NAMES.filter((c) =>
          c.startsWith(prefix),
        );
        if (matches.length === 1) {
          setValue(matches[0] + " ");
        }
        return;
      }

      // Complete file/dir path for the argument
      const partial = parts[parts.length - 1];
      const completions = getPathCompletions(partial);
      if (completions.length === 1) {
        const completed = completions[0];
        const newParts = [...parts.slice(0, -1), completed];
        // Add trailing space only if it's not a directory (which already has /)
        const suffix = completed.endsWith("/") ? "" : " ";
        setValue(newParts.join(" ") + suffix);
      }
    },
    [],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Tab") {
        e.preventDefault();
        handleTab(value);
      } else if (e.key === "Enter") {
        e.preventDefault();
        onSubmit(value);
        setValue("");
        setHistoryIndex(-1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        if (history.length === 0) return;
        const newIndex =
          historyIndex === -1
            ? history.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setValue(history[newIndex]);
      } else if (e.key === "ArrowDown") {
        e.preventDefault();
        if (historyIndex === -1) return;
        const newIndex = historyIndex + 1;
        if (newIndex >= history.length) {
          setHistoryIndex(-1);
          setValue("");
        } else {
          setHistoryIndex(newIndex);
          setValue(history[newIndex]);
        }
      } else if (e.key === "l" && e.ctrlKey) {
        // Ctrl+L to clear (common terminal shortcut)
        e.preventDefault();
        onSubmit("clear");
        setValue("");
      }
    },
    [value, history, historyIndex, onSubmit, setHistoryIndex, handleTab],
  );

  return (
    <div className="flex items-center px-3 py-2 border-t border-[#21262d]">
      <span className="text-[#58a6ff] shrink-0 me-2">
        visitor@jalkhurfan ~ $
      </span>
      <input
        ref={inputRef}
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={handleKeyDown}
        className="flex-1 bg-transparent outline-none text-[#c9d1d9] caret-[#58a6ff]"
        autoFocus
        spellCheck={false}
        aria-label="Terminal input"
      />
    </div>
  );
}
