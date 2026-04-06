import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui";
import { CERTIFICATES } from "@/data";
import { cn } from "@/utils/cn";
import { Award, ExternalLink } from "lucide-react";

export interface CertificateListProps {
  className?: string;
}

export function CertificateList({ className }: CertificateListProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
        {t("apps.profile.certificates")}
      </h3>
      <div className="space-y-2">
        {CERTIFICATES.map((cert) => (
          <GlassCard key={cert.name} className="p-3">
            <div className="flex items-start gap-3">
              <div className="mt-0.5 text-[var(--accent)]">
                <Award size={16} />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-[var(--text-primary)]">
                    {cert.name}
                  </span>
                  <a
                    href={cert.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={t("common.openLink")}
                    className="text-[var(--text-tertiary)] hover:text-[var(--accent)] transition-colors shrink-0"
                  >
                    <ExternalLink size={12} />
                  </a>
                </div>
                <p className="text-xs text-[var(--text-secondary)]">
                  {cert.issuer} - {cert.date}
                </p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
