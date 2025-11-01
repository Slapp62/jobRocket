import { Flex } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { TListing } from '@/Types';
import ListingCard from './ListingCard';

function MappedListings(props: { listings: TListing[] }) {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <Flex wrap="wrap" gap="lg" align="stretch" justify="center" w={isMobile ? '100%' : '80%'}>
      {props.listings.map((listing: TListing) => (
        <ListingCard key={listing._id} listingID={listing._id} />
      ))}
    </Flex>
  );
}

export default MappedListings;
