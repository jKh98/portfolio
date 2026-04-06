import { lazy } from "react";
import type { AppDefinition } from "@/types";

export const APP_DEFINITIONS: AppDefinition[] = [
  {
    id: "profile",
    titleKey: "apps.profile.title",
    icon: "User",
    component: lazy(() => import("@/components/apps/profile/ProfileApp")),
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
    id: "contact",
    titleKey: "apps.contact.title",
    icon: "Mail",
    component: lazy(() => import("@/components/apps/contact/ContactApp")),
  },
  {
    id: "terminal",
    titleKey: "apps.terminal.title",
    icon: "Terminal",
    component: lazy(
      () => import("@/components/apps/terminal/TerminalApp"),
    ),
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
    id: "settings",
    titleKey: "apps.settings.title",
    icon: "Settings",
    component: lazy(
      () => import("@/components/apps/settings/SettingsApp"),
    ),
  },
];
