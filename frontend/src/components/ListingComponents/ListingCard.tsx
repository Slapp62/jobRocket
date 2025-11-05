import React from 'react';
import { Badge, Box, Card, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { motion } from 'framer-motion';
import { TListing } from '@/Types';
import styles from './ListingCard.module.css';

type ListingCardProps = {
  listing: TListing;
  actions?: React.ReactNode;
  onClick?: () => void;
  width?: string | number;
  mobileWidth?: string | number;
  height?: string | number;
  mobileHeight?: string | number;
  disableHoverEffect?: boolean;
};

function ListingCard({ listing, actions, onClick, width, mobileWidth, height, mobileHeight, disableHoverEffect }: ListingCardProps) {
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ cursor: onClick ? 'pointer' : 'default' }}
      style={{ width: isMobile ? mobileWidth : width, height: isMobile ? mobileHeight : height || '100%' }}
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
        className={disableHoverEffect ? undefined : styles.hover}
      >
        <Stack gap="sm" style={{ flex: 1 }}>
          {/* Company Name */}
          

          {/* Job Title */}
          <Text fw={600} size="lg" lineClamp={2} mt={-8}>
            {listing.jobTitle}
          </Text>
          
          <Text fw={700} size="md" c="dimmed">
            {listing.companyName}
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
