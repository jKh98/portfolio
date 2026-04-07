/**
 * Format a date string (ISO) to a display format.
 * Returns "Present" if no date is provided.
 */
export function formatDate(dateStr?: string): string {
  if (!dateStr) return "Present";
  const date = new Date(dateStr);
  return date.toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });
}

/**
 * Format a date range for display.
 */
export function formatDateRange(startDate: string, endDate?: string): string {
  return `${formatDate(startDate)} - ${formatDate(endDate)}`;
}

/**
 * Compute the number of full years of professional experience from an array
 * of work entries. Uses the earliest `startDate` and the current date.
 * Returns a floored integer (e.g. 7 for 7.4 years).
 */
export function getYearsOfExperience(
  entries: ReadonlyArray<{ startDate: string }>,
): number {
  if (entries.length === 0) return 0;
  const dates = entries.map((e) => e.startDate);
  dates.sort();
  const start = new Date(dates[0]);
  const now = new Date();
  const diffMs = now.getTime() - start.getTime();
  return Math.floor(diffMs / (365.25 * 24 * 60 * 60 * 1000));
}
