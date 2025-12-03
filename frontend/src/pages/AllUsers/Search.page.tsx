import { AnimatePresence } from 'framer-motion';
import { Box, Flex, Loader, Skeleton, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import DesktopDefaultView from '@/components/ListingComponents/Views/ListingsGridView';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import MobileView from '@/components/ListingComponents/Views/MobileView';
import { PageMeta } from '@/SEO/PageMeta';
import { getParamsInfo } from '@/utils/getParamsInfo';
import styles from '@/styles/gradients.module.css';
import ListingCardSkeleton from '@/components/ListingComponents/ListingCard/ListingCardSkeleton';
import ListingDetailsPanel from '@/components/ListingComponents/ListingPanel/ListingDetailsPanel';

export function SearchPage() {
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
  } = getParamsInfo('search', isDesktop);
  const industry = searchParams.get('industry');
  const city = searchParams.get('city');

  const buildTitle = () => {
    if (industry && city) {
      return `${industry} Jobs in ${city} | JobRocket`;
    }
    if (industry && !city) {
      return `${industry} Jobs | JobRocket`;
    }
    if (!industry && city) {
      return `Jobs in ${city} | JobRocket`;
    }
    return 'Job Search Results | JobRocket';
  };

  // Show loading skeleton before anything else
  if (isLoading) {
    return (
      <>
        <PageMeta
          title={buildTitle()}
          description="Find English-speaking jobs in Israel. Browse tech, marketing, sales, and remote positions from top Israeli companies."
          keywords="English jobs Israel, Tel Aviv jobs, Jerusalem jobs, tech jobs Israel"
        />
        <Box className={styles.pageBackground}>
          <FilterBar
            searchParams={searchParams}
            updateSearchParam={updateSearchParam}
            isMobile={isMobile}
          />
          <Flex direction="column" align="center" mx="auto" gap={20} py="md" w="90vw">
          <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w="90%" mx="auto">
            {Array.from({ length: 12 }).map((_, i) => (
              <Stack
                p="sm"
                m="sm"
                key={i}
                w={300}
                h={300}
              >
                <ListingCardSkeleton width={300} height={300} />
              </Stack>
            ))}
          </Flex>
        </Flex>
        </Box>
      </>
    );
  }

  return (
    <>
      <PageMeta
        title={buildTitle()}
        description="Find English-speaking jobs in Israel. Browse tech, marketing, sales, and remote positions from top Israeli companies."
        keywords="English jobs Israel, Tel Aviv jobs, Jerusalem jobs, tech jobs Israel"
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
          ) : (selectedId && !isDesktop) ? (
            <ListingDetailsPanel listingId={selectedId} />
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