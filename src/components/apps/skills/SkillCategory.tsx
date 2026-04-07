import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { useReducedMotion, useMagneticGroup } from "@/hooks";
import { ANIMATION } from "@/constants";
import { SkillBadge } from "./SkillBadge";
import type { SkillCategory as SkillCategoryType } from "@/types";

export interface SkillCategoryProps {
  category: SkillCategoryType;
  index?: number;
  className?: string;
}

export function SkillCategory({
  category,
  index = 0,
  className,
}: SkillCategoryProps) {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const { containerRef, mouse, handlers } = useMagneticGroup();

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : ANIMATION.duration.normal,
        delay: reduced ? 0 : index * 0.1,
      }}
      className={cn("space-y-3", className)}
    >
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
        {t(`apps.skills.categories.${category.nameKey}`)}
      </h3>
      <div
        ref={containerRef}
        {...handlers}
        className="relative flex flex-wrap gap-2"
      >
        {category.skills.map((skill, idx) => (
          <SkillBadge
            key={skill}
            name={skill}
            index={idx}
            mouse={mouse}
          />
        ))}
      </div>
    </motion.div>
  );
}
