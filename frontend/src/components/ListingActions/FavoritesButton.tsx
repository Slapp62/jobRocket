import { useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ActionIcon } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';

interface FavoritesButtonProps {
  listing: TListing;
  width?: string;
}

export function FavoritesButton({ listing, width }: FavoritesButtonProps) {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [isLiked, setIsLiked] = useState(listing.likes?.includes(user?._id || '') || false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {return null;}

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card onClick from firing

    setIsLoading(true);

    // Optimistic update
    const previousState = isLiked;
    setIsLiked(!isLiked);

    try {
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      const API_BASE_URL = import.meta.env.VITE_API_URL;

      await axios.post(
        `${API_BASE_URL}/api/listings/${listing._id}/like`,
        {},
        { headers: { 'x-auth-token': token } }
      );
      notifications.show({
        title: 'Success',
        message: 'Favorite updated successfully',
        color: 'green',
      });
    } catch (error) {
      // Rollback on failure
      setIsLiked(previousState);
      notifications.show({
        title: 'Error',
        message: 'Failed to update favorite',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ActionIcon
      variant="light"
      color="red"
      size={40}
      onClick={handleToggleLike}
      style={{ flex: 1 }}
      w={width}
    >
      {isLiked ? <IconHeartFilled /> : <IconHeart />}
    </ActionIcon>
  );
}
