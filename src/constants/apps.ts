import { lazy } from "react";
import type { AppDefinition } from "@/types";

/**
 * Primary apps (left side of dock divider).
 * Order: Profile, Experience, Skills, Projects, Contact
 */
const PRIMARY_APPS: AppDefinition[] = [
  {
    id: "profile",
    titleKey: "apps.profile.title",
    icon: "User",
    component: lazy(() => import("@/components/apps/profile/ProfileApp")),
    minWidth: 600,
  },
  {
    id: "experience",
    titleKey: "apps.experience.title",
    icon: "Briefcase",
    component: lazy(() => import("@/components/apps/experience/ExperienceApp")),
    menuConfig: [
      {
        titleKey: "topbar.menu.view",
        items: [
          {
            labelKey: "topbar.menu.expandAll",
            action: "expand-all",
          },
          {
            labelKey: "topbar.menu.collapseAll",
            action: "collapse-all",
          },
        ],
      },
    ],
  },
  {
    id: "skills",
    titleKey: "apps.skills.title",
    icon: "Code",
    component: lazy(() => import("@/components/apps/skills/SkillsApp")),
  },
  {
    id: "projects",
    titleKey: "apps.projects.title",
    icon: "FolderGit2",
    component: lazy(
      () => import("@/components/apps/projects/ProjectsApp"),
    ),
  },
  {
    id: "contact",
    titleKey: "apps.contact.title",
    icon: "Mail",
    component: lazy(() => import("@/components/apps/contact/ContactApp")),
  },
];

/**
 * Utility apps (right side of dock divider).
 * Order: Terminal, Finder, Notepad, Settings
 */
const UTILITY_APPS: AppDefinition[] = [
  {
    id: "terminal",
    titleKey: "apps.terminal.title",
    icon: "Terminal",
    component: lazy(
      () => import("@/components/apps/terminal/TerminalApp"),
    ),
  },
  {
    id: "finder",
    titleKey: "apps.finder.title",
    icon: "Folder",
    component: lazy(
      () => import("@/components/apps/finder/FinderApp"),
    ),
  },
  {
    id: "notepad",
    titleKey: "apps.notepad.title",
    icon: "StickyNote",
    component: lazy(
      () => import("@/components/apps/notepad/NotepadApp"),
    ),
  },
  {
    id: "settings",
    titleKey: "apps.settings.title",
    icon: "Settings",
    component: lazy(
      () => import("@/components/apps/settings/SettingsApp"),
    ),
  },
];

/** Index where utility apps begin (used by Dock for divider placement) */
export const DOCK_DIVIDER_INDEX = PRIMARY_APPS.length;

/** All app definitions in dock order */
export const APP_DEFINITIONS: AppDefinition[] = [
  ...PRIMARY_APPS,
  ...UTILITY_APPS,
];
