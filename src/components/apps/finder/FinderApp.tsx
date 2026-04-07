import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils/cn";
import { useWindowManager } from "@/context";
import { useIsMobile, useAudio } from "@/hooks";
import { FILE_TREE, resolveNode, pathSegments } from "@/data";
import type { FileNode, FileAction } from "@/data";
import { WindowToolbar } from "@/components/window";
import { FinderSidebar } from "./FinderSidebar";
import { FinderFileList } from "./FinderFileList";

export function FinderApp() {
  const { t } = useTranslation();
  const { openWindow } = useWindowManager();
  const isMobile = useIsMobile();
  const { playSound } = useAudio();
  const [currentPath, setCurrentPath] = useState("~");
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [history, setHistory] = useState<string[]>(["~"]);
  const [historyIndex, setHistoryIndex] = useState(0);

  const currentNode = resolveNode(currentPath) ?? FILE_TREE;
  const segments = pathSegments(currentPath);

  const navigateTo = useCallback(
    (path: string) => {
      setCurrentPath(path);
      setSelectedFile(null);
      const newHistory = [...history.slice(0, historyIndex + 1), path];
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
      playSound("finderNavigate");
    },
    [history, historyIndex, playSound],
  );

  const goBack = useCallback(() => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedFile(null);
    }
  }, [history, historyIndex]);

  const goForward = useCallback(() => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setCurrentPath(history[newIndex]);
      setSelectedFile(null);
    }
  }, [history, historyIndex]);

  const handleFileAction = useCallback(
    (action: FileAction) => {
      switch (action.type) {
        case "download": {
          const a = document.createElement("a");
          a.href = action.url;
          a.download = "";
          a.click();
          playSound("fileDownload");
          break;
        }
        case "openApp":
          openWindow(action.appId);
          break;
        case "openUrl":
          window.open(action.url, "_blank", "noopener,noreferrer");
          break;
      }
    },
    [openWindow, playSound],
  );

  const handleDoubleClick = useCallback(
    (node: FileNode) => {
      if (node.kind === "folder") {
        const newPath =
          currentPath === "~"
            ? `~/${node.name}`
            : `${currentPath}/${node.name}`;
        navigateTo(newPath);
        playSound("finderOpen");
      } else if (node.action) {
        handleFileAction(node.action);
      }
    },
    [currentPath, navigateTo, handleFileAction, playSound],
  );

  /** Navigate up to the parent directory */
  const goUp = useCallback(() => {
    if (currentPath === "~") return;
    const parentPath = currentPath.includes("/")
      ? currentPath.slice(0, currentPath.lastIndexOf("/")) || "~"
      : "~";
    navigateTo(parentPath);
  }, [currentPath, navigateTo]);

  /** App-level keyboard shortcuts (Alt+Arrow for history navigation) */
  const handleAppKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.altKey && e.key === "ArrowLeft") {
        e.preventDefault();
        goBack();
      } else if (e.altKey && e.key === "ArrowRight") {
        e.preventDefault();
        goForward();
      }
    },
    [goBack, goForward],
  );

  const handleBreadcrumbClick = useCallback(
    (index: number) => {
      if (index === 0) {
        navigateTo("~");
      } else {
        const path = "~/" + segments.slice(1, index + 1).join("/");
        navigateTo(path);
      }
    },
    [segments, navigateTo],
  );

  return (
    <div className="flex h-full flex-col" onKeyDown={handleAppKeyDown}>
      {/* Toolbar with breadcrumbs + nav */}
      <WindowToolbar>
        <button
          type="button"
          onClick={goBack}
          disabled={historyIndex <= 0}
          aria-label={t("apps.finder.back")}
          className={cn(
            "p-1 rounded transition-colors",
            historyIndex > 0
              ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              : "text-[var(--text-tertiary)] cursor-not-allowed opacity-40",
          )}
        >
          <ChevronLeft size={16} />
        </button>
        <button
          type="button"
          onClick={goForward}
          disabled={historyIndex >= history.length - 1}
          aria-label={t("apps.finder.forward")}
          className={cn(
            "p-1 rounded transition-colors",
            historyIndex < history.length - 1
              ? "text-[var(--text-secondary)] hover:text-[var(--text-primary)] cursor-pointer"
              : "text-[var(--text-tertiary)] cursor-not-allowed opacity-40",
          )}
        >
          <ChevronRight size={16} />
        </button>

        {/* Breadcrumbs */}
        <nav
          aria-label={t("apps.finder.breadcrumb")}
          className="flex items-center gap-1 ms-2 text-xs overflow-x-auto scrollbar-none"
        >
          {segments.map((seg, i) => (
            <span key={i} className="flex items-center gap-1 shrink-0">
              {i > 0 && (
                <ChevronRight
                  size={10}
                  className="text-[var(--text-tertiary)]"
                />
              )}
              <button
                type="button"
                onClick={() => handleBreadcrumbClick(i)}
                className={cn(
                  "hover:text-[var(--accent)] transition-colors cursor-pointer",
                  i === segments.length - 1
                    ? "text-[var(--text-primary)] font-medium"
                    : "text-[var(--text-secondary)]",
                )}
              >
                {seg}
              </button>
            </span>
          ))}
        </nav>
      </WindowToolbar>

      {/* Main content */}
      <div className="flex flex-1 min-h-0">
        {!isMobile && (
          <FinderSidebar
            currentPath={currentPath}
            onNavigate={navigateTo}
          />
        )}
        <FinderFileList
          node={currentNode}
          selectedFile={selectedFile}
          onSelect={setSelectedFile}
          onDoubleClick={handleDoubleClick}
          onGoBack={goUp}
          isMobile={isMobile}
        />
      </div>
    </div>
  );
}

export default FinderApp;
