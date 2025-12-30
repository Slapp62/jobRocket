import { useEffect, useState } from 'react';
import { IconArrowBack } from '@tabler/icons-react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import {
  Anchor,
  Badge,
  Box,
  Button,
  Card,
  Divider,
  Group,
  List,
  Loader,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { FavoritesButton } from '@/components/ListingActions/FavoritesButton';
import SocialIcons from '@/components/SocialIcons';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';
import { formatDate } from '@/utils/dateUtils';
import { formatRegionForDisplay } from '@/utils/formatters';
import { ApplicationModal } from '../../Modals/applicationModal';

type ListingDetailPanelProps = {
  listingId: string;
  listing?: TListing;
};

export function ListingDetailsPanel({
  listingId,
  listing: providedListing,
}: ListingDetailPanelProps) {
  const [listing, setListing] = useState<TListing | null>(providedListing || null);
  const [isLoading, setIsLoading] = useState(!providedListing);
  const [showLoader, setShowLoader] = useState(false);
  const user = useSelector((state: RootState) => state.userSlice.user);
  const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 768px)');

  useEffect(() => {
    // If listing is already provided, skip API call
    if (providedListing) {
      setListing(providedListing);
      setIsLoading(false);
      return;
    }

    // Otherwise, fetch from API
    const fetchListing = async () => {
      setIsLoading(true);
      setShowLoader(false);

      // Delay showing loader by 300ms - only show if request is slow
      const loaderTimer = setTimeout(() => {
        setShowLoader(true);
      }, 300);

      try {
        const response = await axios.get(`/api/listings/${listingId}`);
        setListing(response.data);
        clearTimeout(loaderTimer);
      } catch (error: any) {
        notifications.show({
          title: 'Error',
          message: 'Failed to load listing details',
          color: 'red',
        });
        setListing(null);
        clearTimeout(loaderTimer);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [listingId, providedListing]);

  // Show loader only if loading takes longer than 300ms
  if (isLoading && showLoader) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Box ta="center" py={50}>
          <Loader size="lg" />
        </Box>
      </motion.div>
    );
  }

  // Still loading but don't show loader yet (prevents flash)
  if (isLoading && !showLoader) {
    return null;
  }

  if (!listing) {
    return (
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
        <Box ta="center" py={50}>
          <Text c="dimmed">Failed to load listing</Text>
        </Box>
      </motion.div>
    );
  }

  // Wrap entire content in fade-in animation
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
    >
      <Card shadow="sm" radius="md" withBorder p="lg" h="100%">
        <Stack gap="md">
          {isMobile && (
            <Button
              variant="outline"
              leftSection={<IconArrowBack />}
              onClick={() => window.history.back()}
            >
              Go Back
            </Button>
          )}
          {/* Header */}
          <Box>
            <Text fw={700} size="lg" c="dimmed" mb={5}>
              {listing.companyName}
            </Text>
            <Title order={2} mb="xs">
              {listing.jobTitle}
            </Title>
            <Group gap="xs">
              <Badge variant="filled" color="rocketDark.4" size="md" c="white">
                {listing.workArrangement}
              </Badge>
            </Group>

            <Group justify="start" align="center" gap="xs" mt="sm">
              {listing.apply.method.jobRocketSystem && (
                <Button
                  variant="filled"
                  color="rocketOrange"
                  onClick={open}
                  w={{ base: '100%', md: '30%' }}
                >
                  Apply
                </Button>
              )}

              {listing.apply.method.email && (
                <Anchor
                  href={`mailto:${listing.apply.contact.email}`}
                  style={{ textDecoration: 'none', width: isMobile ? '100%' : '30%' }}
                >
                  <Button variant="filled" color="rocketOrange" fullWidth>
                    Email
                  </Button>
                </Anchor>
              )}

              {listing.apply.method.companySystem && (
                <Anchor
                  href={listing.apply.contact.link}
                  target="_blank"
                  style={{ textDecoration: 'none', width: isMobile ? '100%' : '30%' }}
                >
                  <Button variant="filled" color="rocketOrange" fullWidth>
                    Apply Externally
                  </Button>
                </Anchor>
              )}

              <SocialIcons listing={listing} />
              <ApplicationModal
                opened={opened}
                onClose={close}
                listingID={listing._id}
                jobTitle={listing.jobTitle}
              />
            </Group>
          </Box>

          <Divider />

          {/* Location */}
          <Box>
            <Text fw={600} size="sm" mb={5}>
              Location
            </Text>
            <Text size="sm">
              {listing.location.city}, {formatRegionForDisplay(listing.location.region)}
            </Text>
          </Box>

          {/* Description */}
          <Box>
            <Text fw={600} size="sm" mb={5}>
              Job Description
            </Text>
            <Text size="sm" style={{ whiteSpace: 'pre-wrap' }}>
              {listing.jobDescription}
            </Text>
          </Box>

          {/* Requirements */}
          {listing.requirements && listing.requirements.length > 0 && (
            <Box>
              <Text fw={600} size="sm" mb={5}>
                Requirements
              </Text>
              <List size="sm" spacing="xs">
                {listing.requirements.map((req, idx) => (
                  <List.Item key={idx}>{req}</List.Item>
                ))}
              </List>
            </Box>
          )}

          {/* Advantages */}
          {listing.advantages && listing.advantages.length > 0 && (
            <Box>
              <Text fw={600} size="sm" mb={5}>
                Advantages
              </Text>
              <List size="sm" spacing="xs">
                {listing.advantages.map((adv, idx) => (
                  <List.Item key={idx}>{adv}</List.Item>
                ))}
              </List>
            </Box>
          )}

          <Divider />

          {/* Actions */}
          {user && (
            <Group mt="auto" grow>
              <SocialIcons listing={listing} />
            </Group>
          )}

          {/* Posted Date */}
          {listing.createdAt && (
            <Text size="xs" c="dimmed" ta="center">
              Posted on {formatDate(listing.createdAt)}
            </Text>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}

export default ListingDetailsPanel;
