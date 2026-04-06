import { useState } from "react";
import { useTranslation } from "react-i18next";
import { ChevronRight, Folder, FolderOpen } from "lucide-react";
import { cn } from "@/utils/cn";
import { FILE_TREE } from "@/data";
import type { FileNode } from "@/data";

export interface FinderSidebarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export function FinderSidebar({ currentPath, onNavigate }: FinderSidebarProps) {
  const { t } = useTranslation();

  return (
    <aside
      className={cn(
        "w-40 shrink-0 border-e border-[var(--border)]",
        "overflow-y-auto py-2 px-1.5",
      )}
    >
      <p className="text-[10px] font-semibold uppercase tracking-wider text-[var(--text-tertiary)] px-2 mb-1">
        {t("apps.finder.favorites")}
      </p>
      {FILE_TREE.children?.map((child) =>
        child.kind === "folder" ? (
          <SidebarFolder
            key={child.name}
            node={child}
            parentPath="~"
            currentPath={currentPath}
            onNavigate={onNavigate}
          />
        ) : null,
      )}
    </aside>
  );
}

interface SidebarFolderProps {
  node: FileNode;
  parentPath: string;
  currentPath: string;
  onNavigate: (path: string) => void;
}

function SidebarFolder({
  node,
  parentPath,
  currentPath,
  onNavigate,
}: SidebarFolderProps) {
  const fullPath =
    parentPath === "~" ? `~/${node.name}` : `${parentPath}/${node.name}`;
  const isActive = currentPath === fullPath;
  const isParent = currentPath.startsWith(fullPath + "/");
  const [expanded, setExpanded] = useState(isActive || isParent);
  const subfolders = node.children?.filter((c) => c.kind === "folder") ?? [];

  return (
    <div>
      <div
        role="button"
        tabIndex={0}
        onClick={() => {
          onNavigate(fullPath);
          if (subfolders.length > 0) setExpanded(true);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onNavigate(fullPath);
            if (subfolders.length > 0) setExpanded(true);
          }
        }}
        className={cn(
          "w-full flex items-center gap-1.5 px-2 py-1 rounded-md text-xs transition-colors cursor-pointer",
          isActive
            ? "bg-[var(--accent)] bg-opacity-15 text-[var(--text-primary)]"
            : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)]",
        )}
      >
        {subfolders.length > 0 && (
          <span
            role="button"
            tabIndex={0}
            onClick={(e) => {
              e.stopPropagation();
              setExpanded(!expanded);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.stopPropagation();
                e.preventDefault();
                setExpanded(!expanded);
              }
            }}
            className="p-0 shrink-0 cursor-pointer"
          >
            <ChevronRight
              size={10}
              className={cn(
                "transition-transform",
                expanded && "rotate-90",
              )}
            />
          </span>
        )}
        {subfolders.length === 0 && <span className="w-[10px]" />}
        {isActive || expanded ? (
          <FolderOpen size={14} className="shrink-0 text-[var(--accent)]" />
        ) : (
          <Folder size={14} className="shrink-0" />
        )}
        <span className="truncate">{node.name}</span>
      </div>
      {expanded &&
        subfolders.map((sub) => (
          <div key={sub.name} className="ps-3">
            <SidebarFolder
              node={sub}
              parentPath={fullPath}
              currentPath={currentPath}
              onNavigate={onNavigate}
            />
          </div>
        ))}
    </div>
  );
}
