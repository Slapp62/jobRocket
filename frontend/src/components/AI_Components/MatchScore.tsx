import { useEffect, useState } from 'react';
import { Badge, Loader } from '@mantine/core';
import axios from 'axios';

interface MatchScoreProps {
  listingId: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MatchScore({ listingId, size = 'md' }: MatchScoreProps) {
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

  if (loading) return <Loader size={size} />;
  if (score === null || score === undefined || isNaN(score)) return null;

  const percentage = Math.round(score * 100);
  const color = percentage >= 80 ? 'green' : percentage >= 60 ? 'blue' : 'gray';

  return (
    <Badge color={color} size={size} variant="filled">
      {percentage}% Match
    </Badge>
  );
}