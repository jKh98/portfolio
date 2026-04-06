/**
 * Company logo SVG data for experience cards.
 * Each entry maps a company name to its logo definition.
 * Uses inline SVG paths to avoid external image dependencies.
 */

export interface CompanyLogo {
  /** SVG viewBox */
  viewBox: string;
  /** SVG path data or element markup */
  paths: ReadonlyArray<{ d: string; fill?: string }>;
  /** Fallback background color for the initial circle */
  color: string;
}

/**
 * Map of company names (lowercase) to their logo definitions.
 * Simplified/stylized logos for small display (24-32px).
 */
export const COMPANY_LOGOS: Record<string, CompanyLogo> = {
  "cme offshore": {
    viewBox: "0 0 24 24",
    paths: [
      {
        d: "M3 7h4v10H3V7zm7-3h4v16h-4V4zm7 6h4v7h-4v-7z",
        fill: "currentColor",
      },
    ],
    color: "#2563eb",
  },
  areeba: {
    viewBox: "0 0 24 24",
    paths: [
      {
        d: "M12 2L2 7v10l10 5 10-5V7L12 2zm0 2.5L19 8l-7 3.5L5 8l7-3.5zM4 9.5l7 3.5v7L4 16.5v-7zm9 10.5v-7l7-3.5v7l-7 3.5z",
        fill: "currentColor",
      },
    ],
    color: "#e11d48",
  },
  tecfrac: {
    viewBox: "0 0 24 24",
    paths: [
      {
        d: "M4 4h16v4H4V4zm2 6h5v10H6V10zm7 0h5v10h-5V10z",
        fill: "currentColor",
      },
    ],
    color: "#059669",
  },
  "nar technologies": {
    viewBox: "0 0 24 24",
    paths: [
      {
        d: "M4 4h4l4 8 4-8h4v16h-4V10l-4 8-4-8v10H4V4z",
        fill: "currentColor",
      },
    ],
    color: "#7c3aed",
  },
};

/**
 * Look up a company logo by name (case-insensitive).
 */
export function getCompanyLogo(company: string): CompanyLogo | undefined {
  return COMPANY_LOGOS[company.toLowerCase()];
}
