import { IconFileDownload, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Anchor, Card, Group, Select, Stack, Text } from '@mantine/core';
import { TApplication } from '@/Types';
import { formatDate } from '@/utils/dateUtils';

interface ApplicationCardProps {
  application: TApplication;
  showListingTitle?: boolean;
  onStatusChange: (applicationId: string, newStatus: string | null) => void;
  onDelete: (applicationId: string, listingTitle: string) => void;
}

export const ApplicationCard = ({
  application,
  showListingTitle = true,
  onStatusChange,
  onDelete,
}: ApplicationCardProps) => {
  const listingTitle =
    typeof application.listingId === 'object' ? application.listingId.jobTitle : 'Unknown';

  return (
    <Card withBorder p="md">
      <Stack gap="xs">
        <Group justify="space-between">
          <Text fw={600} size="lg">
            {application.firstName} {application.lastName}
          </Text>
          <ActionIcon
            size={36}
            variant="outline"
            color="red"
            onClick={() => onDelete(application._id, listingTitle)}
            aria-label={`Delete application from ${application.firstName} ${application.lastName}`}
          >
            <IconTrash size={20} />
          </ActionIcon>
        </Group>

        {showListingTitle && (
          <Text size="sm" c="dimmed">
            {listingTitle}
          </Text>
        )}

        <Text size="sm">{application.email}</Text>
        {application.phone && <Text size="sm">{application.phone}</Text>}

        <Text size="xs" c="dimmed">
          Submitted: {application.createdAt && formatDate(application.createdAt)}
        </Text>

        <Group gap="xs" mt="xs">
          <Anchor href={application.resumeUrl} target="_blank" rel="noopener noreferrer">
            <ActionIcon variant="light" size={36} aria-label="Download resume">
              <IconFileDownload size={20} />
            </ActionIcon>
          </Anchor>

          <Select
            flex={1}
            value={application.status}
            onChange={(value) => onStatusChange(application._id, value)}
            data={[
              { value: 'pending', label: 'Pending' },
              { value: 'reviewed', label: 'Reviewed' },
              { value: 'rejected', label: 'Rejected' },
            ]}
            aria-label="Application status"
          />
        </Group>
      </Stack>
    </Card>
  );
};
