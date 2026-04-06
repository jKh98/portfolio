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
];
