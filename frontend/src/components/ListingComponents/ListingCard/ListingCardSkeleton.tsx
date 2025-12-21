import { Box, Card, Skeleton, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';

type ListingCardSkeletonProps = {
  width?: string | number;
  mobileWidth?: string | number;
  height?: string | number;
  mobileHeight?: string | number;
};

function ListingCardSkeleton({
  width,
  mobileWidth,
  height,
  mobileHeight,
}: ListingCardSkeletonProps) {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <Card
      shadow="sm"
      radius="md"
      withBorder
      style={{
        width: isMobile ? mobileWidth : width,
        height: isMobile ? mobileHeight : height || '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Stack gap="lg" justify="center" style={{ flex: 1 }}>
        {/* Job Title - 2 lines */}
        <Skeleton height={24} width="90%" mt={-8} />
        <Skeleton height={24} width="70%" mt={-12} />

        {/* Company Name */}
        <Skeleton height={20} width="50%" />

        {/* Badges */}
        <Box style={{ display: 'flex', gap: 8 }}>
          <Skeleton height={22} width={80} radius="lg" />
          <Skeleton height={22} width={90} radius="lg" />
        </Box>

        {/* Details - 3 lines */}
        <Stack gap={4}>
          <Skeleton height={18} width="85%" />
          <Skeleton height={18} width="60%" />
          <Skeleton height={16} width="40%" />
        </Stack>
      </Stack>
    </Card>
  );
}

export default ListingCardSkeleton;
