import { IconBrandLinkedin, IconBrandWhatsapp, IconBrandX } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';
import { TListing } from '@/Types';
import { FavoritesButton } from './ListingActions/FavoritesButton';

const SocialIcons = (props: { listing: TListing }) => {
  const listingUrl = `${window.location.origin}/listing-details/${props.listing._id}`;
  const shareText = `Check out this job listing: ${listingUrl}`;
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}`;
  const linkedInUrl =
    `https://www.linkedin.com/sharing/share-offsite/?` + `url=${encodeURIComponent(shareText)}`;
  const xUrl =
    `https://twitter.com/intent/tweet?` +
    `text=${encodeURIComponent(shareText)}` +
    `&url=${encodeURIComponent(listingUrl)}`;

  return (
    <>
      {/* ACCESSIBILITY: Social sharing buttons need aria-labels for screen readers */}
      <ActionIcon
        size={40}
        variant="light"
        color="rocketRed"
        onClick={() => window.open(linkedInUrl, '_blank')}
        aria-label="Share on LinkedIn"
      >
        <IconBrandLinkedin aria-hidden="true" />
      </ActionIcon>

      <ActionIcon
        size={40}
        variant="light"
        color="rocketRed"
        onClick={() => window.open(whatsappUrl, '_blank')}
        aria-label="Share on WhatsApp"
      >
        <IconBrandWhatsapp aria-hidden="true" />
      </ActionIcon>

      <ActionIcon
        size={40}
        variant="light"
        color="rocketRed"
        onClick={() => window.open(xUrl, '_blank')}
        aria-label="Share on X (Twitter)"
      >
        <IconBrandX aria-hidden="true" />
      </ActionIcon>

      <FavoritesButton listing={props.listing} />
    </>
  );
};

export default SocialIcons;
