import { useState, useMemo, useRef, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Search, X } from "lucide-react";
import { SKILLS } from "@/data";
import { cn } from "@/utils/cn";
import { WindowToolbar } from "@/components/window";
import { SkillCategory } from "./SkillCategory";

/** Category keys for segmented control */
const CATEGORY_KEYS = ["all", ...SKILLS.map((c) => c.nameKey)] as const;

export function SkillsApp() {
  const { t } = useTranslation();
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) inputRef.current?.focus();
  }, [searchOpen]);

  const handleCloseSearch = () => {
    setSearch("");
    setSearchOpen(false);
  };

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
        {/* macOS-style segmented control — scrolls horizontally on narrow windows */}
        <div className="min-w-0 overflow-x-auto scrollbar-none">
          <div
            className={cn(
              "inline-flex items-center overflow-hidden",
              "rounded-md border border-[var(--border)]",
              "bg-[var(--bg-glass-inner)]",
            )}
          >
            {CATEGORY_KEYS.map((key, i) => (
              <button
                key={key}
                type="button"
                onClick={() => setActiveCategory(key)}
                className={cn(
                  "whitespace-nowrap px-2 py-0.5 text-[11px] font-medium",
                  "transition-colors duration-150 cursor-pointer",
                  "focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-[var(--accent)]",
                  i > 0 && "border-s border-[var(--border)]",
                  activeCategory === key
                    ? "bg-[var(--accent)] text-white"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)]",
                )}
              >
                {key === "all"
                  ? t("common.all")
                  : t(`apps.skills.categories.${key}`)}
              </button>
            ))}
          </div>
        </div>

        <div className="flex-1" />

        {/* Collapsible search — icon toggles to field */}
        {searchOpen ? (
          <div className="shrink-0 relative flex items-center">
            <Search
              size={13}
              className="absolute start-2 top-1/2 -translate-y-1/2 text-[var(--text-tertiary)] pointer-events-none"
            />
            <input
              ref={inputRef}
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={(e) => e.key === "Escape" && handleCloseSearch()}
              placeholder={t("apps.skills.searchPlaceholder")}
              aria-label={t("apps.skills.searchPlaceholder")}
              className={cn(
                "w-36 ps-7 pe-7 py-0.5 rounded-md text-[11px]",
                "bg-[var(--bg-glass-inner)] border border-[var(--border)]",
                "text-[var(--text-primary)] placeholder:text-[var(--text-tertiary)]",
                "focus:outline-none focus:border-[var(--accent)]",
                "transition-colors duration-150",
              )}
            />
            <button
              type="button"
              onClick={handleCloseSearch}
              aria-label={t("common.close")}
              className={cn(
                "absolute end-1.5 top-1/2 -translate-y-1/2",
                "text-[var(--text-tertiary)] hover:text-[var(--text-primary)]",
                "cursor-pointer",
              )}
            >
              <X size={12} />
            </button>
          </div>
        ) : (
          <button
            type="button"
            onClick={() => setSearchOpen(true)}
            aria-label={t("apps.skills.searchPlaceholder")}
            className={cn(
              "p-1 rounded-md",
              "text-[var(--text-secondary)]",
              "hover:bg-[var(--bg-glass-hover)] hover:text-[var(--text-primary)]",
              "transition-colors duration-150 cursor-pointer",
            )}
          >
            <Search size={14} />
          </button>
        )}
      </WindowToolbar>
      <div
        className={cn(
          "h-full overflow-y-auto p-4 pb-16 md:pb-4 space-y-6",
          "scrollbar-thin scroll-shadow",
        )}
      >
        {filtered.length > 0 ? (
          filtered.map((category, i) => (
            <SkillCategory key={category.nameKey} category={category} index={i} />
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
