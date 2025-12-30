import { Badge } from '@mantine/core';

interface MatchScoreProps {
  matchScore: number | null | undefined;
}

export function ApplicationMatchScore({ matchScore }: MatchScoreProps) {
  if (!matchScore || matchScore === null || matchScore === undefined)
    {return (
      <Badge
        style={{ borderColor: 'gray' }}
        c="gray"
        size="lg"
        variant="outline"
        radius="md"
        h="100%"
      >
        N/A
      </Badge>
    );}

  const percentage = Math.round(matchScore * 100);
  const color = percentage >= 80 ? 'green' : percentage >= 60 ? 'blue' : 'darkRed';
  console.log(matchScore);

  return (
    <Badge
      style={{ borderColor: color }}
      c={color}
      size="lg"
      variant="outline"
      radius="md"
      h="100%"
    >
      {percentage}%
    </Badge>
  );
}
