import { useTranslation } from "react-i18next";
import { GlassCard } from "@/components/ui";
import { cn } from "@/utils/cn";

export interface StatsRowProps {
  className?: string;
}

const STATS = [
  { value: "6+", labelKey: "apps.profile.stats.experience" },
  { value: "30+", labelKey: "apps.profile.stats.projects" },
  { value: "20+", labelKey: "apps.profile.stats.technologies" },
] as const;

export function StatsRow({ className }: StatsRowProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {STATS.map((stat) => (
        <GlassCard key={stat.labelKey} className="p-3 text-center">
          <p className="text-xl font-bold text-[var(--accent)]">{stat.value}</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            {t(stat.labelKey)}
          </p>
        </GlassCard>
      ))}
    </div>
  );
}
