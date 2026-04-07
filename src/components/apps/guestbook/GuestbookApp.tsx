import { useState, useCallback, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import {
  subscribeToGuestbook,
  addGuestbookEntry,
  type GuestbookEntry,
} from "@/lib/guestbook";
import { trackEvent } from "@/lib/analytics";
import { useAudio } from "@/hooks";
import { GuestbookInput } from "./GuestbookInput";
import { GuestbookMessages } from "./GuestbookMessages";

export type { GuestbookEntry };

const RATE_LIMIT_KEY = "portfolio-guestbook-submitted";

/** Minimum time (ms) the form must be open before submission is accepted. */
const MIN_SUBMIT_DELAY_MS = 3_000;

export function GuestbookApp() {
  const { t } = useTranslation();
  const { playSound } = useAudio();
  const [entries, setEntries] = useState<GuestbookEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hasSubmitted, setHasSubmitted] = useState(
    () => sessionStorage.getItem(RATE_LIMIT_KEY) === "true",
  );

  // Track when the component mounted for timing-based bot detection
  const mountedAt = useRef(Date.now());

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
        setError(t("apps.guestbook.loadError"));
        setLoading(false);
      },
    );

    return unsubscribe;
  }, [t]);

  const handleSubmit = useCallback(
    async (name: string, message: string, honeypot: string) => {
      if (hasSubmitted) return;

      // Honeypot check: if the hidden field has a value, silently reject
      if (honeypot) {
        // Pretend it worked so the bot doesn't retry
        setHasSubmitted(true);
        sessionStorage.setItem(RATE_LIMIT_KEY, "true");
        return;
      }

      // Timing check: reject submissions that happen too fast (bot behavior)
      if (Date.now() - mountedAt.current < MIN_SUBMIT_DELAY_MS) {
        setHasSubmitted(true);
        sessionStorage.setItem(RATE_LIMIT_KEY, "true");
        return;
      }

      const trimmedName = name.trim() || t("apps.guestbook.anonymous");
      const trimmedMessage = message.trim();

      try {
        await addGuestbookEntry(trimmedName, trimmedMessage);
        setHasSubmitted(true);
        sessionStorage.setItem(RATE_LIMIT_KEY, "true");
        trackEvent("guestbook_submit");
        playSound("guestbookSubmit");
      } catch (err) {
        console.error("Failed to submit guestbook entry:", err);
        setError(t("apps.guestbook.submitError"));
        playSound("error");
      }
    },
    [hasSubmitted, t, playSound],
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
        <GuestbookInput onSubmit={handleSubmit} disabled={hasSubmitted} />

        {/* Messages list */}
        <GuestbookMessages entries={entries} loading={loading} />
      </div>
    </div>
  );
}

export default GuestbookApp;
