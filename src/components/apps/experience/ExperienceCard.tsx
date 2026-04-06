import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui";
import { useReducedMotion } from "@/hooks";
import { useTheme } from "@/context/ThemeProvider";
import { ANIMATION } from "@/constants";
import { getCompanyLogo } from "@/constants/company-logos";
import type { CompanyLogo } from "@/constants/company-logos";
import { formatDateRange } from "@/utils/format";
import type { Experience } from "@/types";

export interface ExperienceCardProps {
  experience: Experience;
  expanded: boolean;
  onToggle: () => void;
}

/** Resolve the fill colour for a single SVG path, respecting theme overrides. */
function resolvePathFill(
  path: CompanyLogo["paths"][number],
  logo: CompanyLogo,
  isDark: boolean,
): string {
  // If the path has an explicit brand fill (e.g. Deloitte's green dot), keep it.
  if (path.fill) return path.fill;
  // Otherwise apply the logo-level theme fill.
  return isDark ? (logo.darkFill ?? "currentColor") : (logo.lightFill ?? "currentColor");
}

/** Renders a small company logo SVG or a colored-circle initial fallback. */
function CompanyLogoIcon({ company }: { company: string }) {
  const logo = getCompanyLogo(company);
  const { theme } = useTheme();
  const isDark = theme === "dark";

  if (!logo) {
    const initial = company.charAt(0).toUpperCase();
    return (
      <span
        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[var(--accent)] text-[10px] font-bold text-white"
        aria-hidden="true"
      >
        {initial}
      </span>
    );
  }

  return (
    <svg
      viewBox={logo.viewBox}
      className="h-6 w-6 shrink-0"
      aria-hidden="true"
    >
      {logo.paths.map((p, i) => (
        <path key={i} d={p.d} fill={resolvePathFill(p, logo, isDark)} />
      ))}
    </svg>
  );
}

export function ExperienceCard({
  experience,
  expanded,
  onToggle,
}: ExperienceCardProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  const isCurrent = !experience.endDate;
  const position = t(`apps.experience.${experience.id}.position`);
  const highlights = t(`apps.experience.${experience.id}.highlights`, {
    returnObjects: true,
  }) as string[];

  return (
    <GlassCard className="p-4 cursor-pointer" hoverable>
      <button
        type="button"
        className="w-full text-start cursor-pointer"
        onClick={onToggle}
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <CompanyLogoIcon company={experience.company} />
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {experience.company}
              </h3>
              {isCurrent && (
                <Badge variant="accent" className="text-[10px] animate-pulse">
                  {t("common.present")}
                </Badge>
              )}
            </div>
            <p className="text-sm text-[var(--accent)] font-medium mt-0.5">
              {position}
            </p>
            <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
              {formatDateRange(experience.startDate, experience.endDate)} |{" "}
              {experience.location}
            </p>
          </div>
          <motion.div
            animate={{ rotate: expanded ? 180 : 0 }}
            transition={{ duration: reduced ? 0 : ANIMATION.duration.fast }}
            className="text-[var(--text-tertiary)] shrink-0 mt-1"
          >
            <ChevronDown size={16} />
          </motion.div>
        </div>
      </button>

      <AnimatePresence initial={false}>
        {expanded && Array.isArray(highlights) && highlights.length > 0 && (
          <motion.div
            initial={reduced ? false : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.normal,
              ease: ANIMATION.ease.easeOut,
            }}
            className="overflow-hidden"
          >
            <ul className="mt-3 space-y-1.5 ps-4">
              {highlights.map((highlight, idx) => (
                <li
                  key={idx}
                  className="text-xs text-[var(--text-secondary)] leading-relaxed list-disc"
                >
                  {highlight}
                </li>
              ))}
            </ul>
            {experience.tags && experience.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {experience.tags.map((tag, idx) => (
                  <motion.span
                    key={tag}
                    initial={reduced ? false : { opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: reduced ? 0 : ANIMATION.duration.fast,
                      delay: reduced ? 0 : idx * 0.03,
                    }}
                  >
                    <Badge>{tag}</Badge>
                  </motion.span>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
