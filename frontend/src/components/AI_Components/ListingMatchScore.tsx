import { useSelector } from 'react-redux';
import { Badge } from '@mantine/core';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';

interface MatchScoreProps {
  listing: TListing;
}

/**
 * Displays the AI match score for a job listing.
 *
 * HOW IT WORKS:
 * - The match score is pre-calculated by the backend when fetching listings
 * - This eliminates 20 separate API calls per page (95% reduction in requests)
 * - The score is included directly in the listing object
 * - Component simply displays the pre-calculated value
 *
 * @param listing - The full listing object with pre-calculated matchScore
 */
export function MatchScore({ listing }: MatchScoreProps) {
  const user = useSelector((state: RootState) => state.userSlice.user);

  // If no user or user is not a jobseeker, show N/A
  if (!user || user.profileType !== 'jobseeker') {
    return null;
  }

  // Use pre-calculated match score from listing data (no API call needed!)
  const score = listing.matchScore;

  // If no match score available, show N/A
  if (score === null || score === undefined || isNaN(score)) {
    return (
      <Badge
        style={{ borderColor: 'gray' }}
        c="gray"
        size="lg"
        variant="outline"
        radius="md"
        h="100%"
      >
        AI MatchScore N/A
      </Badge>
    );
  }

  const percentage = Math.round(score * 100);
  const color = percentage >= 80 ? 'green' : percentage >= 60 ? 'blue' : 'darkRed';

  return (
    <Badge style={{ borderColor: color }} c={color} size="xl" variant="outline" radius="md">
      {percentage}% Match
    </Badge>
  );
}
