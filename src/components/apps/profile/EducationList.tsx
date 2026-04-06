import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui";
import { EDUCATION } from "@/data";
import { formatDate } from "@/utils/format";
import { cn } from "@/utils/cn";
import { GraduationCap } from "lucide-react";

export interface EducationListProps {
  className?: string;
}

export function EducationList({ className }: EducationListProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
        {t("apps.profile.education")}
      </h3>
      <div className="space-y-2">
        {EDUCATION.map((edu) => (
          <GlassCard key={edu.institution} className="p-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[var(--accent)]">
                <GraduationCap size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <a
                  href={edu.institutionUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-medium text-[var(--text-primary)] hover:text-[var(--accent)] transition-colors"
                >
                  {edu.institution}
                </a>
                <p className="text-xs text-[var(--text-secondary)]">
                  {edu.degree} - {edu.field}
                </p>
                <p className="text-xs text-[var(--text-tertiary)] mt-0.5">
                  {formatDate(edu.startDate)} - {formatDate(edu.endDate)}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
