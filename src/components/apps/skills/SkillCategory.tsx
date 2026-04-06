import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { SkillBadge } from "./SkillBadge";
import type { SkillCategory as SkillCategoryType } from "@/types";

export interface SkillCategoryProps {
  category: SkillCategoryType;
  className?: string;
}

export function SkillCategory({ category, className }: SkillCategoryProps) {
  const { t } = useTranslation();

  return (
    <div className={cn("space-y-3", className)}>
      <h3 className="text-sm font-semibold text-[var(--text-primary)]">
        {t(`apps.skills.categories.${category.nameKey}`)}
      </h3>
      <div className="flex flex-wrap gap-2">
        {category.skills.map((skill) => (
          <SkillBadge key={skill} name={skill} />
        ))}
      </div>
    </div>
  );
}
