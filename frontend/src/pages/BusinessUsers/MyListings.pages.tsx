import { IconCards, IconMoodSad } from '@tabler/icons-react';
import axios from 'axios';
import { AnimatePresence } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Box, Button, Center, Flex, Skeleton, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { FilterBar } from '@/components/Filters/FilterBar';
import MyListingsDefaultView from '@/components/ListingComponents/Views/MyListingsDefaultView';
import MyListingsSplitView from '@/components/ListingComponents/Views/MyListingsSplitView';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';
import { getParamsInfo } from '@/utils/getParamsInfo';

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
    handleBackToAll,
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

      notifications.show({
        title: 'Success',
        message: 'Listing deleted successfully',
        color: 'green',
      });

      // If we're viewing the deleted listing, go back to all listings
      if (selectedId === listingId) {
        handleBackToAll();
      }

      // Refresh the page to reload listings
      window.location.reload();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: 'Failed to delete listing',
        color: 'red',
      });
      throw error;
    }
  };

  const handleUpdate = () => {
    // Refresh the page to reload updated listings
    window.location.reload();
  };

  if (isLoading) {
    return (
      <Flex direction="column" align="center" mx="auto" gap={20} py="md" w="90vw">
        <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w="90%" mx="auto">
          {Array.from({ length: 6 }).map((_, i) => (
            <Box key={i} style={{ width: isMobile ? '95vw' : '300px' }}>
              <Skeleton height={280} radius="md" />
            </Box>
          ))}
        </Flex>
      </Flex>
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
    <>
      <PageMeta
        title="My Job Listings | JobRocket"
        description="Manage your company's job postings on JobRocket"
        keywords="employer dashboard, manage job postings, business listings"
      />

      <Box>
        {/* Create button and filters at top */}
        <Flex direction="column" gap="md" mb="md">
          <FilterBar
            searchParams={urlSearchParams}
            updateSearchParam={updateSearchParam}
            isMobile={isMobile}
          />
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
    </>
  );
}
