import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { useAudio } from "@/hooks";
import { WindowToolbar } from "@/components/window";
import type { ProjectCategory } from "@/data/projects";

export interface ProjectToolbarProps {
  categories: ProjectCategory[];
  activeCategory: ProjectCategory | null;
  onCategorySelect: (category: ProjectCategory | null) => void;
}

export function ProjectToolbar({
  categories,
  activeCategory,
  onCategorySelect,
}: ProjectToolbarProps) {
  const { t } = useTranslation();
  const { playSound } = useAudio();

  return (
    <WindowToolbar className="gap-1.5 overflow-x-auto">
      <button
        onClick={() => {
          onCategorySelect(null);
          playSound("tabSwitch");
        }}
        className={cn(
          "shrink-0 px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer",
          !activeCategory
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        )}
      >
        {t("common.all")}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => {
            onCategorySelect(cat === activeCategory ? null : cat);
            playSound("tabSwitch");
          }}
          className={cn(
            "shrink-0 px-2.5 py-1 rounded-full text-xs transition-colors cursor-pointer",
            cat === activeCategory
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
          )}
        >
          {t(`apps.projects.categories.${cat}`)}
        </button>
      ))}
    </WindowToolbar>
  );
}
