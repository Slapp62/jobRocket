/**
 * Utility functions for formatting data for display
 */

/**
 * Formats region names by replacing underscores with spaces for display
 * @param region - The region string (e.g., "Jerusalem_District", "West_Bank")
 * @returns Formatted region string (e.g., "Jerusalem District", "West Bank")
 */
export function formatRegionForDisplay(region: string): string {
  if (!region) return '';
  return region.replace(/_/g, ' ');
}
