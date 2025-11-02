import { Group } from '@mantine/core';
import { FavoritesButton } from '@/components/Buttons/FavoritesButton';
import SocialIcons from '@/components/SocialMedia';
import { TListing } from '@/Types';

type SocialShareActionsProps = {
  listing: TListing;
};

export function SocialShareActions({ listing }: SocialShareActionsProps) {
  return (
    <Group grow>
      <FavoritesButton listing={listing} />
      <SocialIcons listingID={listing._id} />
    </Group>
  );
}
