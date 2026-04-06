import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { EXPERIENCE } from "@/data";
import { useAppMenuAction } from "@/hooks";
import { WindowToolbar } from "@/components/window";
import { ExperienceTimeline } from "./ExperienceTimeline";

/** Extract unique company names for filter pills */
const COMPANIES = ["All", ...new Set(EXPERIENCE.map((exp) => exp.company))];

export function ExperienceApp() {
  const { t } = useTranslation();
  const [activeCompany, setActiveCompany] = useState("All");
  const [allExpanded, setAllExpanded] = useState(false);
  const [expandedIds, setExpandedIds] = useState<Set<string>>(() => {
    // First item expanded by default
    return new Set(EXPERIENCE.length > 0 ? [EXPERIENCE[0].id] : []);
  });

  const filteredExperience =
    activeCompany === "All"
      ? EXPERIENCE
      : EXPERIENCE.filter((exp) => exp.company === activeCompany);

  const toggleExpand = useCallback((id: string) => {
    setExpandedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const expandAll = useCallback(() => {
    setAllExpanded(true);
    setExpandedIds(new Set(filteredExperience.map((exp) => exp.id)));
  }, [filteredExperience]);

  const collapseAll = useCallback(() => {
    setAllExpanded(false);
    setExpandedIds(new Set());
  }, []);

  const toggleAll = useCallback(() => {
    if (allExpanded) {
      collapseAll();
    } else {
      expandAll();
    }
  }, [allExpanded, collapseAll, expandAll]);

  // Listen for View menu actions (Expand All / Collapse All)
  useAppMenuAction(
    useCallback(
      (action: string) => {
        if (action === "expand-all") expandAll();
        else if (action === "collapse-all") collapseAll();
      },
      [expandAll, collapseAll],
    ),
  );

  return (
    <>
      <WindowToolbar>
        {/* macOS-style segmented control — scrolls horizontally on narrow windows */}
        <div className="min-w-0 overflow-x-auto scrollbar-none">
          <div
            className={cn(
              "inline-flex items-center",
              "rounded-md border border-[var(--border)]",
              "bg-[var(--bg-glass)]",
            )}
          >
            {COMPANIES.map((company, i) => (
              <button
                key={company}
                type="button"
                onClick={() => setActiveCompany(company)}
                className={cn(
                  "whitespace-nowrap px-2 py-0.5 text-[11px] font-medium",
                  "transition-colors duration-150 cursor-pointer",
                  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]",
                  i > 0 && "border-s border-[var(--border)]",
                  activeCompany === company
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)]",
                )}
              >
                {company === "All" ? t("common.all") : company}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        <button
          type="button"
          onClick={toggleAll}
          aria-label={
            allExpanded ? t("common.collapseAll") : t("common.expandAll")
          }
          className={cn(
            "shrink-0 p-1 rounded-md",
            "text-[var(--text-secondary)]",
            "hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)]",
            "transition-colors duration-150 cursor-pointer",
          )}
        >
          <ChevronsUpDown size={14} />
        </button>
      </WindowToolbar>
      <div
        className={cn(
          "h-full overflow-y-auto p-4",
          "scrollbar-thin scroll-shadow",
        )}
      >
        <ExperienceTimeline
          experiences={filteredExperience}
          expandedIds={expandedIds}
          onToggleExpand={toggleExpand}
        />
      </div>
    </>
  );
}

export default ExperienceApp;
