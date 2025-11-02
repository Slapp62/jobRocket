import { useCallback } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { TListing } from '@/Types';

export function useLikeUnlike() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

  const toggleLike = useCallback(
    async (listing: TListing, userID: string, isLiked: boolean) => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        axios.defaults.headers.common['x-auth-token'] = token;
        const response = await axios.patch(`${API_BASE_URL}/api/listings/${listing._id}`);

        if (isLiked) {
          toast.warning('Listing unliked!');
        } else {
          toast.success('Listing liked!');
        }
      } catch (error) {
        toast.error(`Error liking/unliking listing:${error}`);
      }

      return !isLiked;
    },
    []
  );

  return toggleLike;
}
