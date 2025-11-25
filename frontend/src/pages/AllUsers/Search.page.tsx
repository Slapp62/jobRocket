import { AnimatePresence } from 'framer-motion';
import { Box, Flex, Skeleton, Stack } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import DesktopDefaultView from '@/components/ListingComponents/Views/DesktopDefaultView';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import MobileView from '@/components/ListingComponents/Views/MobileView';
import { PageMeta } from '@/SEO/PageMeta';
import { getParamsInfo } from '@/utils/getParamsInfo';
import styles from '@/styles/gradients.module.css';

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
        </Box>
      </>
    );
  }

  // DESKTOP VIEW
  if (isDesktop) {
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

  // MOBILE/TABLET GRID VIEW
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

        <MobileView displayListings={displayListings} isLoading={isLoading} />
      </Box>
    </>
  );
}
