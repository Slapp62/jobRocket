import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import DesktopDefaultView from '@/components/ListingComponents/Views/ListingsGridView';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';
import { getParamsInfo } from '@/utils/getParamsInfo';
import styles from '@/styles/gradients.module.css';
import ListingCardSkeleton from '@/components/ListingComponents/ListingCard/ListingCardSkeleton';
import { EmptyState } from '@/components/EmptyState';

export function FavoriteListings() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 500px)');
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
      <Box className={styles.pageBackground}>
        <Flex direction="column" align="center" mx="auto" gap={20} py="md" w="90vw">
          <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w="90%" mx="auto">
          {Array.from({ length: 12 }).map((_, i) => (
            <Stack
              p="sm"
              m="sm"
              key={i}
            >
              <ListingCardSkeleton width={300}/>
            </Stack>
          ))}
        </Flex>
      </Flex>
      </Box>
    );
  }

  if (noListings) {
    return (
      <Box className={styles.pageBackground}>
        <EmptyState
          title="No Favorites Found"
          description="You haven't saved any job listings yet. Start exploring and save jobs you're interested in!"
          action={{
            label: 'Find Some Favorites',
            onClick: () => navigate('/search'),
          }}
        />
      </Box>
    );
  }

  return (
    <>
      <PageMeta
        title="My Saved Jobs | JobRocket"
        description="View and manage your saved job listings"
        keywords="saved jobs, favorites, bookmarked listings"
      />

      <Box className={styles.pageBackground}>
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
              isMobile={isMobile}
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
