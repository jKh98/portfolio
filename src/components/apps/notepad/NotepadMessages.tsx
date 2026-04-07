import { motion, AnimatePresence } from "framer-motion";
import { useTranslation } from "react-i18next";
import { MessageSquare, Loader2 } from "lucide-react";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";
import { GlassCard } from "@/components/ui";
import type { GuestbookEntry } from "./NotepadApp";

export interface NotepadMessagesProps {
  entries: GuestbookEntry[];
  loading?: boolean;
}

function formatTimestamp(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function NotepadMessages({ entries, loading }: NotepadMessagesProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 text-[var(--text-tertiary)]">
        <Loader2 size={20} className="animate-spin" />
        <p className="text-xs">{t("apps.notepad.loading")}</p>
      </div>
    );
  }

  if (entries.length === 0) {
    return (
      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduced ? 0 : ANIMATION.duration.slow }}
        className="flex-1 flex flex-col items-center justify-center gap-2 text-[var(--text-tertiary)]"
      >
        <MessageSquare size={24} />
        <p className="text-xs">{t("apps.notepad.noMessages")}</p>
      </motion.div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2 scroll-shadow">
      <AnimatePresence initial={!reduced}>
        {entries.map((entry, i) => (
          <motion.div
            key={entry.id}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.normal,
              delay: reduced ? 0 : i * 0.06,
            }}
          >
            <GlassCard className="p-3">
              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-medium text-[var(--accent)]">
                  {entry.name}
                </span>
                <span className="text-[10px] text-[var(--text-tertiary)]">
                  {formatTimestamp(entry.timestamp)}
                </span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] leading-relaxed whitespace-pre-wrap">
                {entry.message}
              </p>
            </GlassCard>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
