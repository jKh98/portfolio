import { useState, useCallback } from "react";
import { useTranslation } from "react-i18next";
import { ChevronsUpDown } from "lucide-react";
import { cn } from "@/utils/cn";
import { EXPERIENCE } from "@/data";
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

  const toggleAll = useCallback(() => {
    setAllExpanded((prev) => {
      const next = !prev;
      if (next) {
        setExpandedIds(new Set(filteredExperience.map((exp) => exp.id)));
      } else {
        setExpandedIds(new Set());
      }
      return next;
    });
  }, [filteredExperience]);

  return (
    <>
      <WindowToolbar>
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {COMPANIES.map((company) => (
            <button
              key={company}
              type="button"
              onClick={() => setActiveCompany(company)}
              className={cn(
                "shrink-0 px-2.5 py-1 rounded-md text-xs font-medium",
                "transition-all duration-200 cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]",
                activeCompany === company
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)]",
              )}
            >
              {company === "All" ? t("common.all") : company}
            </button>
          ))}
        </div>
        <button
          type="button"
          onClick={toggleAll}
          aria-label={
            allExpanded ? t("common.collapseAll") : t("common.expandAll")
          }
          className={cn(
            "shrink-0 flex items-center gap-1 px-2 py-1 rounded-md",
            "text-xs text-[var(--text-secondary)]",
            "hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)]",
            "transition-all duration-200 cursor-pointer",
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
