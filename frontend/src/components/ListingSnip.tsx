import React from 'react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { useMediaQuery } from '@mantine/hooks';
import { RootState } from '@/store/store';
import { Badge, Card, Flex, Group, Text, Title } from '@mantine/core';
import { Link } from 'react-router-dom';
import style from './ListingSnip.module.css';
import { IconMapPin } from '@tabler/icons-react';

function ListingSnip({ listingID }: { listingID: string }) {
  const listing = useSelector((state: RootState) =>
    state.listingSlice.listings?.find((item) => item._id === listingID)
  );
  if (!listing) {
    return null;
  }

  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <motion.div
      key={listing._id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ width: isMobile ? '90%' : '25vw' }}
    >
      <Card withBorder shadow="sm" radius="md" component={Link} to={`/listing/${listing._id}`} className={style.hover} h='100%'>
        <Title order={4}>{listing.jobTitle}</Title>

        <Group gap={5}>
          {<IconMapPin size={18}/>}
          <Text>
            {listing.location.region}, {listing.location.city}
          </Text>
        </Group>

        <Flex gap={10} my={10}>
          <Badge>{listing.industry}</Badge>
          <Badge>{listing.workArrangement}</Badge>
        </Flex>
        {listing.createdAt && (
          <Text>
            Posted: {new Date(listing.createdAt).toLocaleDateString()}
          </Text>
        )}
      </Card>
    </motion.div>
  );
}

export default React.memo(ListingSnip, (prev, next) => prev.listingID === next.listingID);
