import { useEffect, useState } from 'react';
import { IconMoodSad } from '@tabler/icons-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Button, Center, Flex, Loader, Stack, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import ListingCard from '@/components/ListingCard';
import { ViewDetailsAction } from '@/components/ListingActions/ViewDetailsAction';
import { SocialShareActions } from '@/components/ListingActions/SocialShareActions';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';

export function FavoriteListings() {
  const [favorites, setFavorites] = useState<TListing[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const user = useSelector((state: RootState) => state.userSlice.user);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 500px)');

  useEffect(() => {
    const fetchFavorites = async () => {
      if (!user?._id) {
        setIsLoading(false);
        return;
      }

      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(
          `${API_BASE_URL}/api/listings/favorites/${user._id}`
        );
        setFavorites(response.data);
      } catch (error: any) {
        console.error('Error fetching favorites:', error);
        setFavorites([]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [user?._id]);

  if (isLoading) {
    return (
      <Center>
        <Loader color="cyan" size="xl" mt={30} />
      </Center>
    );
  }

  if (favorites.length === 0) {
    return (
      <Flex mt={20} direction="column" align="center" gap={20}>
        <Box mt={20}>
          <IconMoodSad color="gray" size={100} />
        </Box>
        <Title my={10} c="gray">
          No Favorites Found
        </Title>
        <Button
          onClick={() => navigate('/search')}
          variant="filled"
          color="blue"
          size="lg"
          fz={20}
        >
          Find Some Favorites
        </Button>
      </Flex>
    );
  }

  return (
    <Flex mt={20} direction="column" align="center" gap={20}>
      <Title>Favorites</Title>

      <Flex
        wrap="wrap"
        gap="lg"
        align="stretch"
        justify="center"
        w={isMobile ? '100%' : '80%'}
      >
        {favorites.map((listing) => (
          <ListingCard
            key={listing._id}
            listing={listing}
            actions={
              <Stack gap="xs">
                <ViewDetailsAction listingId={listing._id} />
                <SocialShareActions listing={listing} />
              </Stack>
            }
          />
        ))}
      </Flex>
    </Flex>
  );
}
