import { useTranslation } from "react-i18next";
import { MessageSquare } from "lucide-react";
import { cn } from "@/utils/cn";
import type { GuestbookEntry } from "./NotepadApp";

export interface NotepadMessagesProps {
  entries: GuestbookEntry[];
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

export function NotepadMessages({ entries }: NotepadMessagesProps) {
  const { t } = useTranslation();

  if (entries.length === 0) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-2 text-[var(--text-tertiary)]">
        <MessageSquare size={24} />
        <p className="text-xs">{t("apps.notepad.noMessages")}</p>
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto px-4 py-3 space-y-2">
      {entries.map((entry) => (
        <div
          key={entry.id}
          className={cn(
            "rounded-lg p-3",
            "bg-[var(--bg-glass)] border border-[var(--border)]",
          )}
        >
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
        </div>
      ))}
    </div>
  );
}
