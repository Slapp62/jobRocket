import { IconCards, IconMoodSad } from '@tabler/icons-react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Center, Flex, Loader, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FilterBar } from '@/components/Filters/FilterBar';
import MyListingsDefaultView from '@/components/ListingComponents/Views/MyListingsDefaultView';
import MyListingsSplitView from '@/components/ListingComponents/Views/MyListingsSplitView';
import { AnimatePresence } from 'framer-motion';
import { getParamsInfo } from '@/utils/getParamsInfo';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import axios from 'axios';
import { toast } from 'react-toastify';

export function MyListings() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const [, setSearchParams] = useSearchParams();

  const {
    searchParams: urlSearchParams,
    updateSearchParam,
    selectedId,
    displayListings,
    isLoading,
    noListings,
    totalCurrentListings,
    handleBackToAll
  } = getParamsInfo(`user-listings/${user?._id}`);

  const handleEditListing = (listingId: string) => {
    const params = new URLSearchParams(urlSearchParams);
    params.set('selected', listingId);
    setSearchParams(params);
  };

  const handleDelete = async (listingId: string) => {
    if (!window.confirm('Are you sure you want to delete this listing?')) {
      return;
    }

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_URL;

      await axios.delete(`${API_BASE_URL}/api/listings/${listingId}`, {
        headers: { 'x-auth-token': token },
      });

      toast.success('Listing deleted successfully');

      // If we're viewing the deleted listing, go back to all listings
      if (selectedId === listingId) {
        handleBackToAll();
      }

      // Refresh the page to reload listings
      window.location.reload();
    } catch (error: any) {
      toast.error('Failed to delete listing');
      throw error;
    }
  };

  const handleUpdate = () => {
    // Refresh the page to reload updated listings
    window.location.reload();
  };

  if (isLoading) {
    return (
      <Center>
        <Loader color="cyan" size="xl" mt={30} />
      </Center>
    );
  }

  if (noListings) {
    return (
      <Flex mt={20} direction="column" align="center" gap={20}>
        <Box mt={20}>
          <IconMoodSad color="gray" size={100} />
        </Box>
        <Title my={10} c="gray">
          No Listings Found
        </Title>
        <Button
          onClick={() => navigate('/create-listing')}
          variant="filled"
          color="blue"
          size="lg"
          fz={20}
        >
          Create A Listing
        </Button>
      </Flex>
    );
  }

  return (
     <Box>
        {/* Create button and filters at top */}
        <Flex direction="column" gap="md" mb="md">
          <FilterBar searchParams={urlSearchParams} updateSearchParam={updateSearchParam} isMobile={isMobile} />
          <Button
            component={Link}
            to="/create-listing"
            mx="auto"
            variant="outline"
            color="green"
            size="md"
            fz={20}
            rightSection={<IconCards />}
          >
            Create A New Listing
          </Button>
          
        </Flex>

        <AnimatePresence mode="wait">
          {selectedId ? (
            <MyListingsSplitView
              displayListings={displayListings}
              handleEditListing={handleEditListing}
              handleBackToAll={handleBackToAll}
              selectedId={selectedId}
              onDelete={handleDelete}
              onUpdate={handleUpdate}
            />
          ) : (
            // FULL WIDTH GRID - Default view
            <MyListingsDefaultView
              isLoading={isLoading}
              noListings={noListings}
              displayListings={displayListings}
              totalCurrentListings={totalCurrentListings}
              handleEditListing={handleEditListing}
              onDelete={handleDelete}
            />
          )}
        </AnimatePresence>
      </Box>
  );
}
