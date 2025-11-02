import { useEffect, useMemo, useState } from 'react';
import { IconArrowLeft, IconArrowUp, IconMoodSad2 } from '@tabler/icons-react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { AnimatePresence, motion } from 'framer-motion';
import { Box, Button, Center, Flex, Group, Loader, Pagination, ScrollArea, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { TListing } from '@/Types';
import { SearchText } from '@/components/Filters/SearchText';
import { SearchSort } from '@/components/Filters/SearchSort';
import { SearchCity } from '@/components/Filters/SearchCity';
import { SearchIndustry } from '@/components/Filters/SearchIndustry';
import { SearchRegion } from '@/components/Filters/SearchRegion';
import { SearchWorkArrangement } from '@/components/Filters/SearchWorkArrangement';
import ListingCard from '@/components/ListingCard';
import { ListingDetailsPanel } from '@/components/ListingDetailsPanel';
import { FavoritesButton } from '@/components/ListingActions/FavoritesButton';
import { ViewDetailsAction } from '@/components/ListingActions/ViewDetailsAction';
import { FilterBar } from '@/components/Filters/FilterBar';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  // Local state for search results
  const [listings, setListings] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Get sortOption and selected listing from URL
  const sortOption = searchParams.get('sortOption') || '';
  const selectedId = searchParams.get('selected');

  const listingsPerPage = 12;

  // Fetch search results when URL params change
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;

        // Build params object (exclude 'selected' from backend query)
        const params: any = {};
        searchParams.forEach((value, key) => {
          if (key !== 'selected') {
            params[key] = value;
          }
        });

        const response = await axios.get(`${API_BASE_URL}/api/listings/search`, { params });

        setListings(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
        setListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]);

  // Sort listings client-side
  const sortedListings = useMemo(() => {
    return [...listings].sort((a, b) => {
      if (sortOption === 'title-asc') return a.jobTitle.localeCompare(b.jobTitle);
      if (sortOption === 'title-desc') return b.jobTitle.localeCompare(a.jobTitle);
      if (sortOption === 'date-created-old') {
        if (a.createdAt && b.createdAt) {
          return a.createdAt.localeCompare(b.createdAt);
        }
      }
      if (sortOption === 'date-created-new') {
        if (a.createdAt && b.createdAt) {
          return b.createdAt.localeCompare(a.createdAt);
        }
      }
      return 0;
    });
  }, [listings, sortOption]);

  // Paginate (only for grid view)
  const paginatedListings = useMemo(() => {
    return sortedListings.slice((currentPage - 1) * listingsPerPage, currentPage * listingsPerPage);
  }, [sortedListings, currentPage]);

  // Reset to page 1 when search results change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortedListings]);

  // Handle listing selection (for desktop split-panel)
  const handleSelectListing = (listingId: string) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set('selected', listingId);
    setSearchParams(newParams);
  };

  // Handle back to all listings
  const handleBackToAll = () => {
    const params = new URLSearchParams(searchParams);
    params.delete('selected');
    setSearchParams(params);
  };

  const startCurrentListings = (currentPage - 1) * listingsPerPage + 1;
  const endCurrentListings = Math.min(currentPage * listingsPerPage, sortedListings.length);
  const totalCurrentListings = sortedListings.length;
  const noListings = sortedListings.length === 0;

  // Helper to update search params
  const updateSearchParam = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    setSearchParams(params);
  };

  // DESKTOP VIEW
  if (isDesktop) {
    return (
      <Box>
        {/* Filters at top */}
        <FilterBar searchParams={searchParams} updateSearchParam={updateSearchParam} />

        <AnimatePresence mode="wait">
          {selectedId ? (
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
                    overflow: 'hidden'
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
                        w='80%'
                        mx='auto'
                      >
                        Back to all listings
                      </Button>

                      {sortedListings.map((listing) => (
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
          ) : (
            // FULL WIDTH GRID - Default view
            <motion.div
              key="grid-view"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Box>
                {isLoading ? (
                  <Center py={50} h="calc(100vh - 200px)">
                    <Loader color="cyan" size="xl" />
                  </Center>
                ) : noListings ? (
                  <Center py={50} h="calc(100vh - 200px)">
                    <Stack align="center" gap="sm">
                      <IconMoodSad2 size={60} />
                      <Text size="lg" fw={500}>
                        No listings found
                      </Text>
                      <Text c="dimmed">Try adjusting your search filters</Text>
                    </Stack>
                  </Center>
                ) : (
                  <Flex direction="column" align="center" mx="auto" gap={20} py="md" w="90vw">
                    <Flex
                      wrap="wrap"
                      gap="lg"
                      align="stretch"
                      justify="center"
                      w="90%"
                      mx="auto"
                    >
                      {sortedListings.map((listing, index) => (
                        <motion.div
                          key={listing._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ 
                            duration: 0.3, 
                            delay: index * 0.03,
                            ease: 'easeOut'
                          }}
                          onClick={() => handleSelectListing(listing._id)}
                          style={{ cursor: 'pointer' }}
                        >
                          <ListingCard
                            listing={listing}
                            actions={
                              <Group gap={10} w="100%">
                                <FavoritesButton listing={listing} />
                              </Group>
                            }
                            width="300px"
                            
                          />
                        </motion.div>
                      ))}
                    </Flex>

                    {/* Pagination for desktop grid view */}
                    <Text c="dimmed">
                      Showing 1-{sortedListings.length} of {totalCurrentListings} results
                    </Text>
                  </Flex>
                )}
              </Box>
            </motion.div>
          )}
        </AnimatePresence>
      </Box>
    );
  }

  // MOBILE/TABLET GRID VIEW
  return (
    <>
      <Group gap={10} w={isMobile ? '100%' : '80%'} mx="auto" p={10}>
        <SearchText
          value={searchParams.get('searchWord') || ''}
          onChange={(val) => updateSearchParam('searchWord', val)}
          width={isMobile ? '100%' : '15%'}
        />
        <SearchRegion
          value={searchParams.get('region') || ''}
          onChange={(val) => updateSearchParam('region', val)}
          width={isMobile ? '100%' : '15%'}
        />
        <SearchCity
          value={searchParams.get('city') || ''}
          onChange={(val) => updateSearchParam('city', val)}
          width={isMobile ? '100%' : '15%'}
        />
        <SearchIndustry
          value={searchParams.get('industry') || ''}
          onChange={(val) => updateSearchParam('industry', val)}
          width={isMobile ? '100%' : '15%'}
        />
        <SearchWorkArrangement
          value={searchParams.get('workArrangement') || ''}
          onChange={(val) => updateSearchParam('workArrangement', val)}
          width={isMobile ? '100%' : '15%'}
        />
        <SearchSort
          value={searchParams.get('sortOption') || ''}
          onChange={(val) => updateSearchParam('sortOption', val)}
          width={isMobile ? '100%' : '15%'}
        />
      </Group>

      {isLoading ? (
        <Center>
          <Loader color="cyan" size="xl" mt={30} />
        </Center>
      ) : (
        <Flex direction="column" align="center" gap={20}>
          <Flex
            wrap="wrap"
            gap="lg"
            align="stretch"
            justify="center"
            w={isMobile ? '95vw' : '80vw'}
          >
            {paginatedListings.map((listing) => (
              <ListingCard
                key={listing._id}
                listing={listing}
                actions={
                  <Group gap={10} w="100%">
                    <FavoritesButton listing={listing} />
                    <ViewDetailsAction listingId={listing._id} width="70%" />
                  </Group>
                }
              />
            ))}
          </Flex>

          {noListings && (
            <Flex direction="column" align="center" gap={10} mt={50}>
              <IconMoodSad2 size={80} />
              <Text size="xl" fw={500}>
                No listings found
              </Text>
              <Text c="dimmed">Try adjusting your search filters</Text>
            </Flex>
          )}

          {!noListings && (
            <>
              <Text c="dimmed">
                Showing {startCurrentListings}-{endCurrentListings} of {totalCurrentListings}{' '}
                results
              </Text>

              <Pagination
                total={Math.ceil(sortedListings.length / listingsPerPage)}
                value={currentPage}
                onChange={setCurrentPage}
                color="cyan"
                size={isMobile ? 'sm' : 'md'}
              />

              <Button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                variant="light"
              >
                <IconArrowUp />
              </Button>
            </>
          )}
        </Flex>
      )}
    </>
  );
}