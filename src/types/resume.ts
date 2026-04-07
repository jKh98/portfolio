export interface Experience {
  id: string;
  company: string;
  companyUrl: string;
  position: string;
  location: string;
  startDate: string;
  endDate?: string;
  highlights: string[];
  /** Tags for key technologies used in this role */
  tags?: string[];
}

export interface Education {
  institution: string;
  institutionUrl: string;
  degree: string;
  field: string;
  startDate: string;
  endDate: string;
}

export interface Certificate {
  name: string;
  issuer: string;
  date: string;
  url: string;
}

export interface SkillCategory {
  /** i18n key for category name */
  nameKey: string;
  skills: string[];
}

export interface SocialLink {
  platform: string;
  url: string;
  /** Lucide icon name */
  icon: string;
  /** Value to display (username, email, etc.) */
  displayValue: string;
  /** Whether this is copyable (e.g., email) */
  copyable?: boolean;
}
