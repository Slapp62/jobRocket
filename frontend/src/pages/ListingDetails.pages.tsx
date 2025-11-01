import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import {
  Anchor,
  Badge,
  Card,
  Container,
  Divider,
  Flex,
  Group,
  List,
  ListItem,
  Text,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { FavoritesButton } from '@/components/Buttons/FavoritesButton';
import SocialIcons from '@/components/SocialMedia';
import { RootState } from '@/store/store';

export function ListingDetails() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const { id } = useParams();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const allListings = useSelector((state: RootState) => state.listingSlice.listings);
  const listing = allListings.find((item) => item._id === id);

  if (!listing) {
    return (
      <Container style={{ width: isMobile ? '100%' : '40%' }}>
        <Title ta="center" my={20}>
          Listing not found
        </Title>
      </Container>
    );
  }

  return (
    <Container style={{ width: isMobile ? '100%' : '40%' }}>
      <Title ta="center" my={10}>
        Listing Details
      </Title>
      <Card shadow="sm" padding="lg" radius="md" withBorder mx="auto">
        <Flex direction="column" gap={10}>
          <Title order={2}>{listing?.jobTitle}</Title>
          <Group gap="xs">
            <Badge color="teal" variant="light">
              {listing?.workArrangement}
            </Badge>
            <Badge color="blue" variant="light">
              {listing?.industry}
            </Badge>
            {listing?.isActive === false && (
              <Badge color="red" variant="light">
                Inactive
              </Badge>
            )}
          </Group>

          {listing?.createdAt && (
            <Text size="sm" c="dimmed">
              Posted on {new Date(listing.createdAt).toLocaleDateString()}
            </Text>
          )}

          <Divider my="sm" />

          <Text size="sm">{listing?.jobDescription}</Text>

          {listing?.requirements && listing.requirements.length > 0 && (
            <>
              <Divider my="sm" />
              <Title order={4}>Requirements</Title>
              <List spacing={5} style={{ wordBreak: 'break-word' }}>
                {listing.requirements.map((item, index) => (
                  <ListItem key={`req-${index}`}>{item}</ListItem>
                ))}
              </List>
            </>
          )}

          {listing?.advantages && listing.advantages.length > 0 && (
            <>
              <Divider my="sm" />
              <Title order={4}>Nice to Have</Title>
              <List spacing={5} style={{ wordBreak: 'break-word' }}>
                {listing.advantages.map((item, index) => (
                  <ListItem key={`adv-${index}`}>{item}</ListItem>
                ))}
              </List>
            </>
          )}

          <Divider my="sm" />

          <Title order={4}>Location</Title>
          <Text size="sm">
            {listing?.location.region}, {listing?.location.city}
          </Text>

          <Divider my="sm" />

          <Title order={4}>How to Apply</Title>
          <Text size="sm">
            Submit via {listing?.apply.method === 'email' ? 'email' : 'external link'}:
          </Text>
          {listing?.apply.method === 'email' ? (
            <Anchor href={`mailto:${listing?.apply.contact}`} target="_blank">
              {listing?.apply.contact}
            </Anchor>
          ) : (
            <Anchor href={listing?.apply.contact} target="_blank">
              {listing?.apply.contact}
            </Anchor>
          )}
        </Flex>

        {user && (
          <Group my={20} justify="space-evenly">
            <FavoritesButton listing={listing} />
            <SocialIcons listingID={listing._id} />
          </Group>
        )}
      </Card>
    </Container>
  );
}
