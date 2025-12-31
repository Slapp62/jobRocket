import { useSelector } from 'react-redux';
import { Flex, StyleProp, Text } from '@mantine/core';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';

interface MatchScoreProps {
  listing: TListing;
  width?: StyleProp<number | string>;
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
export function MatchScore({ listing, width }: MatchScoreProps) {
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
      <Flex
        w={width}
        h="100%"
        align="center"
        justify="center"
        style={{
          border: '1px solid gray',
          borderRadius: '8px',
          padding: '8px',
        }}
      >
        <Text size="sm" c="gray" fw={600}>
          AI Match: N/A
        </Text>
      </Flex>
    );
  }

  const percentage = Math.round(score * 100);

  // Determine color and border based on percentage
  let borderColor: string;
  let textColor: string;

  if (percentage >= 80) {
    borderColor = 'var(--mantine-color-green-6)';
    textColor = 'var(--mantine-color-green-6)';
  } else if (percentage >= 60) {
    borderColor = 'var(--mantine-color-yellow-9)';
    textColor = 'var(--mantine-color-yellow-9)';
  } else {
    borderColor = 'var(--mantine-color-red-8)';
    textColor = 'var(--mantine-color-red-8)';
  }

  return (
    <Flex
      w={width}
      h="100%"
      align="center"
      justify="center"
      style={{
        border: `1px solid ${borderColor}`,
        borderRadius: '8px',
        padding: '8px',
      }}
    >
      <Text size="md" c={textColor} fw={500}>
        {percentage}% Match
      </Text>
    </Flex>
  );
}
