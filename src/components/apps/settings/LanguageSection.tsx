import { useTranslation } from "react-i18next";
import { cn } from "@/utils/cn";
import { trackEvent, setUserProps } from "@/lib/analytics";

export function LanguageSection() {
  const { t, i18n } = useTranslation();
  const currentLang = i18n.language;

  const switchTo = (lang: string) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
    trackEvent("language_switch", { language: lang });
    setUserProps({ language: lang });
  };

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-[var(--text-primary)]">
        {t("apps.settings.sections.language")}
      </h2>

      <div className="flex gap-2">
        {(["en", "ar"] as const).map((lang) => (
          <button
            key={lang}
            onClick={() => switchTo(lang)}
            className={cn(
              "flex-1 rounded-lg px-4 py-3 text-sm border transition-colors",
              currentLang === lang
                ? "border-[var(--accent)] bg-[var(--accent-glow)] text-[var(--text-primary)]"
                : "border-[var(--border)] text-[var(--text-secondary)] hover:border-[var(--accent)]",
            )}
          >
            <div className="text-base font-medium">
              {lang === "en" ? "English" : "العربية"}
            </div>
            <div className="text-xs mt-1 text-[var(--text-tertiary)]">
              {lang === "en" ? "LTR" : "RTL"}
            </div>
          </button>
        ))}
      </div>

      <p className="text-xs text-[var(--text-tertiary)]">
        {t("apps.settings.language.directionNote")}
      </p>
    </div>
  );
}
