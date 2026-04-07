import { useCallback, useRef } from "react";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import {
  File,
  FileText,
  Folder,
  ExternalLink,
  Download,
  AppWindow,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";
import type { FileNode } from "@/data";

export interface FinderFileListProps {
  node: FileNode;
  selectedFile: string | null;
  onSelect: (name: string | null) => void;
  onDoubleClick: (node: FileNode) => void;
  onGoBack?: () => void;
  isMobile?: boolean;
}

const KIND_ICONS: Record<
  FileNode["kind"],
  React.ComponentType<{ size?: number; className?: string }>
> = {
  folder: Folder,
  pdf: Download,
  txt: FileText,
  link: ExternalLink,
  app: AppWindow,
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function FinderFileList({
  node,
  selectedFile,
  onSelect,
  onDoubleClick,
  onGoBack,
  isMobile = false,
}: FinderFileListProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const children = node.children ?? [];
  const containerRef = useRef<HTMLDivElement>(null);

  const gridCols = isMobile ? "grid-cols-[1fr]" : "grid-cols-[1fr_80px_100px]";

  const selectedIndex = selectedFile
    ? children.findIndex((c) => c.name === selectedFile)
    : -1;

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (children.length === 0) return;

      switch (e.key) {
        case "ArrowDown": {
          e.preventDefault();
          const next =
            selectedIndex < children.length - 1 ? selectedIndex + 1 : 0;
          onSelect(children[next].name);
          // Scroll the row into view
          const row = containerRef.current?.querySelector(
            `[data-index="${next}"]`,
          );
          row?.scrollIntoView({ block: "nearest" });
          break;
        }
        case "ArrowUp": {
          e.preventDefault();
          const prev =
            selectedIndex > 0 ? selectedIndex - 1 : children.length - 1;
          onSelect(children[prev].name);
          const row = containerRef.current?.querySelector(
            `[data-index="${prev}"]`,
          );
          row?.scrollIntoView({ block: "nearest" });
          break;
        }
        case "Enter": {
          e.preventDefault();
          if (selectedIndex >= 0) {
            onDoubleClick(children[selectedIndex]);
          }
          break;
        }
        case "Escape": {
          e.preventDefault();
          onSelect(null);
          break;
        }
        case "Backspace": {
          e.preventDefault();
          onGoBack?.();
          break;
        }
        case "Home": {
          e.preventDefault();
          if (children.length > 0) {
            onSelect(children[0].name);
            const row = containerRef.current?.querySelector(
              `[data-index="0"]`,
            );
            row?.scrollIntoView({ block: "nearest" });
          }
          break;
        }
        case "End": {
          e.preventDefault();
          if (children.length > 0) {
            const last = children.length - 1;
            onSelect(children[last].name);
            const row = containerRef.current?.querySelector(
              `[data-index="${last}"]`,
            );
            row?.scrollIntoView({ block: "nearest" });
          }
          break;
        }
      }
    },
    [children, selectedIndex, onSelect, onDoubleClick, onGoBack],
  );

  if (children.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-[var(--text-tertiary)]">
        {t("apps.finder.empty")}
      </div>
    );
  }

  const activeDescendant =
    selectedIndex >= 0 ? `finder-row-${selectedIndex}` : undefined;

  return (
    <div
      ref={containerRef}
      role="listbox"
      tabIndex={0}
      aria-label={t("apps.finder.name")}
      aria-activedescendant={activeDescendant}
      onKeyDown={handleKeyDown}
      className="flex-1 overflow-y-auto pb-12 md:pb-0 outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-inset rounded-sm"
    >
      {/* Header row */}
      <div
        className={cn(
          "grid gap-2 px-3 py-1.5",
          gridCols,
          "text-[10px] font-semibold uppercase tracking-wider",
          "text-[var(--text-tertiary)] border-b border-[var(--border)]",
          "sticky top-0 bg-[var(--bg-glass-inner)] backdrop-blur-sm z-10",
        )}
        aria-hidden="true"
      >
        <span>{t("apps.finder.name")}</span>
        {!isMobile && <span>{t("apps.finder.kind")}</span>}
        {!isMobile && <span>{t("apps.finder.modified")}</span>}
      </div>

      {/* File rows */}
      {children.map((child, i) => {
        const Icon = KIND_ICONS[child.kind] ?? File;
        const isSelected = selectedFile === child.name;

        return (
          <motion.div
            key={child.name}
            id={`finder-row-${i}`}
            data-index={i}
            role="option"
            aria-selected={isSelected}
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.fast,
              delay: reduced ? 0 : i * 0.03,
            }}
            onClick={() => onSelect(child.name)}
            onDoubleClick={() => onDoubleClick(child)}
            className={cn(
              "w-full grid gap-2 px-3 py-1.5",
              gridCols,
              "text-xs text-start transition-colors cursor-pointer",
              isSelected
                ? "bg-[var(--accent)] bg-opacity-15 text-[var(--text-primary)]"
                : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)]",
            )}
          >
            <span className="flex items-center gap-2 truncate">
              <Icon
                size={14}
                className={cn(
                  child.kind === "folder"
                    ? "text-[var(--accent)]"
                    : "text-[var(--text-tertiary)]",
                )}
              />
              <span className="truncate">{child.name}</span>
            </span>
            {!isMobile && (
              <span className="text-[var(--text-tertiary)] capitalize">
                {t(`apps.finder.kinds.${child.kind}`)}
              </span>
            )}
            {!isMobile && (
              <span className="text-[var(--text-tertiary)]">
                {formatDate(child.modified)}
              </span>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}
