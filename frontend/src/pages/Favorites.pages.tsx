import { IconMoodSad } from '@tabler/icons-react';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Loader, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import DesktopDefaultView from '@/components/ListingComponents/Views/DesktopDefaultView';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import { AnimatePresence } from 'framer-motion';
import { getParamsInfo } from '@/utils/getParamsInfo';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

export function FavoriteListings() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const {searchParams, updateSearchParam, selectedId, displayListings, isLoading, noListings, totalCurrentListings, handleSelectListing, handleBackToAll } = getParamsInfo(`favorites/${user?._id}`);


  if (isLoading) {
    return (
      <Center>
        <Loader color="cyan" size="xl" mt={30} />
      </Center>
    );
  }

  if (noListings) {
    return (
      <Flex mt={20} direction="column" align="center" gap={20}>
        <Box mt={20}>
          <IconMoodSad color="gray" size={100} />
        </Box>
        <Title my={10} c="gray">
          No Favorites Found
        </Title>
        <Button
          onClick={() => navigate('/search')}
          variant="filled"
          color="blue"
          size="lg"
          fz={20}
        >
          Find Some Favorites
        </Button>
      </Flex>
    );
  }

  return (
     <Box>
        {/* Filters at top */}
        <FilterBar searchParams={searchParams} updateSearchParam={updateSearchParam} isMobile={isMobile} />

        <AnimatePresence mode="wait">
          {selectedId ? (
            <DesktopSplitView
              displayListings={displayListings}
              handleSelectListing={handleSelectListing}
              handleBackToAll={handleBackToAll}
              selectedId={selectedId}
            />
          ) : (
            // FULL WIDTH GRID - Default view
            <DesktopDefaultView
              isLoading={isLoading}
              noListings={noListings}
              displayListings={displayListings}
              totalCurrentListings={totalCurrentListings}
              handleSelectListing={handleSelectListing}
            />
          )}
        </AnimatePresence>
      </Box>
  );
}
