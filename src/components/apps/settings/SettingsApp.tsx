import { useState } from "react";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import {
  Paintbrush,
  PanelBottom,
  AppWindow,
  Globe,
  Accessibility,
} from "lucide-react";
import { cn } from "@/utils/cn";
import { useReducedMotion, useIsMobile } from "@/hooks";
import { ANIMATION } from "@/constants";
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

const SECTION_COMPONENTS: Record<SettingsSection, React.ComponentType> = {
  appearance: AppearanceSection,
  dock: DockSection,
  windows: WindowsSection,
  language: LanguageSection,
  accessibility: AccessibilitySection,
};

export function SettingsApp() {
  const { t } = useTranslation();
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const [activeSection, setActiveSection] =
    useState<SettingsSection>("appearance");

  const ActiveComponent = SECTION_COMPONENTS[activeSection];

  return (
    <div className={cn("flex h-full", isMobile ? "flex-col" : "flex-row")}>
      {/* Navigation: horizontal tab bar on mobile, vertical sidebar on desktop */}
      <nav
        className={cn(
          isMobile
            ? "shrink-0 border-b border-[var(--border)] overflow-x-auto scrollbar-none px-2 py-1.5 flex items-center gap-1"
            : "w-48 shrink-0 border-e border-[var(--border)] overflow-y-auto py-2 px-2",
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
                "flex items-center gap-2 rounded-lg text-sm transition-colors cursor-pointer",
                isMobile
                  ? "shrink-0 px-2.5 py-1.5 gap-1.5 text-xs"
                  : "w-full px-2.5 py-1.5",
                isActive
                  ? "bg-[var(--accent)] bg-opacity-15 text-[var(--text-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-glass-hover)]",
              )}
            >
              <Icon size={isMobile ? 14 : 16} />
              {t(`apps.settings.sections.${section}`)}
            </button>
          );
        })}
      </nav>

      {/* Section content with transition */}
      <div className="flex-1 overflow-y-auto p-4 scroll-shadow">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSection}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduced ? undefined : { opacity: 0, y: -8 }}
            transition={{
              duration: reduced ? 0 : ANIMATION.duration.fast,
              ease: ANIMATION.ease.easeOut,
            }}
          >
            <ActiveComponent />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default SettingsApp;
