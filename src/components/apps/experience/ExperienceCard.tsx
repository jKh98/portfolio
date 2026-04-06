import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { GlassCard, Badge } from "@/components/ui";
import { useReducedMotion } from "@/hooks";
import { ANIMATION } from "@/constants";
import { formatDateRange } from "@/utils/format";
import type { Experience } from "@/types";

export interface ExperienceCardProps {
  experience: Experience;
  isFirst?: boolean;
}

export function ExperienceCard({
  experience,
  isFirst = false,
}: ExperienceCardProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const [expanded, setExpanded] = useState(isFirst);

  const isCurrent = !experience.endDate;
  const position = t(`apps.experience.${experience.id}.position`);
  const highlights = t(`apps.experience.${experience.id}.highlights`, {
    returnObjects: true,
  }) as string[];

  return (
    <GlassCard className="p-4">
      <button
        type="button"
        className="w-full text-start"
        onClick={() => setExpanded((prev) => !prev)}
        aria-expanded={expanded}
      >
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-sm font-semibold text-[var(--text-primary)]">
                {experience.company}
              </h3>
              {isCurrent && (
                <Badge variant="accent" className="text-[10px]">
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
                {experience.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
