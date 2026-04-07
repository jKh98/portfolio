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
  isMobile = false,
}: FinderFileListProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const children = node.children ?? [];

  const gridCols = isMobile ? "grid-cols-[1fr]" : "grid-cols-[1fr_80px_100px]";

  if (children.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-[var(--text-tertiary)]">
        {t("apps.finder.empty")}
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto">
      {/* Header row */}
      <div
        className={cn(
          "grid gap-2 px-3 py-1.5",
          gridCols,
          "text-[10px] font-semibold uppercase tracking-wider",
          "text-[var(--text-tertiary)] border-b border-[var(--border)]",
          "sticky top-0 bg-[var(--bg-glass-inner)] backdrop-blur-sm z-10",
        )}
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
          <motion.button
            key={child.name}
            type="button"
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
          </motion.button>
        );
      })}
    </div>
  );
}
