import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Send } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";

const MAX_CHARS = 500;

export interface GuestbookInputProps {
  onSubmit: (name: string, message: string, honeypot: string) => void;
  disabled: boolean;
}

export function GuestbookInput({ onSubmit, disabled }: GuestbookInputProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  // Honeypot: invisible field that bots will fill in, humans won't see
  const [website, setWebsite] = useState("");

  const canSubmit = message.trim().length > 0 && !disabled;

  const handleSubmit = () => {
    if (!canSubmit) return;
    onSubmit(name, message, website);
    setName("");
    setMessage("");
    setWebsite("");
  };

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : ANIMATION.duration.normal }}
      className={cn(
        "px-4 py-3 border-b border-[var(--border)]",
        "space-y-2 shrink-0",
      )}
    >
      <input
        type="text"
        placeholder={t("apps.guestbook.namePlaceholder")}
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={disabled}
        maxLength={50}
        className={cn(
          "w-full px-3 py-1.5 rounded-lg text-xs",
          "bg-[var(--bg-glass-inner)] border border-[var(--border)]",
          "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
          "focus:outline-none focus:border-[var(--accent)]",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          "transition-colors",
        )}
      />

      {/* Honeypot field — hidden from humans, attractive to bots */}
      <input
        type="text"
        name="website"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: "1px",
          height: "1px",
          overflow: "hidden",
          opacity: 0,
        }}
      />

      <textarea
        placeholder={
          disabled
            ? t("apps.guestbook.alreadySubmitted")
            : t("apps.guestbook.messagePlaceholder")
        }
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        disabled={disabled}
        maxLength={MAX_CHARS}
        rows={3}
        className={cn(
          "w-full px-3 py-1.5 rounded-lg text-xs resize-none",
          "bg-[var(--bg-glass-inner)] border border-[var(--border)]",
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
        <motion.button
          type="button"
          onClick={handleSubmit}
          disabled={!canSubmit}
          whileTap={canSubmit && !reduced ? { scale: 0.95 } : undefined}
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium",
            "transition-colors cursor-pointer",
            canSubmit
              ? "bg-[var(--accent)] text-white hover:brightness-110"
              : "bg-[var(--bg-glass-inner)] text-[var(--text-tertiary)] cursor-not-allowed opacity-50",
          )}
        >
          <Send size={12} />
          {t("apps.guestbook.submit")}
        </motion.button>
      </div>
    </motion.div>
  );
}
