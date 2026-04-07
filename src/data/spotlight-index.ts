import { APP_DEFINITIONS } from "@/constants";
import { EXPERIENCE, SKILLS, PROJECTS, CERTIFICATES, EDUCATION } from "@/data";
import { FILE_TREE } from "@/data";
import type { FileNode } from "@/data";
import type { AppId } from "@/types";

export type SpotlightCategory =
  | "apps"
  | "skills"
  | "actions"
  | "companies"
  | "projects"
  | "certificates"
  | "education"
  | "files";

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
 * Recursively collect all non-folder file nodes from the virtual filesystem.
 */
function collectFiles(node: FileNode, path: string = "~"): { name: string; node: FileNode }[] {
  const files: { name: string; node: FileNode }[] = [];
  if (node.kind !== "folder" && node.action) {
    files.push({ name: node.name, node });
  }
  if (node.children) {
    for (const child of node.children) {
      files.push(...collectFiles(child, `${path}/${child.name}`));
    }
  }
  return files;
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

  // Projects
  for (const project of PROJECTS) {
    items.push({
      id: `project-${project.id}`,
      label: "",
      labelKey: project.nameKey,
      category: "projects",
      action: { type: "open-app", appId: "projects" },
    });
  }

  // Certificates
  for (const cert of CERTIFICATES) {
    items.push({
      id: `cert-${cert.name}`,
      label: cert.name,
      category: "certificates",
      action: { type: "external", url: cert.url },
    });
  }

  // Education
  for (const edu of EDUCATION) {
    items.push({
      id: `edu-${edu.institution}`,
      label: `${edu.degree} ${edu.field} — ${edu.institution}`,
      category: "education",
      action: { type: "open-app", appId: "profile" },
    });
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

  // Filesystem files (Finder)
  const files = collectFiles(FILE_TREE);
  for (const { name, node } of files) {
    const action = node.action!;
    let spotlightAction: SpotlightItem["action"];
    if (action.type === "openApp") {
      spotlightAction = { type: "open-app", appId: action.appId };
    } else if (action.type === "openUrl") {
      spotlightAction = { type: "external", url: action.url };
    } else {
      // download
      spotlightAction = { type: "external", url: action.url };
    }
    items.push({
      id: `file-${name}`,
      label: name,
      category: "files",
      action: spotlightAction,
    });
  }

  return items;
}
