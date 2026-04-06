import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Paintbrush,
  PanelBottom,
  AppWindow,
  Globe,
  Accessibility,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { AppearanceSection } from "./AppearanceSection";
import { DockSection } from "./DockSection";
import { WindowsSection } from "./WindowsSection";
import { LanguageSection } from "./LanguageSection";
import { AccessibilitySection } from "./AccessibilitySection";

const SECTIONS = [
  "appearance",
  "dock",
  "windows",
  "language",
  "accessibility",
] as const;

type SettingsSection = (typeof SECTIONS)[number];

const SECTION_ICONS: Record<
  SettingsSection,
  React.ComponentType<{ size?: number }>
> = {
  appearance: Paintbrush,
  dock: PanelBottom,
  windows: AppWindow,
  language: Globe,
  accessibility: Accessibility,
};

export function SettingsApp() {
  const { t } = useTranslation();
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("appearance");

  return (
    <div className="flex h-full">
      {/* Sidebar navigation */}
      <nav
        className={cn(
          "w-48 shrink-0 border-e border-[var(--border)]",
          "overflow-y-auto py-2 px-2",
        )}
      >
        {SECTIONS.map((section) => {
          const Icon = SECTION_ICONS[section];
          const isActive = activeSection === section;
          return (
            <button
              key={section}
              onClick={() => setActiveSection(section)}
              className={cn(
                "w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-sm transition-colors",
                isActive
                  ? "bg-[var(--accent)] bg-opacity-15 text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)]",
              )}
            >
              <Icon size={16} />
              {t(`apps.settings.sections.${section}`)}
            </button>
          );
        })}
      </nav>

      {/* Section content */}
      <div className="flex-1 overflow-y-auto p-4 scroll-shadow">
        {activeSection === "appearance" && <AppearanceSection />}
        {activeSection === "dock" && <DockSection />}
        {activeSection === "windows" && <WindowsSection />}
        {activeSection === "language" && <LanguageSection />}
        {activeSection === "accessibility" && <AccessibilitySection />}
      </div>
    </div>
  );
}

export default SettingsApp;
