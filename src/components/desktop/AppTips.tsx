import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { X, Lightbulb } from "lucide-react";
import { cn } from "@/utils/cn";
import { APP_DEFINITIONS } from "@/constants";
import type { AppId } from "@/types";

export interface AppTipsProps {
  isOpen: boolean;
  onClose: () => void;
  appId?: AppId;
}

/**
 * macOS-style tips popover shown from the Help menu.
 * Displays contextual tips for the currently focused app,
 * plus a generic tip that always applies.
 */
export function AppTips({ isOpen, onClose, appId }: AppTipsProps) {
  const { t } = useTranslation();

  const appDef = appId
    ? APP_DEFINITIONS.find((a) => a.id === appId)
    : undefined;

  const appName = appDef ? t(appDef.titleKey) : undefined;

  // Contextual tip for the focused app (falls back to generic)
  const appTipKey = appId ? `tips.${appId}` : "tips.generic";
  const appTip = t(appTipKey);
  const genericTip = t("tips.generic");

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

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ duration: 0.15 }}
          className={cn(
            "relative w-full max-w-[380px] mx-4",
            "rounded-xl overflow-hidden",
            "backdrop-blur-2xl backdrop-saturate-150 border",
            "bg-[var(--bg-glass)] border-[var(--border)]",
            "shadow-[var(--shadow-lg)]",
            "p-5",
          )}
          role="dialog"
          aria-modal="true"
          aria-label={
            appName
              ? t("topbar.menu.tipsForApp", { app: appName })
              : t("topbar.menu.help")
          }
        >
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Lightbulb size={14} className="text-[var(--accent)]" />
              <h2 className="text-sm font-semibold text-[var(--text-primary)]">
                {appName
                  ? t("topbar.menu.tipsForApp", { app: appName })
                  : t("topbar.menu.help")}
              </h2>
            </div>
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

          {/* App-specific tip */}
          {appId && (
            <div
              className={cn(
                "rounded-lg p-3 mb-3",
                "bg-[var(--bg-surface)] border border-[var(--border)]",
              )}
            >
              <p className="text-xs leading-relaxed text-[var(--text-primary)]">
                {appTip}
              </p>
            </div>
          )}

          {/* Generic tip (always shown, but skip if same as app tip) */}
          {(!appId || appTip !== genericTip) && (
            <div
              className={cn(
                "rounded-lg p-3",
                "bg-[var(--bg-surface)]/50 border border-[var(--border)]",
              )}
            >
              <p className="text-[11px] leading-relaxed text-[var(--text-secondary)]">
                {genericTip}
              </p>
            </div>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
