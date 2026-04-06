import { useCallback, useRef, useState } from "react";

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

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
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
      }
    },
    [value, history, historyIndex, onSubmit, setHistoryIndex],
  );

  return (
    <div className="flex items-center px-3 py-2 border-t border-[#21262d]">
      <span className="text-[#58a6ff] shrink-0 me-2">
        visitor@jalkhurfan.com ~ $
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
