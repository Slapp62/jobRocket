import { IconArrowLeft } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Box, Button, Flex, ScrollArea, Stack } from '@mantine/core';
import ListingCard from '../ListingCard/ListingCard';
import { ListingDetailsPanel } from '../LIstingPanel/ListingDetailsPanel';

interface DesktopSplitViewProps {
  displayListings: any[];
  handleSelectListing: (listingId: string) => void;
  handleBackToAll: () => void;
  selectedId: string;
}

const DesktopSplitView = ({
  displayListings,
  handleSelectListing,
  handleBackToAll,
  selectedId,
}: DesktopSplitViewProps) => {
  return (
    // SPLIT VIEW - When listing is selected
    <motion.div
      key="split-view"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{ width: '80vw', margin: 'auto' }}
    >
      <Flex h="calc(100vh - 200px)" gap={0}>
        {/* LEFT SIDE: Condensed listing cards */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '40%', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{
            borderRight: '1px solid #dee2e6',
            overflow: 'hidden',
          }}
        >
          <ScrollArea h="100%">
            <Stack gap="sm" p="md">
              {/* Back button */}
              <Button
                variant="subtle"
                leftSection={<IconArrowLeft size={16} />}
                onClick={handleBackToAll}
                mb="sm"
                w="80%"
                mx="auto"
              >
                Go Back
              </Button>

              {displayListings.map((listing) => (
                <Box
                  key={listing._id}
                  onClick={() => handleSelectListing(listing._id)}
                  style={{
                    cursor: 'pointer',
                    outline: selectedId === listing._id ? '2px solid #228be6' : 'none',
                    borderRadius: '8px',
                    transition: 'outline 0.2s ease',
                  }}
                >
                  <ListingCard listing={listing} width="100%" />
                </Box>
              ))}
            </Stack>
          </ScrollArea>
        </motion.div>

        {/* RIGHT SIDE: Detail panel */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          animate={{ width: '60%', opacity: 1 }}
          exit={{ width: 0, opacity: 0 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
          style={{ overflow: 'hidden' }}
        >
          <ScrollArea h="100%">
            <Box p="lg">
              <ListingDetailsPanel listingId={selectedId} />
            </Box>
          </ScrollArea>
        </motion.div>
      </Flex>
    </motion.div>
  );
};

export default DesktopSplitView;
