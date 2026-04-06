import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { cn } from "@/utils/cn";

const MAX_CHARS = 500;

export interface NotepadInputProps {
  onSubmit: (name: string, message: string) => void;
  disabled: boolean;
}

export function NotepadInput({ onSubmit, disabled }: NotepadInputProps) {
  const { t } = useTranslation();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");

  const canSubmit = message.trim().length > 0 && !disabled;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(name, message);
    setName("");
    setMessage("");
  };

  return (
    <div
      className={cn(
        "px-4 py-3 border-b border-[var(--border)]",
        "space-y-2 shrink-0",
      )}
    >
      <input
        type="text"
        placeholder={t("apps.notepad.namePlaceholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
        maxLength={50}
        className={cn(
          "w-full px-3 py-1.5 rounded-lg text-xs",
          "bg-[var(--bg-glass)] border border-[var(--border)]",
          "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
          "focus:outline-none focus:border-[var(--accent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors",
        )}
      />
      <textarea
        placeholder={
          disabled
            ? t("apps.notepad.alreadySubmitted")
            : t("apps.notepad.messagePlaceholder")
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        maxLength={MAX_CHARS}
        rows={3}
        className={cn(
          "w-full px-3 py-1.5 rounded-lg text-xs resize-none",
          "bg-[var(--bg-glass)] border border-[var(--border)]",
          "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
          "focus:outline-none focus:border-[var(--accent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors",
        )}
      />
      <div className="flex items-center justify-between">
        <span className="text-[10px] text-[var(--text-tertiary)]">
          {message.length}/{MAX_CHARS}
        </span>
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
            "transition-colors cursor-pointer",
            canSubmit
              ? "bg-[var(--accent)] text-white hover:brightness-110"
              : "bg-[var(--bg-glass)] text-[var(--text-tertiary)] cursor-not-allowed opacity-50",
          )}
        >
          <Send size={12} />
          {t("apps.notepad.submit")}
        </button>
      </div>
    </div>
  );
}
