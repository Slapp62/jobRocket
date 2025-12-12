import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Loader } from '@mantine/core';
import { TListing } from '@/Types';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

interface MatchScoreProps {
  listingId: string | TListing;
  size?: 'sm' | 'md' | 'lg';
}

export function MatchScore({ listingId, size = 'md' }: MatchScoreProps) {
  const user = useSelector((state: RootState) => state.userSlice.user);
  if (!user) return (
    <Badge style={{borderColor:'gray'}} c='gray' size="lg" variant="outline" radius="md" h="100%">
      AI MatchScore N/A
    </Badge>
  );

  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScore() {
      try {
        const response = await axios.get(
          `/api/recommendations/match-score/${listingId}`
        );
        setScore(response.data.matchScore);
      } catch (error) {
        console.error('Failed to fetch match score:', error);
        setScore(null);
      } finally {
        setLoading(false);
      }
    }

    fetchScore();
  }, [listingId]);

  if (loading) {
    return <Loader size={size} />;
  }
  if (score === null || score === undefined || isNaN(score)) {
    return null;
  }

  const percentage = Math.round(score * 100);
  const color = percentage >= 80 ? 'green' : percentage >= 60 ? 'blue' : 'darkRed';

  return (
    <Badge style={{borderColor:color}} c={color} size="lg" variant="outline" radius="md" h="100%">
      {percentage}% Match
    </Badge>
  );
}
