import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { PROJECTS, PROJECT_CATEGORIES } from "@/data/projects";
import type { ProjectCategory } from "@/data/projects";
import { useReducedMotion } from "@/hooks";
import { useIsMobile } from "@/hooks";
import { ProjectCard } from "./ProjectCard";
import { ProjectToolbar } from "./ProjectToolbar";

export function ProjectsApp() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | null>(
    null,
  );

  const filtered = activeCategory
    ? PROJECTS.filter((p) => p.category === activeCategory)
    : PROJECTS;

  return (
    <div className="flex flex-col h-full">
      <ProjectToolbar
        categories={PROJECT_CATEGORIES}
        activeCategory={activeCategory}
        onCategorySelect={setActiveCategory}
      />
      <div
        className={cn(
          "flex-1 overflow-y-auto p-4 pb-16 md:pb-4 scroll-shadow",
          "grid gap-4",
          isMobile ? "grid-cols-1" : "grid-cols-2",
        )}
      >
        {filtered.map((project, i) => (
          <ProjectCard
            key={project.id}
            project={project}
            index={i}
            reduced={reduced}
          />
        ))}
        {filtered.length === 0 && (
          <p className="col-span-full text-center text-[var(--text-tertiary)] py-8">
            {t("apps.projects.noResults")}
          </p>
        )}
      </div>
    </div>
  );
}

export default ProjectsApp;
