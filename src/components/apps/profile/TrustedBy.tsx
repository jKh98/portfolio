import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui";
import { cn } from "@/utils/cn";

export interface TrustedByProps {
  className?: string;
}

const COMPANIES = ["Deloitte", "Revinate", "Klareo", "DGA Saudi Arabia"];

export function TrustedBy({ className }: TrustedByProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)] uppercase tracking-wider">
        {t("apps.profile.trustedBy")}
      </h3>
      <div className="flex flex-wrap gap-2">
        {COMPANIES.map((company) => (
          <GlassCard key={company} className="px-3 py-1.5">
            <span className="text-xs font-medium text-[var(--text-secondary)]">
              {company}
            </span>
          </GlassCard>
        ))}
      </div>
    </div>
  );
}
