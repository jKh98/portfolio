import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { ExternalLink, Github } from "lucide-react";
import { cn } from "@/utils/cn";
import { ANIMATION } from "@/constants";
import { GlassCard, Badge, ImageCarousel } from "@/components/ui";
import { trackEvent } from "@/lib/analytics";
import type { Project } from "@/data/projects";

export interface ProjectCardProps {
  project: Project;
  index: number;
  reduced: boolean;
}

export function ProjectCard({ project, index, reduced }: ProjectCardProps) {
  const { t } = useTranslation();
  const projectName = t(project.nameKey);

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : ANIMATION.duration.normal,
        delay: reduced ? 0 : index * 0.08,
      }}
    >
      <GlassCard
        hoverable
        className={cn(
          "overflow-hidden",
          project.featured &&
            "border-[var(--accent)] shadow-[0_0_12px_var(--accent-glow)]",
        )}
      >
        {project.images && project.images.length > 0 ? (
          <ImageCarousel images={project.images} alt={projectName} />
        ) : project.imageUrl ? (
          <div className="w-full aspect-video overflow-hidden bg-black/10">
            <img
              src={project.imageUrl}
              alt={projectName}
              loading="lazy"
              className="w-full h-full object-cover object-top transition-transform duration-300 hover:scale-105"
            />
          </div>
        ) : null}
        <div className="p-4">
          <h3 className="text-sm font-semibold text-[var(--text-primary)] glass-text-shadow">
            {projectName}
          </h3>
          <p className="text-xs text-[var(--text-secondary)] mt-1 line-clamp-2">
            {t(project.descriptionKey)}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="accent" className="text-[10px] px-2 py-0.5 rounded-full">
                {tag}
              </Badge>
            ))}
          </div>

          {/* Links */}
          <div className="flex gap-3 mt-3">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent("project_demo_click", { project: projectName })}
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
                onClick={() => trackEvent("project_github_click", { project: projectName })}
                className="inline-flex items-center gap-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              >
                <Github size={12} />
                GitHub
              </a>
            )}
          </div>
        </div>
      </GlassCard>
    </motion.div>
  );
}
