import React from 'react';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { Badge, Box, Button, Card, Flex, Group, Modal, Skeleton, Text } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { useDeleteListing } from '@/hooks/UseDeleteListing';
import { RootState } from '@/store/store';
import { FavoritesButton } from './Buttons/FavoritesButton';
import SocialIcons from './SocialMedia';

function ListingCard({ listingID }: { listingID: string }) {
  const listing = useSelector((state: RootState) =>
    state.listingSlice.listings?.find((item) => item._id === listingID)
  );
  const isLoading = useSelector((state: RootState) => state.listingSlice.loading);
  if (!listing) {
    return null;
  }

  const [opened, { open, close }] = useDisclosure(false);

  const deleteListing = useDeleteListing();
  const location = useLocation();
  const myListingsPage = location.pathname === '/my-listings';
  const loggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const isMobile = useMediaQuery('(max-width: 500px)');

  return (
    <motion.div
      key={listing._id}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true, amount: 0.2 }}
      style={{ width: isMobile ? '90%' : '320px' }}
    >
      <Card shadow="sm" radius="md" withBorder>
        <Skeleton visible={isLoading}>
          <Box p={5}>
            <Text fw={600} size="lg" lineClamp={2}>
              {listing.jobTitle}
            </Text>
            <Group>
              <Badge variant="filled" color="teal">
                {listing.workArrangement}
              </Badge>
              <Badge variant="filled" color="blue">
                {listing.industry}
              </Badge>
            </Group>

            <Flex mt="sm" direction="column" gap={4}>
              <Text size="sm">
                <strong>Location:</strong> {listing.location.region}, {listing.location.city}
              </Text>
              <Text size="sm">
                <strong>Apply via:</strong>{' '}
                {listing.apply.method === 'email' ? 'Email' : 'External Link'}
              </Text>
            </Flex>

            {listing.createdAt && (
              <Text fw={500} size="xs" mt={10}>
                Posted on: {new Date(listing.createdAt).toLocaleDateString()}
              </Text>
            )}
          </Box>

          <Flex mx="auto" my={10} gap={5} direction="column">
            <Group justify="center">
              <Button
                h={40}
                style={{ flex: 1 }}
                variant="filled"
                fz={12}
                component={Link}
                to={`/listing-details/${listing._id}`}
              >
                <Text fw="bold">More Info</Text>
              </Button>
            </Group>

            <Group justify="center">
              {loggedIn && myListingsPage && (
                <Button
                  variant="outline"
                  color="green"
                  style={{ flex: 1 }}
                  component={Link}
                  to={`/edit-listing/${listing._id}`}
                >
                  <IconEdit />
                </Button>
              )}

              {myListingsPage && (
                <Button variant="outline" style={{ flex: 1 }} color="red" onClick={open}>
                  <IconTrash />
                </Button>
              )}
            </Group>

            <Group>
              {loggedIn && <FavoritesButton listing={listing} />}

              <Group mx="auto">
                <SocialIcons listingID={listing._id} />
              </Group>
            </Group>
          </Flex>
        </Skeleton>
      </Card>

      <Modal centered opened={opened} onClose={close} title="Confirmation">
        <Text>Are you sure you want to delete this listing?</Text>
        <Group mt={20} justify="center">
          <Button
            color="red"
            onClick={() => {
              deleteListing(listing);
              close();
            }}
          >
            Yes, Delete It
          </Button>
          <Button variant="outline" onClick={close}>
            No, Take Me Back
          </Button>
        </Group>
      </Modal>
    </motion.div>
  );
}

export default React.memo(ListingCard, (prev, next) => prev.listingID === next.listingID);
