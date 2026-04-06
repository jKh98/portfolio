import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { EDUCATION } from "@/data";
import { formatDate } from "@/utils/format";
import { cn } from "@/utils/cn";
import { useReducedMotion, useIsMobile } from "@/hooks";
import { useTheme } from "@/context/ThemeProvider";
import { ANIMATION } from "@/constants";
import { GlassCard } from "@/components/ui";
import { getCompanyLogo } from "@/constants/company-logos";
import type { CompanyLogo } from "@/constants/company-logos";
import { LucideSchool } from "lucide-react";

/** Resolve fill for a single path, respecting explicit fills and theme overrides. */
function resolvePathFill(
  path: CompanyLogo["paths"][number],
  logo: CompanyLogo,
  isDark: boolean,
): string {
  if (path.fill) return path.fill;
  return isDark
    ? (logo.darkFill ?? "currentColor")
    : (logo.lightFill ?? "currentColor");
}

/** Renders the institution logo or falls back to the generic school icon. */
function InstitutionIcon({
  institution,
  isDark,
}: {
  institution: string;
  isDark: boolean;
}) {
  const logo = getCompanyLogo(institution);

  if (!logo) {
    return <LucideSchool size={18} />;
  }

  return (
    <svg
      viewBox={logo.viewBox}
      className="h-5 w-5"
      aria-hidden="true"
    >
      {logo.paths.map((p, i) => (
        <path key={i} d={p.d} fill={resolvePathFill(p, logo, isDark)} />
      ))}
    </svg>
  );
}

export interface EducationListProps {
  className?: string;
}

export function EducationList({ className }: EducationListProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div className={cn("space-y-3", className)}>
      <h3
        className={cn(
          "text-sm font-semibold uppercase tracking-wide",
          "text-[var(--text-primary)]",
        )}
      >
        {t("apps.profile.education")}
      </h3>

      <div className="space-y-2.5">
        {EDUCATION.map((edu, i) => (
          <motion.div
            key={edu.institution}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.normal,
              delay: reduced ? 0 : i * 0.08,
            }}
          >
            <GlassCard hoverable>
              <a
                href={edu.institutionUrl}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  "group flex items-center gap-4 p-4",
                  isMobile && "flex-wrap",
                )}
              >
                <div
                  className={cn(
                    "shrink-0 flex items-center justify-center",
                    "w-10 h-10 rounded-xl",
                    "bg-[var(--accent-glow)]",
                    "text-[var(--accent)]",
                  )}
                >
                  <InstitutionIcon institution={edu.institution} isDark={isDark} />
                </div>

                <div className="min-w-0 flex-1">
                  <p
                    className={cn(
                      "text-sm font-semibold text-[var(--text-primary)] truncate",
                      "group-hover:text-[var(--accent)] transition-colors",
                    )}
                  >
                    {edu.institution}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1 truncate">
                    {edu.degree} &mdash; {edu.field}
                  </p>
                </div>

                <span
                  className={cn(
                    "text-xs font-medium text-[var(--text-tertiary)] tabular-nums",
                    isMobile
                      ? "w-full ps-14 -mt-1"
                      : "shrink-0 whitespace-nowrap",
                  )}
                >
                  {formatDate(edu.startDate)} &ndash; {formatDate(edu.endDate)}
                </span>
              </a>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
