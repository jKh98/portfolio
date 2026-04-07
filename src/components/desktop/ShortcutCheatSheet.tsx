import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/utils/cn";
import { APP_DEFINITIONS } from "@/constants";

export interface ShortcutCheatSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ShortcutEntry {
  keys: string;
  descriptionKey: string;
  descriptionParams?: Record<string, string>;
}

export function ShortcutCheatSheet({ isOpen, onClose }: ShortcutCheatSheetProps) {
  const { t } = useTranslation();

  const appShortcuts: ShortcutEntry[] = APP_DEFINITIONS.map((app, idx) => ({
    keys: `\u2318${idx + 1}`,
    descriptionKey: "shortcuts.openApp",
    descriptionParams: { app: t(app.titleKey) },
  }));

  const systemShortcuts: ShortcutEntry[] = [
    { keys: "Esc", descriptionKey: "shortcuts.closeWindow" },
    { keys: "\u2318M", descriptionKey: "shortcuts.minimizeWindow" },
    { keys: "\u2318K", descriptionKey: "shortcuts.openSpotlight" },
    { keys: "\u2318`", descriptionKey: "shortcuts.cycleWindows" },
    { keys: "?", descriptionKey: "shortcuts.showShortcuts" },
  ];

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9998] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.15 }}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/30 backdrop-blur-sm"
          onClick={onClose}
        />

        {/* Sheet */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "relative w-full max-w-[420px] mx-4",
            "rounded-xl overflow-hidden",
            "backdrop-blur-2xl backdrop-saturate-150 border",
            "bg-[var(--bg-glass)] border-[var(--border)]",
            "shadow-[var(--shadow-lg)]",
            "p-5",
          )}
          role="dialog"
          aria-modal="true"
          aria-label={t("shortcuts.title")}
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-[var(--text-primary)]">
              {t("shortcuts.title")}
            </h2>
            <button
              type="button"
              onClick={onClose}
              aria-label={t("common.close")}
              className={cn(
                "h-6 w-6 rounded-md flex items-center justify-center",
                "text-[var(--text-secondary)]",
                "hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)]",
                "transition-colors duration-100",
                "cursor-pointer",
              )}
            >
              <X size={14} />
            </button>
          </div>

          {/* App shortcuts */}
          <div className="space-y-1 mb-4">
            {appShortcuts.map((s) => (
              <ShortcutRow
                key={s.keys}
                keys={s.keys}
                description={t(s.descriptionKey, s.descriptionParams)}
              />
            ))}
          </div>

          {/* Separator */}
          <div className="border-t border-[var(--border)] my-3" />

          {/* System shortcuts */}
          <div className="space-y-1">
            {systemShortcuts.map((s) => (
              <ShortcutRow
                key={s.keys}
                keys={s.keys}
                description={t(s.descriptionKey)}
              />
            ))}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}

interface ShortcutRowProps {
  keys: string;
  description: string;
}

function ShortcutRow({ keys, description }: ShortcutRowProps) {
  return (
    <div className="flex items-center justify-between py-1">
      <span className="text-xs text-[var(--text-primary)]">{description}</span>
      <kbd
        className={cn(
          "px-2 py-0.5 rounded text-[10px] font-mono",
          "bg-[var(--bg-surface)] border border-[var(--border)]",
          "text-[var(--text-secondary)]",
        )}
      >
        {keys}
      </kbd>
    </div>
  );
}
