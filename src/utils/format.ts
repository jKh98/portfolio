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
