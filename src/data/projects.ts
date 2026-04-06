export interface Project {
  id: string;
  /** i18n key for the name */
  nameKey: string;
  /** i18n key for the description */
  descriptionKey: string;
  tags: string[];
  url?: string;
  githubUrl?: string;
  imageUrl?: string;
  featured?: boolean;
}

export const PROJECTS: Project[] = [
  {
    id: "portfolio-v3",
    nameKey: "apps.projects.items.portfolioV3.name",
    descriptionKey: "apps.projects.items.portfolioV3.description",
    tags: ["React", "TypeScript", "Three.js", "Tailwind CSS"],
    githubUrl: "https://github.com/jalkhurfan/portfolio",
    url: "https://jalkhurfan.com",
    featured: true,
  },
  {
    id: "dga-platform",
    nameKey: "apps.projects.items.dgaPlatform.name",
    descriptionKey: "apps.projects.items.dgaPlatform.description",
    tags: ["React", "TypeScript", "Redux Toolkit", "Node.js"],
    featured: true,
  },
  {
    id: "fintech-app",
    nameKey: "apps.projects.items.fintechApp.name",
    descriptionKey: "apps.projects.items.fintechApp.description",
    tags: ["React Native", "TypeScript", "Node.js", "PostgreSQL"],
    featured: false,
  },
  {
    id: "testing-platform",
    nameKey: "apps.projects.items.testingPlatform.name",
    descriptionKey: "apps.projects.items.testingPlatform.description",
    tags: ["WebDriverIO", "Cucumber", "TypeScript", "Docker"],
    featured: false,
  },
  {
    id: "investment-calculator",
    nameKey: "apps.projects.items.investmentCalc.name",
    descriptionKey: "apps.projects.items.investmentCalc.description",
    tags: ["React", "TypeScript", "D3.js", "Azure"],
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
