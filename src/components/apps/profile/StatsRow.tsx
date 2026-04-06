import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";
import { cn } from "@/utils/cn";

export interface StatsRowProps {
  className?: string;
}

const STATS = [
  { value: 6, suffix: "+", labelKey: "apps.profile.stats.experience" },
  { value: 30, suffix: "+", labelKey: "apps.profile.stats.projects" },
  { value: 20, suffix: "+", labelKey: "apps.profile.stats.technologies" },
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
      // Ease out cubic
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

  return (
    <div className={cn("grid grid-cols-3 gap-3", className)}>
      {STATS.map((stat, i) => (
        <motion.div
          key={stat.labelKey}
          initial={reduced ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: reduced ? 0 : ANIMATION.duration.normal,
            delay: reduced ? 0 : 0.1 + i * 0.1,
          }}
        >
          <GlassCard className="p-3 text-center">
            <p className="text-xl font-bold text-[var(--accent)]">
              <CountUp target={stat.value} suffix={stat.suffix} />
            </p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">
              {t(stat.labelKey)}
            </p>
          </GlassCard>
        </motion.div>
      ))}
    </div>
  );
}
