import { useEffect, useState } from 'react';
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
import { notifications } from '@mantine/notifications';
import { FavoritesButton } from '@/components/ListingActions/FavoritesButton';
import SocialIcons from '@/components/SocialMedia';
import { RootState } from '@/store/store';
import { TListing } from '@/Types';

type ListingDetailPanelProps = {
  listingId: string;
};

export function ListingDetailsPanel({ listingId }: ListingDetailPanelProps) {
  const [listing, setListing] = useState<TListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showLoader, setShowLoader] = useState(false);
  const user = useSelector((state: RootState) => state.userSlice.user);

  useEffect(() => {
    const fetchListing = async () => {
      setIsLoading(true);
      setShowLoader(false);

      // Delay showing loader by 300ms - only show if request is slow
      const loaderTimer = setTimeout(() => {
        setShowLoader(true);
      }, 300);

      try {
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_BASE_URL}/api/listings/${listingId}`);
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
  }, [listingId]);

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
          {/* Header */}
          <Box>
            <Text fw={700} size="lg" c="dimmed" mb={5}>
              {listing.companyName}
            </Text>
            <Title order={2} mb="xs">
              {listing.jobTitle}
            </Title>
            <Group gap="xs">
              <Badge variant="filled" color="teal">
                {listing.workArrangement}
              </Badge>
              <Badge variant="filled" color="blue">
                {listing.industry}
              </Badge>
            </Group>
          </Box>

          <Divider />

          {/* Location */}
          <Box>
            <Text fw={600} size="sm" mb={5}>
              Location
            </Text>
            <Text size="sm">
              {listing.location.city}, {listing.location.region}
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

          {/* Application */}
          <Box>
            <Text fw={600} size="sm" mb={5}>
              How to Apply
            </Text>
            <Text size="sm" mb={5}>
              Apply via {listing.apply.method === 'email' ? 'email' : 'external link'}:
            </Text>
            {listing.apply.method === 'email' ? (
              <Anchor href={`mailto:${listing.apply.contact}`} target="_blank">
                {listing.apply.contact}
              </Anchor>
            ) : (
              <Anchor href={listing.apply.contact} target="_blank">
                {listing.apply.contact}
              </Anchor>
            )}
          </Box>

          {/* Actions */}
          {user && (
            <Group mt="auto" grow>
              <FavoritesButton listing={listing} />
              <SocialIcons listingID={listing._id} />
            </Group>
          )}

          {/* Posted Date */}
          {listing.createdAt && (
            <Text size="xs" c="dimmed" ta="center">
              Posted on {new Date(listing.createdAt).toLocaleDateString()}
            </Text>
          )}
        </Stack>
      </Card>
    </motion.div>
  );
}
