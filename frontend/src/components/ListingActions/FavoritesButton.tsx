import { useState } from 'react';
import { IconHeart, IconHeartFilled } from '@tabler/icons-react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ActionIcon, MantineSize, StyleProp } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';
import { announceToScreenReader } from '@/utils/accessibility';
import { trackFavorite } from '@/utils/analytics';

interface FavoritesButtonProps {
  listing: TListing;
  height?: StyleProp<number | string>;
  width?: StyleProp<number | string>;
}

export function FavoritesButton({ listing, height, width }: FavoritesButtonProps) {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [isLiked, setIsLiked] = useState(listing.likes?.includes(user?._id || '') || false);
  const [isLoading, setIsLoading] = useState(false);

  if (!user) {
    return null;
  }

  const handleToggleLike = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card onClick from firing

    setIsLoading(true);

    // Optimistic update
    const previousState = isLiked;
    const newState = !isLiked;
    setIsLiked(newState);

    // ACCESSIBILITY: Announce the toggle action to screen readers
    const jobTitle = listing.jobTitle;
    announceToScreenReader(
      newState ? `Added ${jobTitle} to favorites` : `Removed ${jobTitle} from favorites`,
      'polite'
    );

    try {
      await axios.post(`/api/listings/${listing._id}/like`);

      // Track favorite action in Google Analytics
      trackFavorite(listing._id, newState ? 'add' : 'remove');

      notifications.show({
        title: 'Success',
        message: 'Favorite updated successfully',
        color: 'green',
      });
    } catch (error) {
      // Rollback on failure
      setIsLiked(previousState);

      // ACCESSIBILITY: Announce the error to screen readers
      announceToScreenReader('Failed to update favorite. Please try again.', 'assertive');

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
    // ACCESSIBILITY: Icon-only button needs descriptive aria-label
    // aria-pressed indicates toggle state for screen readers
    <ActionIcon
      variant="light"
      color="red"
      onClick={handleToggleLike}
      w={width || '40px'}
      h={height || '40px'}
      aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}
      aria-pressed={isLiked}
      disabled={isLoading}
    >
      {isLiked ? <IconHeartFilled size={24} aria-hidden="true" /> : <IconHeart size={24} aria-hidden="true" />}
    </ActionIcon>
  );
}
