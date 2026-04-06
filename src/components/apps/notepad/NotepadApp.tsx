import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { NotepadInput } from "./NotepadInput";
import { NotepadMessages } from "./NotepadMessages";

export interface GuestbookEntry {
  id: string;
  name: string;
  message: string;
  timestamp: string;
}

const STORAGE_KEY = "portfolio-guestbook";
const RATE_LIMIT_KEY = "portfolio-guestbook-submitted";

function loadEntries(): GuestbookEntry[] {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveEntries(entries: GuestbookEntry[]): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(entries));
  } catch {
    // Storage full -- silently ignore
  }
}

export function NotepadApp() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<GuestbookEntry[]>(loadEntries);
  const [hasSubmitted, setHasSubmitted] = useState(
    () => sessionStorage.getItem(RATE_LIMIT_KEY) === "true",
  );

  // Persist entries on change
  useEffect(() => {
    saveEntries(entries);
  }, [entries]);

  const handleSubmit = useCallback(
    (name: string, message: string) => {
      if (hasSubmitted) return;

      const entry: GuestbookEntry = {
        id: Date.now().toString(36),
        name: name.trim() || t("apps.notepad.anonymous"),
        message: message.trim(),
        timestamp: new Date().toISOString(),
      };
      setEntries((prev) => [entry, ...prev]);
      setHasSubmitted(true);
      sessionStorage.setItem(RATE_LIMIT_KEY, "true");
    },
    [hasSubmitted, t],
  );

  return (
    <div className={cn("flex flex-col h-full")}>
      {/* Fallback notice - localStorage-only mode */}
      <div
        className={cn(
          "px-4 py-2 text-[11px] text-center",
          "text-[var(--text-tertiary)]",
          "border-b border-[var(--border)]",
          "bg-[var(--bg-glass)]",
        )}
      >
        {t("apps.notepad.localNotice")}
      </div>

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Input area */}
        <NotepadInput
          onSubmit={handleSubmit}
          disabled={hasSubmitted}
        />

        {/* Messages list */}
        <NotepadMessages entries={entries} />
      </div>
    </div>
  );
}

export default NotepadApp;
