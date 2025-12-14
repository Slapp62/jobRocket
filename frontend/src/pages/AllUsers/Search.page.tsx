import { AnimatePresence } from 'framer-motion';
import { Box, Button, Center, Divider, Flex, Loader, Stack, TextInput } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import DesktopDefaultView from '@/components/ListingComponents/Views/ListingsGridView';
import DesktopSplitView from '@/components/ListingComponents/Views/DesktopSplitView';
import { PageMeta } from '@/SEO/PageMeta';
import { getParamsInfo } from '@/utils/getParamsInfo';
import styles from '@/styles/gradients.module.css';
import ListingDetailsPanel from '@/components/ListingComponents/ListingPanel/ListingDetailsPanel';
import { KeyboardEvent, useEffect, useState } from 'react';

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
  const city = searchParams.get('city');
  const [searchText, setSearchText] = useState(searchParams.get('searchWord') || '');

  useEffect(() => {
    setSearchText(searchParams.get('searchWord') || '');
  }, [searchParams.get('searchWord')]);
  
  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      updateSearchParam('searchWord', searchText);
    }
  };
  
  const buildTitle = () => {
    if (city) {
      return `Jobs in ${city} | JobRocket`;
    }
    return 'Job Search Results | JobRocket';
  };

  return (
    <>
      <PageMeta
        title={buildTitle()}
        description="Find English-speaking jobs in Israel. Browse tech, marketing, sales, and remote positions from top Israeli companies."
        keywords="English jobs Israel, Tel Aviv jobs, Jerusalem jobs, tech jobs Israel"
      />
      <Box className={styles.pageBackground}>
        <Box bg='rocketRed.7'>
        <Stack w={{base:'100%', md: '70%'}} mx='auto' p='md' justify='center' align='center' >
          <Flex w={{base:'100%', md: '70%'}} direction={isMobile ? 'column' : 'row'} gap={0} justify='center' align='stretch'>
            <TextInput
              w={{base:'100%', md: '70%'}}
              radius={0}
              size='lg'
              variant="default"
              placeholder={'Start finding jobs...'}
              value={searchText}
              onChange={(event) => setSearchText(event.currentTarget.value)} 
              onKeyDown={handleSearchKeyDown}
            />
            <Button w={{base:'100%', md: '30%'}} size='lg' radius={0} onClick={(e) => updateSearchParam('searchWord', searchText)}>Search</Button>
          </Flex>

          <FilterBar
            searchParams={searchParams}
            updateSearchParam={updateSearchParam}
            isMobile={isMobile}
          />
        </Stack>
        </Box>
        <Divider size='xs' color='rocketRed.3'/>

        {isLoading ? 
         <Center mt={100}><Loader size='xl' /></Center> : 
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
        </AnimatePresence>}
      </Box>
    </>
  );
}