import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import {
  Monitor,
  AppWindow,
  Terminal,
  Search,
  Keyboard,
  Palette,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useIsMobile } from "@/hooks";

export interface WelcomeModalProps {
  isOpen: boolean;
  onDismiss: () => void;
}

/** Feature row descriptor */
interface Feature {
  icon: React.ReactNode;
  textKey: string;
}

const FEATURES: Feature[] = [
  { icon: <Monitor size={15} />,    textKey: "welcome.features.apps" },
  { icon: <AppWindow size={15} />,  textKey: "welcome.features.windows" },
  { icon: <Terminal size={15} />,   textKey: "welcome.features.terminal" },
  { icon: <Search size={15} />,     textKey: "welcome.features.spotlight" },
  { icon: <Keyboard size={15} />,   textKey: "welcome.features.shortcuts" },
  { icon: <Palette size={15} />,    textKey: "welcome.features.theme" },
];

/**
 * First-visit welcome modal.
 * Teaches visitors what they can do with the interactive portfolio.
 * Shown once after the boot sequence, then dismissed permanently via localStorage.
 */
export function WelcomeModal({ isOpen, onDismiss }: WelcomeModalProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  if (!isOpen) return null;

  return createPortal(
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[9997] flex items-center justify-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />

        {/* Panel */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 12 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className={cn(
            "relative w-full max-w-[440px] mx-4",
            "rounded-xl overflow-hidden",
            "backdrop-blur-2xl backdrop-saturate-150 border",
            "bg-[var(--bg-glass)] border-[var(--border)]",
            "shadow-[var(--shadow-lg)]",
            "p-6",
          )}
          role="dialog"
          aria-modal="true"
          aria-label={t("welcome.title")}
        >
          {/* Title */}
          <h2 className="text-base font-semibold text-[var(--text-primary)] mb-1">
            {t("welcome.title")}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mb-5">
            {t("welcome.subtitle")}
          </p>

          {/* Feature list */}
          <div className="space-y-3 mb-6">
            {FEATURES.map((f) => (
              <div key={f.textKey} className="flex items-start gap-3">
                <span className="mt-0.5 shrink-0 text-[var(--accent)]">
                  {f.icon}
                </span>
                <span className="text-xs leading-relaxed text-[var(--text-primary)]">
                  {t(f.textKey)}
                </span>
              </div>
            ))}
          </div>

          {/* Desktop recommendation note */}
          {isMobile && (
            <div
              className={cn(
                "flex items-center gap-2 rounded-lg px-3 py-2.5 mb-4",
                "bg-[var(--accent)]/10 border border-[var(--accent)]/20",
              )}
            >
              <Monitor size={14} className="shrink-0 text-[var(--accent)]" />
              <p className="text-[11px] leading-snug text-[var(--text-secondary)]">
                {t("welcome.desktopNote")}
              </p>
            </div>
          )}

          {/* Dismiss button */}
          <button
            type="button"
            onClick={onDismiss}
            className={cn(
              "w-full py-2 rounded-lg text-xs font-medium",
              "bg-[var(--accent)] text-white",
              "hover:brightness-110 active:brightness-95",
              "transition-all duration-150",
              "cursor-pointer",
            )}
          >
            {t("welcome.dismiss")}
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>,
    document.body,
  );
}
