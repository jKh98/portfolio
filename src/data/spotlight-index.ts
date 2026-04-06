import { APP_DEFINITIONS } from "@/constants";
import { EXPERIENCE } from "@/data";
import { SKILLS } from "@/data";
import type { AppId } from "@/types";

export type SpotlightCategory = "apps" | "skills" | "actions" | "companies";

export interface SpotlightItem {
  id: string;
  label: string;
  /** i18n key for the label (used instead of label when available) */
  labelKey?: string;
  category: SpotlightCategory;
  icon?: string;
  /** Action to perform when selected */
  action:
    | { type: "open-app"; appId: AppId }
    | { type: "external"; url: string }
    | { type: "action"; id: string };
}

/**
 * Build the flat searchable index for Spotlight.
 * Computed once and filtered on input change.
 */
export function buildSpotlightIndex(): SpotlightItem[] {
  const items: SpotlightItem[] = [];

  // Apps
  for (const app of APP_DEFINITIONS) {
    items.push({
      id: `app-${app.id}`,
      label: "",
      labelKey: app.titleKey,
      category: "apps",
      icon: app.icon,
      action: { type: "open-app", appId: app.id },
    });
  }

  // Skills (flatten all categories, deduplicate by name)
  const seenSkills = new Set<string>();
  for (const category of SKILLS) {
    for (const skill of category.skills) {
      if (seenSkills.has(skill)) continue;
      seenSkills.add(skill);
      items.push({
        id: `skill-${skill}`,
        label: skill,
        category: "skills",
        action: { type: "open-app", appId: "skills" },
      });
    }
  }

  // Actions
  items.push({
    id: "action-toggle-theme",
    label: "",
    labelKey: "actions.toggleTheme",
    category: "actions",
    action: { type: "action", id: "toggle-theme" },
  });
  items.push({
    id: "action-switch-language",
    label: "",
    labelKey: "actions.switchLanguage",
    category: "actions",
    action: { type: "action", id: "switch-language" },
  });
  items.push({
    id: "action-download-resume",
    label: "",
    labelKey: "actions.downloadResume",
    category: "actions",
    action: {
      type: "external",
      url: "/assets/documents/Jihad_Al-Khurfan_Resume.pdf",
    },
  });

  // Companies (unique)
  const companies = [...new Set(EXPERIENCE.map((exp) => exp.company))];
  for (const company of companies) {
    items.push({
      id: `company-${company}`,
      label: company,
      category: "companies",
      action: { type: "open-app", appId: "experience" },
    });
  }

  return items;
}
