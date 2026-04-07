import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useReducedMotion, useIsMobile } from "@/hooks";
import { ANIMATION } from "@/constants";
import { cn } from "@/utils/cn";
import { GlassCard } from "@/components/ui";
import { Briefcase, FolderKanban, Cpu } from "lucide-react";
import { YEARS_OF_EXPERIENCE } from "@/data";

export interface StatsRowProps {
  className?: string;
}

const STATS = [
  {
    value: YEARS_OF_EXPERIENCE,
    suffix: "+",
    labelKey: "apps.profile.stats.experience",
    icon: Briefcase,
  },
  {
    value: 30,
    suffix: "+",
    labelKey: "apps.profile.stats.projects",
    icon: FolderKanban,
  },
  {
    value: 20,
    suffix: "+",
    labelKey: "apps.profile.stats.technologies",
    icon: Cpu,
  },
] as const;

function CountUp({ target, suffix }: { target: number; suffix: string }) {
  const reduced = useReducedMotion();
  const [count, setCount] = useState(reduced ? target : 0);

  useEffect(() => {
    if (reduced) return;
    let frame: number;
    const duration = 1200;
    const start = performance.now();

    const animate = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress < 1) {
        frame = requestAnimationFrame(animate);
      }
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, [target, reduced]);

  return (
    <>
      {count}
      {suffix}
    </>
  );
}

export function StatsRow({ className }: StatsRowProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();

  return (
    <div className={cn("grid grid-cols-3 gap-3", isMobile && "gap-2", className)}>
      {STATS.map((stat, i) => {
        const Icon = stat.icon;
        return (
          <motion.div
            key={stat.labelKey}
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.normal,
              delay: reduced ? 0 : i * 0.08,
            }}
          >
            <GlassCard
              className={cn(isMobile ? "py-3 px-2" : "py-4 px-3")}
              innerClassName="flex flex-col items-center justify-center gap-2"
            >
              <div
                className={cn(
                  "flex items-center justify-center rounded-xl",
                  "bg-[var(--accent-glow)]",
                  "text-[var(--accent)]",
                  isMobile ? "w-8 h-8" : "w-10 h-10",
                )}
              >
                <Icon size={isMobile ? 15 : 18} />
              </div>
              <div className="text-center">
                <p className={cn(
                  "font-bold text-[var(--text-primary)] tabular-nums leading-none",
                  isMobile ? "text-xl" : "text-2xl",
                )}>
                  <CountUp target={stat.value} suffix={stat.suffix} />
                </p>
                <p className={cn(
                  "text-[var(--text-tertiary)] font-medium uppercase tracking-wider mt-1.5 leading-none",
                  isMobile ? "text-[9px]" : "text-[11px]",
                )}>
                  {t(stat.labelKey)}
                </p>
              </div>
            </GlassCard>
          </motion.div>
        );
      })}
    </div>
  );
}
