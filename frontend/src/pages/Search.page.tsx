import { useEffect, useMemo, useState } from 'react';
import { IconArrowUp, IconMoodSad2 } from '@tabler/icons-react';
import axios from 'axios';
import { useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button, Center, Flex, Group, Loader, Pagination, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { TListing } from '@/Types';
import { SearchText } from '@/components/Filters/SearchText';
import { SearchSort } from '@/components/Filters/SearchSort';
import { SearchCity } from '@/components/Filters/SearchCity';
import { SearchIndustry } from '@/components/Filters/SearchIndustry';
import { SearchRegion } from '@/components/Filters/SearchRegion';
import { SearchWorkArrangement } from '@/components/Filters/SearchWorkArrangement';
import ListingSnip from '@/components/ListingSnip';

export function SearchPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const isMobile = useMediaQuery('(max-width: 500px)');

  // Local state for search results
  const [listings, setListings] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  // Get sortOption from URL (for client-side sorting)
  const sortOption = searchParams.get('sortOption') || '';

  const listingsPerPage = 12;

  // Fetch search results when URL params change
  useEffect(() => {
    const fetchSearchResults = async () => {
      setIsLoading(true);
      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;

        // Convert searchParams to object for axios
        const params = Object.fromEntries(searchParams);

        const response = await axios.get(`${API_BASE_URL}/api/listings/search`, { params });

        setListings(response.data);
      } catch (error: any) {
        toast.error(error.response?.data?.message || error.message);
        setListings([]); // Show empty state on error
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchResults();
  }, [searchParams]); // Re-fetch when URL changes

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

  // Paginate
  const paginatedListings = useMemo(() => {
    return sortedListings.slice((currentPage - 1) * listingsPerPage, currentPage * listingsPerPage);
  }, [sortedListings, currentPage]);

  // Reset to page 1 when search results change
  useEffect(() => {
    setCurrentPage(1);
  }, [sortedListings]);

  const startCurrentListings = (currentPage - 1) * listingsPerPage + 1;
  const endCurrentListings = Math.min(currentPage * listingsPerPage, sortedListings.length);
  const totalCurrentListings = sortedListings.length;
  const noListings = sortedListings.length === 0;

  return (
    <>
    <Group gap={10} w={isMobile ? '100%' : '80%'} mx="auto" p={10}>
      <SearchText
        value={searchParams.get('searchWord') || ''}
        onChange={(val) => setSearchParams({ searchWord: val })}
        width={isMobile ? '100%' : '15%'}
      />
      
      <SearchRegion
        value={searchParams.get('region') || ''}
        onChange={(val) => setSearchParams({ region: val })}
        width={isMobile ? '100%' : '15%'}
      />
      <SearchCity
        value={searchParams.get('city') || ''}
        onChange={(val) => setSearchParams({ city: val })}
        width={isMobile ? '100%' : '15%'}
      />
      <SearchIndustry
        value={searchParams.get('industry') || ''}
        onChange={(val) => setSearchParams({ industry: val })}
        width={isMobile ? '100%' : '15%'}
      />
      <SearchWorkArrangement
        value={searchParams.get('workArrangement') || ''}
        onChange={(val) => setSearchParams({ workArrangement: val })}
        width={isMobile ? '100%' : '15%'}
      />  
      <SearchSort
        value={searchParams.get('sortOption') || ''}
        onChange={(val) => setSearchParams({ sortOption: val })}
        width={isMobile ? '100%' : '15%'}
      />
    </Group>

      {isLoading ? (
        <Center>
          <Loader color="cyan" size="xl" mt={30} />
        </Center>
      ) : (
        <Flex direction="column" align="center" gap={20}>
          <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w={isMobile ? '95%' : '90%'}>
            {paginatedListings.map((listing) => (
              <ListingSnip key={listing._id} listingID={listing._id} />
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
