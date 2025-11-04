import { AnimatePresence } from 'framer-motion';
import { Box, Center, Loader } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import DesktopDefaultView from '@/components/ListingComponents/Views/DesktopDefaultView';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import MobileView from '@/components/ListingComponents/Views/MobileView';
import { getParamsInfo } from '@/utils/getParamsInfo';

export function SearchPage() {
  
  const isMobile = useMediaQuery('(max-width: 500px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const { searchParams, updateSearchParam, selectedId, displayListings, isLoading, noListings, totalCurrentListings, handleSelectListing, handleBackToAll } = getParamsInfo('search', isDesktop);

  // DESKTOP VIEW
  if (isDesktop) {
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

  // MOBILE/TABLET GRID VIEW
  return (
    <>
      <FilterBar searchParams={searchParams} updateSearchParam={updateSearchParam} isMobile={isMobile} />

      {isLoading ? (
        <Center>
          <Loader color="cyan" size="xl" mt={30} />
        </Center>
      ) : (
        <MobileView
          displayListings={displayListings}
        />
      )}
    </>
  );
}