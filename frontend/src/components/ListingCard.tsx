import React from 'react';
import { Badge, Box, Card, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { TListing } from '@/Types';

type ListingCardProps = {
  listing: TListing;
  actions?: React.ReactNode;
  onClick?: () => void;
};

function ListingCard({ listing, actions, onClick }: ListingCardProps) {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ width: isMobile ? '90%' : '320px' }}
    >
      <Card
        shadow="sm"
        radius="md"
        withBorder
        style={{
          cursor: onClick ? 'pointer' : 'default',
          height: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}
        onClick={onClick}
      >
        <Stack gap="sm" style={{ flex: 1 }}>
          {/* Job Title */}
          <Text fw={600} size="lg" lineClamp={2}>
            {listing.jobTitle}
          </Text>

          {/* Badges */}
          <Box>
            <Badge variant="filled" color="teal" mr="xs" size="sm">
              {listing.workArrangement}
            </Badge>
            <Badge variant="filled" color="blue" size="sm">
              {listing.industry}
            </Badge>
          </Box>

          {/* Details */}
          <Stack gap={4}>
            <Text size="sm">
              <Text span fw={500}>Location:</Text>{' '}
              {listing.location.region}, {listing.location.city}
            </Text>
            <Text size="sm">
              <Text span fw={500}>Apply via:</Text>{' '}
              {listing.apply.method === 'email' ? 'Email' : 'External Link'}
            </Text>
            {listing.createdAt && (
              <Text size="xs" c="dimmed">
                Posted {new Date(listing.createdAt).toLocaleDateString()}
              </Text>
            )}
          </Stack>

          {/* Actions - parent decides what goes here */}
          {actions && (
            <Box mt="auto" pt="md">
              {actions}
            </Box>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}

export default React.memo(ListingCard);
