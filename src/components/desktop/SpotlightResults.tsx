import { cn } from "@/utils/cn";
import type { SpotlightCategory } from "@/data";
import { AppWindow, Zap, Building2, Code } from "lucide-react";

const CATEGORY_ICONS: Record<SpotlightCategory, React.ReactNode> = {
  apps: <AppWindow size={14} />,
  skills: <Code size={14} />,
  actions: <Zap size={14} />,
  companies: <Building2 size={14} />,
};

export interface SpotlightResultItem {
  id: string;
  label: string;
  category: SpotlightCategory;
}

export interface SpotlightResultsProps {
  items: SpotlightResultItem[];
  selectedIdx: number;
  noResultsText: string;
  categoryLabel: (category: SpotlightCategory) => string;
  onSelect: (idx: number) => void;
  onHover: (idx: number) => void;
}

export function SpotlightResults({
  items,
  selectedIdx,
  noResultsText,
  categoryLabel,
  onSelect,
  onHover,
}: SpotlightResultsProps) {
  if (items.length === 0) {
    return (
      <div className="px-4 py-6 text-center text-xs text-[var(--text-tertiary)]">
        {noResultsText}
      </div>
    );
  }

  return (
    <>
      {items.map((item, idx) => (
        <button
          key={item.id}
          type="button"
          role="option"
          aria-selected={idx === selectedIdx}
          onClick={() => onSelect(idx)}
          onMouseEnter={() => onHover(idx)}
          className={cn(
            "flex items-center gap-3 w-full px-4 py-2",
            "text-start text-sm transition-colors duration-75 cursor-pointer",
            idx === selectedIdx
              ? "bg-[var(--accent)] text-white"
              : "text-[var(--text-primary)] hover:bg-[var(--bg-glass-hover)]",
          )}
        >
          <span
            className={cn(
              "w-5 h-5 flex items-center justify-center shrink-0",
              idx === selectedIdx ? "text-white/80" : "text-[var(--text-secondary)]",
            )}
          >
            {CATEGORY_ICONS[item.category]}
          </span>
          <span className="flex-1 truncate">{item.label}</span>
          <span
            className={cn(
              "text-[10px]",
              idx === selectedIdx ? "text-white/60" : "text-[var(--text-tertiary)]",
            )}
          >
            {categoryLabel(item.category)}
          </span>
        </button>
      ))}
    </>
  );
}
