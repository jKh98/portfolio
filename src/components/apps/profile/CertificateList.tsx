import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { CERTIFICATES } from "@/data";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";
import { GlassCard } from "@/components/ui";
import { ShieldCheck, ExternalLink } from "lucide-react";

export interface CertificateListProps {
  className?: string;
}

export function CertificateList({ className }: CertificateListProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();

  return (
    <div className={cn("space-y-3", className)}>
      <h3
        className={cn(
          "text-sm font-semibold uppercase tracking-wide",
          "text-[var(--text-primary)]",
        )}
      >
        {t("apps.profile.certificates")}
      </h3>

      <div className="space-y-2.5">
        {CERTIFICATES.map((cert, i) => (
          <motion.div
            key={cert.name}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.normal,
              delay: reduced ? 0 : i * 0.08,
            }}
          >
            <GlassCard hoverable>
              <a
                href={cert.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-4 p-4"
              >
                <div
                  className={cn(
                    "shrink-0 flex items-center justify-center",
                    "w-10 h-10 rounded-xl",
                    "bg-[var(--accent-glow)]",
                    "text-[var(--accent)]",
                  )}
                >
                  <ShieldCheck size={18} />
                </div>

                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-[var(--text-primary)] truncate">
                    {cert.name}
                  </p>
                  <p className="text-xs text-[var(--text-tertiary)] mt-1">
                    {cert.issuer} &middot; {cert.date}
                  </p>
                </div>

                <ExternalLink
                  size={14}
                  className={cn(
                    "shrink-0 text-[var(--text-tertiary)]",
                    "group-hover:text-[var(--accent)] transition-colors duration-200",
                  )}
                />
              </a>
            </GlassCard>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
