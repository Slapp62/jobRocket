import { Box, Center, Flex, Loader, Stack, Text } from "@mantine/core";
import { IconMoodSad2 } from "@tabler/icons-react";
import { motion } from "framer-motion";
import ListingCard from "../ListingCard";
import { EditDeleteActions } from "@/components/ListingActions/EditDeleteActions";

interface MyListingsDefaultViewProps {
    isLoading: boolean;
    noListings: boolean;
    displayListings: any[];
    totalCurrentListings: number;
    handleEditListing: (listingId: string) => void;
    onDelete: (listingId: string) => Promise<void>;
}

const MyListingsDefaultView = ({
    isLoading,
    noListings,
    displayListings,
    totalCurrentListings,
    handleEditListing,
    onDelete
}: MyListingsDefaultViewProps) => {
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
                  <Center py={50} h="calc(100vh - 200px)">
                    <Loader color="cyan" size="xl" />
                  </Center>
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
                    <Flex
                      wrap="wrap"
                      gap="lg"
                      align="stretch"
                      justify="center"
                      w="90%"
                      mx="auto"
                    >
                      {displayListings.map((listing, index) => (
                        <motion.div
                          key={listing._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{
                            duration: 0.3,
                            delay: index * 0.03,
                            ease: 'easeOut'
                          }}
                        >
                          <ListingCard
                            listing={listing}
                            actions={
                              <EditDeleteActions
                                listingId={listing._id}
                                listingTitle={listing.jobTitle}
                                onEdit={() => handleEditListing(listing._id)}
                                onDelete={() => onDelete(listing._id)}
                              />
                            }
                            width="300px"
                            disableHoverEffect={true}
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
    )
}

export default MyListingsDefaultView;
