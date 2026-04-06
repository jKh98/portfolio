import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useTranslation } from "react-i18next";
import { User, RotateCcw, Power, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";

const GITHUB_REPO = "https://github.com/jKh98/portfolio";

export function BrandingMenu() {
  const { t } = useTranslation();
  const { openWindow } = useWindowManager();
  const [isOpen, setIsOpen] = useState(false);
  const [isShutDown, setIsShutDown] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setIsOpen(false), []);

  useEffect(() => {
    if (!isOpen) return;
    const handler = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) close();
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [isOpen, close]);

  const items = [
    { icon: <User size={14} />, label: t("topbar.branding.about"), onClick: () => { openWindow("profile"); close(); } },
    null,
    { icon: <RotateCcw size={14} />, label: t("topbar.branding.restart"), onClick: () => { sessionStorage.removeItem("booted"); close(); window.location.reload(); } },
    { icon: <Power size={14} />, label: t("topbar.branding.shutDown"), onClick: () => { close(); setIsShutDown(true); setTimeout(() => setIsShutDown(false), 2000); } },
    null,
    { icon: <ExternalLink size={14} />, label: t("topbar.branding.viewSource"), onClick: () => { window.open(GITHUB_REPO, "_blank", "noopener,noreferrer"); close(); } },
  ];

  return (
    <>
      <div ref={menuRef} className="relative">
        <button
          type="button"
          onClick={() => setIsOpen((p) => !p)}
          aria-label={t("topbar.branding.about")}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className={cn(
            "flex items-center gap-1.5",
            "hover:brightness-110 active:scale-95",
            "transition-all duration-150 cursor-pointer",
          )}
        >
          <span
            className={cn(
              "flex items-center justify-center",
              "h-5 w-5 rounded-md text-[10px] font-bold",
              "bg-[var(--accent)] text-white",
            )}
          >
            J
          </span>
          <span className="text-xs font-semibold text-[var(--text-primary)]">
            {t("topbar.name")}
          </span>
        </button>

        <AnimatePresence>
          {isOpen && (
            <motion.div
              role="menu"
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.1 }}
              className={cn(
                "absolute top-full start-0 mt-1 z-[9999]",
                "min-w-[200px] py-1 rounded-lg",
                "backdrop-blur-xl border",
                "bg-[var(--bg-glass)] border-[var(--border)]",
                "shadow-[var(--shadow-lg)]",
              )}
            >
              {items.map((item, idx) =>
                item === null ? (
                  <div key={idx} className="my-1 border-t border-[var(--border)]" role="separator" />
                ) : (
                  <button
                    key={idx}
                    type="button"
                    role="menuitem"
                    onClick={item.onClick}
                    className={cn(
                      "flex items-center gap-2 w-full px-3 py-1.5",
                      "text-xs text-[var(--text-primary)]",
                      "hover:bg-[var(--accent)] hover:text-white",
                      "transition-colors duration-100 cursor-pointer",
                    )}
                  >
                    <span className="w-4 h-4 flex items-center justify-center shrink-0">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ),
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Shut Down overlay — portaled to body to escape TopBar stacking context */}
      {createPortal(
        <AnimatePresence>
          {isShutDown && (
            <motion.div
              className="fixed inset-0 z-[99999] bg-black"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
            />
          )}
        </AnimatePresence>,
        document.body,
      )}
    </>
  );
}
