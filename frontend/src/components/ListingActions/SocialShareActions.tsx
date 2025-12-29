import { Group } from '@mantine/core';
import { FavoritesButton } from '@/components/ListingActions/FavoritesButton';
import SocialIcons from '@/components/SocialIcons';
import { TListing } from '@/Types';

type SocialShareActionsProps = {
  listing: TListing;
};

export function SocialShareActions({ listing }: SocialShareActionsProps) {
  return (
    <Group grow>
      <FavoritesButton listing={listing} />
      <SocialIcons listing={listing} />
    </Group>
  );
}
