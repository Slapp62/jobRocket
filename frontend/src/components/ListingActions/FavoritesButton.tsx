import { useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { toast } from 'react-toastify';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';

interface FavoritesButtonProps {
  listing: TListing;
  width?: string;
}

export function FavoritesButton({ listing, width}: FavoritesButtonProps) {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [isLiked, setIsLiked] = useState(
    listing.likes?.includes(user?._id || '') || false
  );
  const [isLoading, setIsLoading] = useState(false);

  if (!user) return null;
  
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
      toast.success('Favorite updated successfully');
    } catch (error) {
      // Rollback on failure
      setIsLiked(previousState);
      toast.error('Failed to update favorite');
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
