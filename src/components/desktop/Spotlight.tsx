import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/utils/cn";
import { useWindowManager, useTheme } from "@/context";
import { useAudio } from "@/hooks";
import { buildSpotlightIndex } from "@/data";
import { trackEvent } from "@/lib/analytics";
import type { SpotlightCategory, SpotlightItem } from "@/data";
import { SpotlightResults } from "./SpotlightResults";

export interface SpotlightProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Spotlight({ isOpen, onClose }: SpotlightProps) {
  const { t, i18n } = useTranslation();
  const { openWindow } = useWindowManager();
  const { toggleTheme } = useTheme();
  const { playSound } = useAudio();
  const [query, setQuery] = useState("");
  const [selectedIdx, setSelectedIdx] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const index = useMemo(() => buildSpotlightIndex(), []);

  const resolvedIndex = useMemo(
    () =>
      index.map((item) => ({
        ...item,
        label: item.labelKey ? t(item.labelKey) : item.label,
      })),
    [index, t],
  );

  const filtered = useMemo(() => {
    if (!query.trim()) return resolvedIndex.slice(0, 8);
    const q = query.toLowerCase();
    return resolvedIndex.filter((item) =>
      item.label.toLowerCase().includes(q),
    );
  }, [query, resolvedIndex]);

  // Reset selection when results change
  useEffect(() => {
    setSelectedIdx(0);
  }, [filtered.length]);

  // Reset state and focus input when opening
  useEffect(() => {
    if (isOpen) {
      setQuery("");
      setSelectedIdx(0);
      requestAnimationFrame(() => inputRef.current?.focus());
      trackEvent("spotlight_open");
    }
  }, [isOpen]);

  // Scroll selected item into view
  useEffect(() => {
    if (!isOpen || !listRef.current) return;
    const el = listRef.current.children[selectedIdx] as HTMLElement;
    el?.scrollIntoView({ block: "nearest" });
  }, [isOpen, selectedIdx]);

  const executeAction = useCallback(
    (item: SpotlightItem & { label: string }) => {
      onClose();
      playSound("spotlightSelect");
      trackEvent("spotlight_select", { label: item.label, category: item.category });
      const { action } = item;
      if (action.type === "open-app") openWindow(action.appId);
      else if (action.type === "external")
        window.open(action.url, "_blank", "noopener,noreferrer");
      else if (action.id === "toggle-theme") toggleTheme();
      else if (action.id === "switch-language")
        i18n.changeLanguage(i18n.language === "ar" ? "en" : "ar");
    },
    [onClose, openWindow, toggleTheme, i18n, playSound],
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIdx((p) => Math.min(p + 1, filtered.length - 1));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIdx((p) => Math.max(p - 1, 0));
      } else if (e.key === "Enter") {
        e.preventDefault();
        if (filtered[selectedIdx]) executeAction(filtered[selectedIdx]);
      } else if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    },
    [filtered, selectedIdx, executeAction, onClose],
  );

  const categoryLabel = useCallback(
    (cat: SpotlightCategory) => t(`topbar.spotlight.categories.${cat}`),
    [t],
  );

  // Portal with AnimatePresence at the top level so exit animations work
  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="spotlight-overlay"
          className="fixed inset-0 z-[9998] flex items-start justify-center pt-[20vh]"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
        >
          <div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.15 }}
            className={cn(
              "relative w-full max-w-[600px] mx-4 rounded-xl overflow-hidden",
              "backdrop-blur-2xl backdrop-saturate-150 border bg-[var(--bg-glass)] border-[var(--border)]",
              "shadow-[var(--shadow-lg)]",
            )}
            role="dialog"
            aria-modal="true"
            aria-label="Spotlight search"
          >
            <div className="flex items-center gap-3 px-4 py-3 border-b border-[var(--border)]">
              <Search
                size={18}
                className="text-[var(--text-secondary)] shrink-0"
              />
              <input
                ref={inputRef}
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder={t("topbar.spotlight.placeholder")}
                className={cn(
                  "flex-1 bg-transparent outline-none text-sm",
                  "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
                )}
                aria-label="Search"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
            <div
              ref={listRef}
              className="max-h-[300px] overflow-y-auto py-1"
              role="listbox"
            >
              <SpotlightResults
                items={filtered}
                selectedIdx={selectedIdx}
                noResultsText={t("topbar.spotlight.noResults")}
                categoryLabel={categoryLabel}
                onSelect={(idx) => executeAction(filtered[idx])}
                onHover={setSelectedIdx}
              />
            </div>
            <SpotlightFooter />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
}

function SpotlightFooter() {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between px-4 py-2 border-t border-[var(--border)] text-[10px] text-[var(--text-tertiary)]">
      <span>
        <kbd className="px-1 rounded bg-[var(--bg-surface)] border border-[var(--border)]">
          &uarr;&darr;
        </kbd>{" "}
        {t("topbar.spotlight.footer.navigate")}
      </span>
      <span>
        <kbd className="px-1 rounded bg-[var(--bg-surface)] border border-[var(--border)]">
          &crarr;
        </kbd>{" "}
        {t("topbar.spotlight.footer.select")}
      </span>
      <span>
        <kbd className="px-1 rounded bg-[var(--bg-surface)] border border-[var(--border)]">
          esc
        </kbd>{" "}
        {t("topbar.spotlight.footer.close")}
      </span>
    </div>
  );
}
