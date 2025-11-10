import { AnimatePresence } from 'framer-motion';
import { Box } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import DesktopDefaultView from '@/components/ListingComponents/Views/DesktopDefaultView';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import MobileView from '@/components/ListingComponents/Views/MobileView';
import { PageMeta } from '@/SEO/PageMeta';
import { getParamsInfo } from '@/utils/getParamsInfo';

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
    if (industry && city) return `${industry} Jobs in ${city} | JobRocket`;
    if (industry && !city) return `${industry} Jobs | JobRocket`;
    if (!industry && city) return `Jobs in ${city} | JobRocket`;
    return 'Job Search Results | JobRocket';
  };

  // DESKTOP VIEW
  if (isDesktop) {
    return (
      <>
        <PageMeta
          title={buildTitle()}
          description="Find English-speaking jobs in Israel. Browse tech, marketing, sales, and remote positions from top Israeli companies."
          keywords="English jobs Israel, Tel Aviv jobs, Jerusalem jobs, tech jobs Israel"
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

  // MOBILE/TABLET GRID VIEW
  return (
    <>
      <PageMeta
        title={buildTitle()}
        description="Find English-speaking jobs in Israel. Browse tech, marketing, sales, and remote positions from top Israeli companies."
        keywords="English jobs Israel, Tel Aviv jobs, Jerusalem jobs, tech jobs Israel"
      />
      <FilterBar
        searchParams={searchParams}
        updateSearchParam={updateSearchParam}
        isMobile={isMobile}
      />

      <MobileView displayListings={displayListings} isLoading={isLoading} />
    </>
  );
}
