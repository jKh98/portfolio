import { useState, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import {
  subscribeToGuestbook,
  addGuestbookEntry,
  type GuestbookEntry,
} from "@/lib/guestbook";
import { trackEvent } from "@/lib/analytics";
import { NotepadInput } from "./NotepadInput";
import { NotepadMessages } from "./NotepadMessages";

export type { GuestbookEntry };

const RATE_LIMIT_KEY = "portfolio-guestbook-submitted";

export function NotepadApp() {
  const { t } = useTranslation();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(
    () => sessionStorage.getItem(RATE_LIMIT_KEY) === "true",
  );

  // Subscribe to real-time Firestore updates
  useEffect(() => {
    const unsubscribe = subscribeToGuestbook(
      (newEntries) => {
        setEntries(newEntries);
        setLoading(false);
        setError(null);
      },
      (err) => {
        console.error("Guestbook subscription error:", err);
        setError(t("apps.notepad.loadError"));
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [t]);

  const handleSubmit = useCallback(
    async (name: string, message: string) => {
      if (hasSubmitted) return;

      const trimmedName = name.trim() || t("apps.notepad.anonymous");
      const trimmedMessage = message.trim();

      try {
        await addGuestbookEntry(trimmedName, trimmedMessage);
        setHasSubmitted(true);
        sessionStorage.setItem(RATE_LIMIT_KEY, "true");
        trackEvent("guestbook_submit");
      } catch (err) {
        console.error("Failed to submit guestbook entry:", err);
        setError(t("apps.notepad.submitError"));
      }
    },
    [hasSubmitted, t],
  );

  return (
    <div className={cn("flex flex-col h-full")}>
      {/* Error banner */}
      {error && (
        <div
          className={cn(
            "px-4 py-2 text-[11px] text-center",
            "text-red-400",
            "border-b border-[var(--border)]",
            "bg-red-500/10",
          )}
        >
          {error}
        </div>
      )}

      <div className="flex-1 flex flex-col min-h-0 overflow-hidden">
        {/* Input area */}
        <NotepadInput onSubmit={handleSubmit} disabled={hasSubmitted} />

        {/* Messages list */}
        <NotepadMessages entries={entries} loading={loading} />
      </div>
    </div>
  );
}

export default NotepadApp;
