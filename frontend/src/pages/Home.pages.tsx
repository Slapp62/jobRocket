import { Hero } from '@/components/Hero';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';
import { Box, Button, Center, Flex, Loader, Pagination, Text, Title } from '@mantine/core';
import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { IconArrowUp, IconMoodSad2 } from '@tabler/icons-react';
import { useMediaQuery } from '@mantine/hooks';
import { fetchListingsThunk } from '@/store/listingSlice';
import ListingCard from '@/components/ListingCard';

export function HomePage() {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchListingsThunk() as any);
    }, [dispatch]);
    
    const allListings = useSelector((state:RootState) => state.listingSlice.listings);

    const isLoading = useSelector((state:RootState) => state.listingSlice.loading);

    const listings = useMemo(() => {
        if (!allListings) {return []};

        return [...allListings].sort((a : TListing, b : TListing) =>
            (a.createdAt && b.createdAt) ? b.createdAt?.localeCompare(a.createdAt) :  0);
    }, [allListings]);

    const sortOption = useSelector((state: RootState) => state.listingSlice.sortOption);
    const isMobile = useMediaQuery('(max-width: 500px)');

    const sortedListings = useMemo(() => {
        return [...listings].sort((a, b) => {
        if (sortOption === 'title-asc') {return a.jobTitle.localeCompare(b.jobTitle)};
        if (sortOption === 'title-desc') {return b.jobTitle.localeCompare(a.jobTitle)};
        if (sortOption === 'date-created-old'){
            if (a.createdAt && b.createdAt){
                return a.createdAt?.localeCompare(b.createdAt)
            }
        } 
        if (sortOption === 'date-created-new'){
            if (a.createdAt && b.createdAt){
                return b.createdAt?.localeCompare(a.createdAt)
            }
        }
        return 0
    });
    }, [listings, sortOption]);
  
    const [currentPage, setCurrentPage] = useState(1);
    const listingsPerPage = 12;

    const paginatedListings = useMemo(() => {
        return sortedListings.slice(
        (currentPage - 1) * listingsPerPage, currentPage * listingsPerPage);
    }, [sortedListings, currentPage, listingsPerPage]).map((listing:TListing) => listing._id);

    useEffect(() => {
        setCurrentPage(1);
    }, [sortedListings]);

    const startCurrentListings = (currentPage - 1) * listingsPerPage + 1;
    const endCurrentListings = Math.min(currentPage * listingsPerPage, sortedListings.length);
    const totalCurrentListings = sortedListings.length;
    const noListings = sortedListings.length === 0;

  return (
    <>
      <Hero />
      {isLoading || !allListings ?
        (
            <Center>
                <Loader color="cyan" size="xl" mt={30} />
            </Center>
        ) 
        : 
        (
        <Flex direction="column" align="center" gap={20}>
          
          <Flex wrap="wrap" gap='lg' justify="center" w={isMobile ? "100%" : "80%"}>
            {paginatedListings.map((id: string) => (
              <ListingCard listingID={id} key={id} />
            ))}
          </Flex>

          {!noListings && (
            <>
              <Text fw={500}>
                Showing {startCurrentListings} to {endCurrentListings} of {totalCurrentListings} results
              </Text>
              <Pagination
                mt="md"
                total={Math.ceil(sortedListings.length / listingsPerPage)}
                value={currentPage}
                onChange={page => {
                  setCurrentPage(page);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            </>
          )}

          {noListings && (
            <Box ta="center">
              <IconMoodSad2 color="red" size={80} />
              <Title order={2} fw={700} c="red">
                No Listings Found
              </Title>
            </Box>
          )}

          <Button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            mt={20}
            c="green"
            variant="light"
            rightSection={<IconArrowUp />}
          >
            Back to Top
          </Button>
        </Flex>
      )}
    </>
  );
}
