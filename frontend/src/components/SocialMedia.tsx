import { IconBrandLinkedin, IconBrandTwitter, IconBrandWhatsapp } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

const SocialIcons = (props: { listingID: string }) => {
  const listingUrl = `${window.location.origin}/listing-details/${props.listingID}`;
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
      <ActionIcon size={40} variant="light" color="indigo">
        <IconBrandLinkedin onClick={() => window.open(linkedInUrl, '_blank')} />
      </ActionIcon>

      <ActionIcon size={40} variant="light" color="indigo">
        <IconBrandWhatsapp onClick={() => window.open(whatsappUrl, '_blank')} />
      </ActionIcon>

      <ActionIcon size={40} variant="light" color="indigo">
        <IconBrandTwitter onClick={() => window.open(xUrl, '_blank')} />
      </ActionIcon>
    </>
  );
};

export default SocialIcons;
