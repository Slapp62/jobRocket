import { IconMoodSad } from '@tabler/icons-react';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Skeleton, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import DesktopDefaultView from '@/components/ListingComponents/Views/DesktopDefaultView';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';
import { getParamsInfo } from '@/utils/getParamsInfo';

export function FavoriteListings() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');
  const {
    searchParams,
    updateSearchParam,
    selectedId,
    displayListings,
    isLoading,
    noListings,
    totalCurrentListings,
    handleSelectListing,
    handleBackToAll,
  } = getParamsInfo(`favorites/${user?._id}`);

  if (isLoading) {
    return (
      <Flex direction="column" align="center" mx="auto" gap={20} py="md" w="90vw">
        <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w="90%" mx="auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} style={{ width: isMobile ? '95vw' : '300px' }}>
              <Skeleton height={280} radius="md" />
            </Box>
          ))}
        </Flex>
      </Flex>
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
        <Button onClick={() => navigate('/search')} variant="filled" color="blue" size="lg" fz={20}>
          Find Some Favorites
        </Button>
      </Flex>
    );
  }

  return (
    <>
      <PageMeta
        title="My Saved Jobs | JobRocket"
        description="View and manage your saved job listings"
        keywords="saved jobs, favorites, bookmarked listings"
      />

      <Box>
        {/* Filters at top */}
      <FilterBar
        searchParams={searchParams}
        updateSearchParam={updateSearchParam}
        isMobile={isMobile}
      />

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
    </>
  );
}
