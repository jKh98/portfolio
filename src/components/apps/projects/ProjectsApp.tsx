import { useState } from "react";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { PROJECTS, getProjectTags } from "@/data/projects";
import { useReducedMotion } from "@/hooks";
import { useIsMobile } from "@/hooks";
import { ProjectCard } from "./ProjectCard";
import { ProjectToolbar } from "./ProjectToolbar";

export function ProjectsApp() {
  const { t } = useTranslation();
  const isMobile = useIsMobile();
  const reduced = useReducedMotion();
  const [activeTag, setActiveTag] = useState<string | null>(null);

  const tags = getProjectTags();
  const filtered = activeTag
    ? PROJECTS.filter((p) => p.tags.includes(activeTag))
    : PROJECTS;

  return (
    <div className="flex flex-col h-full">
      <ProjectToolbar
        tags={tags}
        activeTag={activeTag}
        onTagSelect={setActiveTag}
      />
      <div
        className={cn(
          "flex-1 overflow-y-auto p-4 scroll-shadow",
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
