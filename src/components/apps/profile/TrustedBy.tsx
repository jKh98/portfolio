import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { useReducedMotion } from "@/hooks";
import { useTheme } from "@/context/ThemeProvider";
import { ANIMATION } from "@/constants";
import { GlassCard } from "@/components/ui";
import { getCompanyLogo } from "@/constants/company-logos";
import type { CompanyLogo } from "@/constants/company-logos";

export interface TrustedByProps {
  className?: string;
}

const COMPANIES = [
  "Deloitte",
  "Revinate",
  "Klareo",
  "DGA Saudi Arabia",
] as const;

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

/** Small inline SVG for a company logo. */
function CompanyLogoIcon({
  company,
  isDark,
}: {
  company: string;
  isDark: boolean;
}) {
  const logo = getCompanyLogo(company);
  if (!logo) return null;

  return (
    <svg
      viewBox={logo.viewBox}
      className="h-4 w-4 shrink-0"
      aria-hidden="true"
    >
      {logo.paths.map((p, i) => (
        <path key={i} d={p.d} fill={resolvePathFill(p, logo, isDark)} />
      ))}
    </svg>
  );
}

export function TrustedBy({ className }: TrustedByProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        duration: reduced ? 0 : ANIMATION.duration.normal,
      }}
      className={className}
    >
      <GlassCard className="py-4 px-5">
        <p className="text-xs text-[var(--text-tertiary)] font-medium mb-3">
          {t("apps.profile.trustedBy")}
        </p>
        <div className="flex items-center flex-wrap gap-2">
          {COMPANIES.map((company) => (
            <span
              key={company}
              className={cn(
                "inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg",
                "text-xs font-semibold",
                "text-[var(--text-secondary)]",
                "bg-[var(--bg-surface)] border border-[var(--border)]",
              )}
            >
              <CompanyLogoIcon company={company} isDark={isDark} />
              {company}
            </span>
          ))}
        </div>
      </GlassCard>
    </motion.div>
  );
}
