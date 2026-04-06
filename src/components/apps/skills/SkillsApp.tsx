import { useState, useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Search } from "lucide-react";
import { SKILLS } from "@/data";
import { cn } from "@/utils/cn";
import { WindowToolbar } from "@/components/window";
import { SkillCategory } from "./SkillCategory";

/** Category keys for filter pills */
const CATEGORY_KEYS = ["all", ...SKILLS.map((c) => c.nameKey)] as const;

export function SkillsApp() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");

  const filtered = useMemo(() => {
    const query = search.toLowerCase().trim();
    let categories =
      activeCategory === "all"
        ? SKILLS
        : SKILLS.filter((c) => c.nameKey === activeCategory);

    if (query) {
      categories = categories
        .map((c) => ({
          ...c,
          skills: c.skills.filter((s) => s.toLowerCase().includes(query)),
        }))
        .filter((c) => c.skills.length > 0);
    }
    return categories;
  }, [activeCategory, search]);

  const totalCount = filtered.reduce((sum, c) => sum + c.skills.length, 0);

  return (
    <>
      <WindowToolbar>
        <div className="flex items-center gap-1.5 flex-1 min-w-0">
          {CATEGORY_KEYS.map((key) => (
            <button
              key={key}
              type="button"
              onClick={() => setActiveCategory(key)}
              className={cn(
                "shrink-0 px-2.5 py-1 rounded-md text-xs font-medium",
                "transition-all duration-200 cursor-pointer",
                "focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-[var(--accent)]",
                activeCategory === key
                  ? "bg-[var(--accent)] text-white"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)]",
              )}
            >
              {key === "all"
                ? t("common.all")
                : t(`apps.skills.categories.${key}`)}
            </button>
          ))}
        </div>
        <div className="relative shrink-0">
          <Search
            size={14}
            className="absolute start-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
          />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={t("apps.skills.searchPlaceholder")}
            aria-label={t("apps.skills.searchPlaceholder")}
            className={cn(
              "w-32 ps-7 pe-2 py-1 rounded-md text-xs",
              "bg-[var(--bg-glass)] border border-[var(--border)]",
              "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
              "focus:outline-none focus:border-[var(--accent)]",
              "transition-colors duration-200",
            )}
          />
        </div>
      </WindowToolbar>
      <div
        className={cn(
          "h-full overflow-y-auto p-4 space-y-6",
          "scrollbar-thin scroll-shadow",
        )}
      >
        {filtered.length > 0 ? (
          filtered.map((category) => (
            <SkillCategory key={category.nameKey} category={category} />
          ))
        ) : (
          <p className="text-sm text-[var(--text-tertiary)] text-center py-8">
            {t("apps.skills.noResults")}
          </p>
        )}
        <p className="text-xs text-[var(--text-tertiary)] text-center pb-2">
          {t("apps.skills.skillCount", { count: totalCount })}
        </p>
      </div>
    </>
  );
}

export default SkillsApp;
