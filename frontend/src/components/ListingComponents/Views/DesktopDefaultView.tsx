import { IconMoodSad2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Box, Center, Flex, Group, Skeleton, Stack, Text } from '@mantine/core';
import { MatchScore } from '@/components/AI_Components/MatchScore';
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
              {Array.from({ length: 6 }).map((_, i) => (
                <Box key={i} style={{ width: '300px' }}>
                  <Skeleton height={4} circle />
                  <Skeleton height={3} />
                  <Skeleton height={3} />
                </Box>
              ))}
            </Flex>
          </Flex>
        ) : noListings ? (
          <Center py={50} h="calc(100vh - 200px)">
            <Stack align="center" gap="sm">
              <IconMoodSad2 size={60} />
              <Text size="lg" fw={500}>
                No listings found
              </Text>
              <Text c="dimmed">Try adjusting your search filters</Text>
            </Stack>
          </Center>
        ) : (
          <Flex direction="column" align="center" mx="auto" gap={20} py="md" w="90vw">
            <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w="90%" mx="auto">
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
                  onClick={() => handleSelectListing(listing._id)}
                  style={{ cursor: 'pointer' }}
                >
                  <ListingCard
                    listing={listing}
                    actions={
                      <Group gap={10} w="100%">
                        <FavoritesButton listing={listing} />
                        {user && <MatchScore listingId={listing._id} />}
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
