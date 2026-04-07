export type ProjectCategory = "personal" | "freelance" | "volunteer";

export interface Project {
  id: string;
  /** i18n key for the name */
  nameKey: string;
  /** i18n key for the description */
  descriptionKey: string;
  category: ProjectCategory;
  tags: string[];
  url?: string;
  githubUrl?: string;
  imageUrl?: string;
  /** Additional screenshots / gallery images */
  images?: string[];
  featured?: boolean;
}

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  "personal",
  "freelance",
  "volunteer",
];

export const PROJECTS: Project[] = [
  {
    id: "portfolio-v3",
    nameKey: "apps.projects.items.portfolioV3.name",
    descriptionKey: "apps.projects.items.portfolioV3.description",
    category: "personal",
    tags: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
    githubUrl: "https://github.com/jKh98/portfolio",
    url: "https://jalkhurfan.com",
    imageUrl: "/assets/images/projects/portfolio-dark-terminal.webp",
    images: [
      "/assets/images/projects/portfolio-dark-terminal.webp",
      "/assets/images/projects/portfolio-light-profile.webp",
      "/assets/images/projects/portfolio-dark-skills.webp",
      "/assets/images/projects/portfolio-light-settings.webp",
    ],
    featured: true,
  },
  {
    id: "denworld-travel",
    nameKey: "apps.projects.items.denworldTravel.name",
    descriptionKey: "apps.projects.items.denworldTravel.description",
    category: "freelance",
    tags: ["Next.js", "TypeScript", "Prisma", "Framer Motion"],
    url: "https://denworldtravel.com",
    imageUrl: "/assets/images/projects/denworld-home.webp",
    images: [
      "/assets/images/projects/denworld-home.webp",
      "/assets/images/projects/denworld-flights.webp",
      "/assets/images/projects/denworld-flight-details.webp",
      "/assets/images/projects/denworld-hotels.webp",
      "/assets/images/projects/denworld-hotel-details.webp",
    ],
    featured: true,
  },
  {
    id: "wa-automator",
    nameKey: "apps.projects.items.waAutomator.name",
    descriptionKey: "apps.projects.items.waAutomator.description",
    category: "personal",
    tags: ["Electron", "React", "Redux Toolkit", "Firebase"],
    githubUrl: "https://github.com/jKh98/wa-automator",
    featured: true,
  },
  {
    id: "lead-crm",
    nameKey: "apps.projects.items.leadCrm.name",
    descriptionKey: "apps.projects.items.leadCrm.description",
    category: "volunteer",
    tags: ["React", "TypeScript", "Firebase", "Ant Design"],
    featured: false,
  },
  {
    id: "ngo-website",
    nameKey: "apps.projects.items.ngoWebsite.name",
    descriptionKey: "apps.projects.items.ngoWebsite.description",
    category: "volunteer",
    tags: ["React", "TypeScript", "Firebase", "Tailwind CSS"],
    featured: false,
  },
  {
    id: "campaign-tracker",
    nameKey: "apps.projects.items.campaignTracker.name",
    descriptionKey: "apps.projects.items.campaignTracker.description",
    category: "volunteer",
    tags: ["React", "Firebase", "D3.js", "Maps"],
    featured: false,
  },
  {
    id: "dukkani",
    nameKey: "apps.projects.items.dukkani.name",
    descriptionKey: "apps.projects.items.dukkani.description",
    category: "personal",
    tags: ["React Native", "Expo", "TypeScript"],
    githubUrl: "https://github.com/jKh98/dukkani",
    featured: false,
  },
];

/** Get all unique tags from projects */
export function getProjectTags(): string[] {
  const tags = new Set<string>();
  for (const project of PROJECTS) {
    for (const tag of project.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}
