import { useEffect, useState } from 'react';
import axios from 'axios';
import { Badge, Loader } from '@mantine/core';

interface MatchScoreProps {
  listingId: string;
  size?: 'sm' | 'md' | 'lg';
}

export function MatchScore({ listingId, size = 'md' }: MatchScoreProps) {
  const [score, setScore] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchScore() {
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';
      try {
        const response = await axios.get(
          `${API_BASE_URL}/api/recommendations/match-score/${listingId}`
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
  const color = percentage >= 80 ? 'green' : percentage >= 60 ? 'blue' : 'red';

  return (
    <Badge color={color} size="lg" variant="outline" radius="md" h="100%">
      {percentage}% Match
    </Badge>
  );
}
