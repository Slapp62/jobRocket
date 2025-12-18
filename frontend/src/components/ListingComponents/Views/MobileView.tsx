import { useState } from 'react';
import { IconArrowUp } from '@tabler/icons-react';
import { Box, Button, Flex, Group, Pagination, Skeleton, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FavoritesButton } from '@/components/ListingActions/FavoritesButton';
import { ViewDetailsAction } from '@/components/ListingActions/ViewDetailsAction';
import ListingCard from '../ListingCard/ListingCard';
import { EmptyState } from '@/components/EmptyState';

interface MobileViewProps {
  displayListings: any[];
  isLoading?: boolean;
}

const MobileView = ({ displayListings, isLoading = false }: MobileViewProps) => {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const listingsPerPage = 12;
  const [currentPage, setCurrentPage] = useState(1);
  const startCurrentListings = (currentPage - 1) * listingsPerPage + 1;
  const endCurrentListings = Math.min(currentPage * listingsPerPage, displayListings.length);
  const totalCurrentListings = displayListings.length;
  const noListings = displayListings.length === 0;

  if (isLoading) {
    return (
      <Flex direction="column" align="center" gap={20}>
        <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w={isMobile ? '95vw' : '80vw'}>
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} style={{ width: isMobile ? '95vw' : '350px' }}>
              <Skeleton height={280} radius="md" />
            </Box>
          ))}
        </Flex>
      </Flex>
    );
  }

  return (
    <Flex direction="column" align="center" gap={20}>
      <Flex wrap="wrap" gap="lg" align="stretch" justify="st" w={isMobile ? '95vw' : '80vw'}>
        {displayListings.map((listing) => (
          <ListingCard
           mobileWidth='100%'
            key={listing._id}
            listing={listing}
            actions={
              <Group gap={10} w="100%">
                <FavoritesButton listing={listing} />
                <ViewDetailsAction listingId={listing._id} width="70%" />
              </Group>
            }
          />
        ))}
      </Flex>

      {noListings && (
        <EmptyState
          title="No Listings Found"
          description="Try adjusting your search filters or browse all available job opportunities"
        />
      )}

      {!noListings && (
        <>
          <Text c="dimmed">
            Showing {startCurrentListings}-{endCurrentListings} of {totalCurrentListings} results
          </Text>

          <Pagination
            total={Math.ceil(displayListings.length / listingsPerPage)}
            value={currentPage}
            onChange={setCurrentPage}
            color="cyan"
            size={isMobile ? 'sm' : 'md'}
          />

          <Button onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} variant="light">
            <IconArrowUp />
          </Button>
        </>
      )}
    </Flex>
  );
};

export default MobileView;
