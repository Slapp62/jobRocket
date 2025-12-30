import { IconArrowRight} from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Box, Button, Flex, Group, Skeleton, Stack, Text } from '@mantine/core';
import { MatchScore } from '@/components/AI_Components/ListingMatchScore';
import { EmptyState } from '@/components/EmptyState';
import { FavoritesButton } from '@/components/ListingActions/FavoritesButton';
import { RootState } from '@/store/store';
import ListingCard from '../ListingCard/ListingCard';

interface DesktopDefaultViewProps {
  isLoading: boolean;
  noListings: boolean;
  displayListings: any[];
  totalCurrentListings: number;
  handleSelectListing: (listingId: string) => void;
}

const DesktopDefaultView = ({
  isLoading,
  noListings,
  displayListings,
  totalCurrentListings,
  handleSelectListing,
}: DesktopDefaultViewProps) => {
  const { user } = useSelector((state: RootState) => state.userSlice);

  return (
    <motion.div
      key="grid-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Box>
        {isLoading ? (
          <Flex direction="column" align="center" mx="auto" gap={20} py="md" w="90vw">
            <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w="90%" mx="auto">
              {Array.from({ length: 12 }).map((_, i) => (
                <Stack
                  p="sm"
                  m="sm"
                  key={i}
                  style={{ width: '300px', border: '1px solid #dee2e6', borderRadius: '8px' }}
                >
                  <Skeleton height={30} radius="sm" w="80%" />
                  <Skeleton height={10} radius="sm" />
                  <Skeleton height={50} radius="sm" />
                </Stack>
              ))}
            </Flex>
          </Flex>
        ) : noListings ? (
          <EmptyState
            title="No Listings Found"
            description="Try adjusting your search filters or browse all available job opportunities"
          />
        ) : (
          <Flex direction="column" align="center" mx="auto" gap={20} py="md" w="90vw">
            <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w="95%" mx="auto">
              {displayListings.map((listing, index) => (
                <motion.div
                  key={listing._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    duration: 0.3,
                    delay: index * 0.03,
                    ease: 'easeOut',
                  }}
                  style={{ cursor: 'pointer' }}
                >
                  <ListingCard
                    handleSelectListing={handleSelectListing}
                    listing={listing}
                    actions={
                      <Group gap={10} w="100%" justify="space-between">
                        <Button
                          onClick={() => {
                            if (!handleSelectListing) {return null;}
                            handleSelectListing(listing._id);
                            window.scrollTo({ top: 0, behavior: 'instant' });
                          }}
                          fullWidth
                          size="sm"
                          variant="filled"
                          rightSection={<IconArrowRight size={20} />}
                        >
                          Details
                        </Button>
                        {user?.profileType === 'jobseeker' && (
                          <FavoritesButton listing={listing} width="40%" />
                        )}

                        {user?.profileType !== 'business' && <MatchScore listing={listing} />}
                      </Group>
                    }
                    width="300px"
                  />
                </motion.div>
              ))}
            </Flex>

            {/* Pagination for desktop grid view */}
            <Text c="dimmed">
              Showing 1-{displayListings.length} of {totalCurrentListings} results
            </Text>
          </Flex>
        )}
      </Box>
    </motion.div>
  );
};

export default DesktopDefaultView;
