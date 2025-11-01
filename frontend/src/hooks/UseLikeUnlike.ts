import { useCallback } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addLike, removeLike } from '@/store/listingSlice';
import { TListing } from '@/Types';

export function useLikeUnlike() {
  const dispatch = useDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

  const toggleLike = useCallback(
    async (listing: TListing, userID: string, isLiked: boolean) => {
      // update Redux slice

      // update API
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');

        axios.defaults.headers.common['x-auth-token'] = token;
        const response = await axios.patch(`${API_BASE_URL}/api/listings/${listing._id}`);

        if (isLiked) {
          dispatch(removeLike({ listing: response.data, userID }));
          toast.warning('Listing unliked!');
        } else {
          dispatch(addLike({ listing: response.data, userID }));
          toast.success('Listing liked!');
        }
      } catch (error) {
        toast.error(`Error liking/unliking listing:${error}`);
      }

      return !isLiked;
    },
    [dispatch]
  );

  return toggleLike;
}
