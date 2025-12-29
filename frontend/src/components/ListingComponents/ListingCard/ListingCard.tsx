import React from 'react';
import { motion } from 'framer-motion';
import { Badge, Box, Button, Card, Stack, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { TListing } from '@/Types';
import { formatRegionForDisplay } from '@/utils/formatters';
import { formatDate } from '@/utils/dateUtils';
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
  handleSelectListing?: (listingId: string) => void;
};

function ListingCard({
  listing,
  actions,
  onClick,
  width,
  mobileWidth,
  height,
  mobileHeight,
  disableHoverEffect,
  handleSelectListing,
}: ListingCardProps) {
  const isMobile = useMediaQuery('(max-width: 726px)');

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ cursor: onClick ? 'pointer' : 'default' }}
      style={{
        width: isMobile ? mobileWidth : width,
        height: isMobile ? mobileHeight : height || '100%',
      }}
    >
      {/* ACCESSIBILITY: Make card keyboard-accessible when clickable
          Using component="button" makes it a semantic button for screen readers */}
      <Card
        shadow="sm"
        radius="md"
        w={{ base: '90vw', sm: '100%' }}
        withBorder
        style={{
          cursor: onClick ? 'pointer' : 'default',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          ...(onClick && {
            border: 'none',
            background: 'inherit',
            padding: 0,
            textAlign: 'left',
          }),
        }}
        onClick={onClick}
        className={disableHoverEffect ? undefined : styles.hover}
        component={onClick ? 'button' : 'div'}
        {...(onClick && {
          type: 'button',
          'aria-label': `View details for ${listing.jobTitle} at ${listing.companyName}`,
        })}
      >
        <Stack gap="sm" style={{ flex: 1 }} w="100%">
          {/* Job Title */}
          <Text fw={600} size="lg" lineClamp={2} mt={-8}>
            {listing.jobTitle}
          </Text>

          <Text fw={700} size="md" c="dimmed">
            {listing.companyName}
          </Text>
          {/* Badges */}
          <Box>
            <Badge variant="filled" color="rocketDark.4" c="white" mr="xs" size="md">
              {listing.workArrangement}
            </Badge>
          </Box>

          {/* Details */}
          <Stack gap={4}>
            <Text size="sm">
              <Text span fw={500}>
                Location:
              </Text>{' '}
              {formatRegionForDisplay(listing.location.region)}, {listing.location.city}
            </Text>
            <Text size="sm">
              <Text span fw={500}>
                Apply via:
              </Text>{' '}
              {listing.apply.method.jobRocketSystem
                ? 'JobRocket'
                : listing.apply.method.companySystem
                  ? 'External Link'
                  : 'Email'}
            </Text>
            {listing.createdAt && (
              <Text size="xs" c="dimmed">
                Posted {formatDate(listing.createdAt)}
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
