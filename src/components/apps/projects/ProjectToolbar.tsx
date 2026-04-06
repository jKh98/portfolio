import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";

export interface ProjectToolbarProps {
  tags: string[];
  activeTag: string | null;
  onTagSelect: (tag: string | null) => void;
}

export function ProjectToolbar({
  tags,
  activeTag,
  onTagSelect,
}: ProjectToolbarProps) {
  const { t } = useTranslation();

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-4 py-2 overflow-x-auto",
        "border-b border-[var(--border)]",
      )}
    >
      <button
        onClick={() => onTagSelect(null)}
        className={cn(
          "shrink-0 px-2.5 py-1 rounded-full text-xs transition-colors",
          !activeTag
            ? "bg-[var(--accent)] text-white"
            : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
        )}
      >
        {t("common.all")}
      </button>
      {tags.map((tag) => (
        <button
          key={tag}
          onClick={() => onTagSelect(tag === activeTag ? null : tag)}
          className={cn(
            "shrink-0 px-2.5 py-1 rounded-full text-xs transition-colors",
            tag === activeTag
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]",
          )}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}
