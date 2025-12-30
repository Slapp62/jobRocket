import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { IconX } from '@tabler/icons-react';
import { AnimatePresence } from 'framer-motion';
import {
  ActionIcon,
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Loader,
  Stack,
  TextInput,
  useComputedColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import ListingDetailsPanel from '@/components/ListingComponents/ListingPanel/ListingDetailsPanel';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import DesktopDefaultView from '@/components/ListingComponents/Views/ListingsGridView';
import { PageMeta } from '@/SEO/PageMeta';
import { announceToScreenReader } from '@/utils/accessibility';
import { trackJobSearch } from '@/utils/analytics';
import { formatRegionForDisplay } from '@/utils/formatters';
import { getParamsInfo } from '@/utils/getParamsInfo';

export function SearchPage() {
  const computedColorScheme = useComputedColorScheme('light', { getInitialValueInEffect: true });
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
  const city = searchParams.get('city');
  const [searchText, setSearchText] = useState(searchParams.get('searchText') || '');

  // ACCESSIBILITY: Track previous result count for announcements
  const previousCountRef = useRef<number | null>(null);

  // Track previous filter values to detect changes
  const prevFiltersRef = useRef<{
    region?: string | null;
    city?: string | null;
    workArrangement?: string | null;
  }>({});

  // Sync searchText with URL params when they change externally
  useEffect(() => {
    setSearchText(searchParams.get('searchText') || '');
  }, [searchParams.get('searchText')]);

  // Track when filters change (region, city, workArrangement)
  useEffect(() => {
    const region = searchParams.get('region');
    const city = searchParams.get('city');
    const workArrangement = searchParams.get('workArrangement');
    const searchText = searchParams.get('searchText');

    const prev = prevFiltersRef.current;

    // Check if any filter has changed
    const filtersChanged =
      prev.region !== region || prev.city !== city || prev.workArrangement !== workArrangement;

    if (filtersChanged) {
      // Update tracking ref
      prevFiltersRef.current = { region, city, workArrangement };

      // Track search if any filters are applied
      if (region || city || workArrangement) {
        const filters: Record<string, any> = {};
        if (region) filters.region = region;
        if (city) filters.city = city;
        if (workArrangement) filters.workArrangement = workArrangement;

        trackJobSearch(searchText || '', filters);
      }
    }
  }, [searchParams]);

  // ACCESSIBILITY: Announce search results to screen readers
  useEffect(() => {
    if (!isLoading && totalCurrentListings !== previousCountRef.current) {
      const count = totalCurrentListings;
      const searchTerm = searchParams.get('searchText');
      const region = searchParams.get('region');
      const cityParam = searchParams.get('city');

      let message = '';

      if (count === 0) {
        message = 'No job listings found';
        if (searchTerm) message += ` matching "${searchTerm}"`;
        if (cityParam) message += ` in ${cityParam}`;
        else if (region) message += ` in ${formatRegionForDisplay(region)}`;
      } else {
        message = `Found ${count} job listing${count === 1 ? '' : 's'}`;
        if (searchTerm) message += ` matching "${searchTerm}"`;
        if (cityParam) message += ` in ${cityParam}`;
        else if (region) message += ` in ${formatRegionForDisplay(region)}`;
      }

      announceToScreenReader(message, 'polite');
      previousCountRef.current = totalCurrentListings;
    }
  }, [isLoading, totalCurrentListings, searchParams]);

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateSearchParam('searchText', searchText);

      // Track search event in Google Analytics
      if (searchText.trim()) {
        const filters: Record<string, any> = {};
        const region = searchParams.get('region');
        const cityParam = searchParams.get('city');
        const workArrangement = searchParams.get('workArrangement');

        if (region) filters.region = region;
        if (cityParam) filters.city = cityParam;
        if (workArrangement) filters.workArrangement = workArrangement;

        trackJobSearch(searchText, filters);
      }
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
    updateSearchParam('searchText', '');
  };

  const handleSearchClick = () => {
    updateSearchParam('searchText', searchText);

    // Track search event in Google Analytics
    if (searchText.trim()) {
      const filters: Record<string, any> = {};
      const region = searchParams.get('region');
      const cityParam = searchParams.get('city');
      const workArrangement = searchParams.get('workArrangement');

      if (region) filters.region = region;
      if (cityParam) filters.city = cityParam;
      if (workArrangement) filters.workArrangement = workArrangement;

      trackJobSearch(searchText, filters);
    }
  };

  const buildTitle = () => {
    if (city) {
      return `Search: Jobs in ${city} | JobRocket`;
    }
    return 'Search | JobRocket';
  };

  return (
    <>
      <PageMeta
        title={buildTitle()}
        description="Find English-speaking jobs in Israel. Browse tech, marketing, sales, and remote positions from top Israeli companies."
        keywords="English jobs Israel, Tel Aviv jobs, Jerusalem jobs, tech jobs Israel"
      />
      <Box>
        <Box bg={computedColorScheme === 'dark' ? 'rocketBlack.9' : 'rocketGray.2'}>
          <Stack
            w={{ base: '100%', md: '60%' }}
            mx="auto"
            py={{ base: 'xs', md: 'lg' }}
            justify="center"
            align="center"
          >
            <Flex
              w={{ base: '95%', md: '70%' }}
              direction={isMobile ? 'column' : 'row'}
              gap={isMobile ? 5 : 0}
              justify="center"
              align="stretch"
            >
              <TextInput
                w={{ base: '100%', md: '70%' }}
                radius={isMobile ? 'md' : 0}
                size="md"
                variant="default"
                placeholder="Search by skills, role, or keywords..."
                value={searchText}
                onChange={(event) => setSearchText(event.currentTarget.value)}
                onKeyDown={handleSearchKeyDown}
                rightSection={
                  searchText ? (
                    <ActionIcon
                      variant="subtle"
                      color="gray"
                      onClick={handleClearSearch}
                      aria-label="Clear search"
                    >
                      <IconX size={16} />
                    </ActionIcon>
                  ) : null
                }
              />
              <Button
                w={{ base: '100%', md: '30%' }}
                size="md"
                c="white"
                radius={isMobile ? 'md' : 0}
                onClick={handleSearchClick}
              >
                Search
              </Button>
            </Flex>

            <FilterBar
              searchParams={searchParams}
              updateSearchParam={updateSearchParam}
              isMobile={isMobile}
              width={{ base: '100%', md: '80%' }}
            />
          </Stack>
        </Box>
        <Divider size="xs" />

        {/* ACCESSIBILITY: Screen reader announcement region for search results */}
        <div
          role="status"
          aria-live="polite"
          aria-atomic="true"
          style={{
            position: 'absolute',
            width: '1px',
            height: '1px',
            padding: 0,
            margin: '-1px',
            overflow: 'hidden',
            clip: 'rect(0, 0, 0, 0)',
            whiteSpace: 'nowrap',
            borderWidth: 0,
          }}
        >
          {!isLoading &&
            totalCurrentListings !== null &&
            (totalCurrentListings === 0
              ? 'No job listings found'
              : `Showing ${totalCurrentListings} job listing${totalCurrentListings === 1 ? '' : 's'}`)}
        </div>

        {isLoading ? (
          <Center my={100}>
            <Loader size="xl" />
          </Center>
        ) : (
          <AnimatePresence mode="wait">
            {selectedId ? (
              <DesktopSplitView
                displayListings={displayListings}
                handleSelectListing={handleSelectListing}
                handleBackToAll={handleBackToAll}
                selectedId={selectedId}
                isMobile={isMobile}
              />
            ) : selectedId && !isDesktop ? (
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
        )}
      </Box>
    </>
  );
}
