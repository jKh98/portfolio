import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/utils/cn";
import { ANIMATION } from "@/constants";
import type { Project } from "@/data/projects";

export interface ProjectCardProps {
  project: Project;
  index: number;
  reduced: boolean;
}

export function ProjectCard({ project, index, reduced }: ProjectCardProps) {
  const { t } = useTranslation();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : ANIMATION.duration.normal,
        delay: reduced ? 0 : index * 0.08,
      }}
      className={cn(
        "rounded-xl p-4 border transition-colors",
        "bg-[var(--bg-glass)] hover:bg-[var(--bg-glass-hover)]",
        project.featured
          ? "border-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]"
          : "border-[var(--border)]",
      )}
    >
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
        {t(project.nameKey)}
      </h3>
      <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
        {t(project.descriptionKey)}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5 mt-3">
        {project.tags.map((tag) => (
          <span
            key={tag}
            className={cn(
              "px-2 py-0.5 rounded-full text-[10px]",
              "bg-[var(--accent-glow)] text-[var(--accent)]",
              "border border-[var(--border-accent)]",
            )}
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Links */}
      <div className="flex gap-3 mt-3">
        {project.url && (
          <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[var(--accent)] hover:underline"
          >
            <ExternalLink size={12} />
            {t("apps.projects.demo")}
          </a>
        )}
        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <Github size={12} />
            GitHub
          </a>
        )}
      </div>
    </motion.div>
  );
}
