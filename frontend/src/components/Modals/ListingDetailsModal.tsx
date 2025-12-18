import { Anchor, Badge, Box, Divider, Group, List, Modal, Stack, Text, Title } from '@mantine/core';
import { TListing } from '@/Types';
import { formatRegionForDisplay } from '@/utils/formatters';
import styles from '@/styles/gradients.module.css';

type ListingDetailsModalProps = {
  opened: boolean;
  onClose: () => void;
  listing: TListing | null;
};

export const ListingDetailsModal = ({ opened, onClose, listing }: ListingDetailsModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Listing Details"
      size="lg"
      centered
      zIndex={1000}
    >
      {listing && (
        <Stack gap="md" h="100%">
          {/* Header */}
          <Box
            p="md"
            className={styles.cardGradientSubtle}
            style={{
              borderRadius: '8px',
              marginTop: '-16px',
              marginLeft: '-16px',
              marginRight: '-16px'
            }}
          >
            <Text fw={700} size="lg" c="dimmed" mb={5}>
              {listing.companyName}
            </Text>
            <Title order={2} mb="xs">
              {listing.jobTitle}
            </Title>
            <Group gap="xs">
              <Badge variant="filled" color="rocketOrange">
                {listing.workArrangement}
              </Badge>
            </Group>
          </Box>

          <Divider />

          {/* Location */}
          {listing.location && (
            <Box>
              <Text fw={600} size="sm" mb={5}>
                Location
              </Text>
              <Text size="sm">
                {listing.location.city}, {formatRegionForDisplay(listing.location.region)}
              </Text>
            </Box>
          )}

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
          {listing.apply && (
            <Box>
              <Text fw={600} size="sm" mb={5}>
                How to Apply
              </Text>
              {listing.apply.method.jobRocketSystem && (
                <Text size="sm">Apply through JobRocket's internal system</Text>
              )}
              {listing.apply.method.email && (
                <>
                  <Text size="sm" mb={5}>
                    Apply via email:
                  </Text>
                  <Anchor href={`mailto:${listing.apply.contact.email}`} target="_blank">
                    {listing.apply.contact.email}
                  </Anchor>
                </>
              )}
              {listing.apply.method.companySystem && (
                <>
                  <Text size="sm" mb={5}>
                    Apply via external link:
                  </Text>
                  <Anchor href={listing.apply.contact.link} target="_blank">
                    {listing.apply.contact.link}
                  </Anchor>
                </>
              )}
            </Box>
          )}

          {/* Posted Date */}
          {listing.createdAt && (
            <Text size="xs" c="dimmed" ta="center">
              Posted on {new Date(listing.createdAt).toLocaleDateString()}
            </Text>
          )}
        </Stack>
      )}
    </Modal>
  );
};
