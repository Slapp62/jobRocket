import { useEffect, useState } from 'react';
import { IconCards, IconMoodSad } from '@tabler/icons-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Box, Button, Center, Flex, Loader, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ListingCard from '@/components/ListingCard';
import { EditDeleteActions } from '@/components/ListingActions/EditDeleteActions';
import { ViewDetailsAction } from '@/components/ListingActions/ViewDetailsAction';
import { TListing } from '@/Types';

export function MyListings() {
  const [myListings, setMyListings] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 500px)');

  useEffect(() => {
    const fetchMyListings = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_URL;

        const response = await axios.get(`${API_BASE_URL}/api/listings/my-listings`, {
          headers: { 'x-auth-token': token },
        });

        setMyListings(response.data);
      } catch (error: any) {
        console.error('Error fetching my listings:', error);
        toast.error('Failed to load your listings');
        setMyListings([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMyListings();
  }, []);

  const handleDelete = async (listingId: string) => {
    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_URL;

      await axios.delete(`${API_BASE_URL}/api/listings/${listingId}`, {
        headers: { 'x-auth-token': token },
      });

      // Update local state - remove deleted listing
      setMyListings((prev) => prev.filter((listing) => listing._id !== listingId));
      toast.success('Listing deleted successfully');
    } catch (error: any) {
      toast.error('Failed to delete listing');
      throw error; // Re-throw so EditDeleteActions can handle loading state
    }
  };

  if (isLoading) {
    return (
      <Center>
        <Loader color="cyan" size="xl" mt={100} />
      </Center>
    );
  }

  if (myListings.length === 0) {
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
    <Flex mt={20} direction="column" align="center" gap={20}>
      <Title>My Listings</Title>

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

      <Flex
        wrap="wrap"
        gap="lg"
        align="stretch"
        justify="center"
        w={isMobile ? '100%' : '80%'}
      >
        {myListings.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
            actions={
              <Stack gap="xs">
                <ViewDetailsAction listingId={listing._id} />
                <EditDeleteActions
                  listingId={listing._id}
                  listingTitle={listing.jobTitle}
                  onDelete={() => handleDelete(listing._id)}
                />
              </Stack>
            }
          />
        ))}
      </Flex>
    </Flex>
  );
}
