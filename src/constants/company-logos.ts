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
export const COMPANY_LOGOS: Record<string, CompanyLogo> = {};

/**
 * Look up a company logo by name (case-insensitive).
 */
export function getCompanyLogo(company: string): CompanyLogo | undefined {
  return COMPANY_LOGOS[company.toLowerCase()];
}
