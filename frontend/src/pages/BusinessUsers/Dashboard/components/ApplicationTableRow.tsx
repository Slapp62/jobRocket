import { IconFileDownload, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Anchor, Group, Select, Table, Text } from '@mantine/core';
import { ApplicationMatchScore } from '@/components/AI_Components/ApplicationMatchScore';
import { TApplication } from '@/Types';
import { formatDate } from '@/utils/dateUtils';

interface ApplicationTableRowProps {
  application: TApplication;
  rowNumber: number;
  showListingTitle?: boolean;
  onStatusChange: (applicationId: string, newStatus: string | null) => void;
  onDelete: (applicationId: string, listingTitle: string) => void;
}

export const ApplicationTableRow = ({
  application,
  rowNumber,
  showListingTitle = true,
  onStatusChange,
  onDelete,
}: ApplicationTableRowProps) => {
  const listingTitle =
    typeof application.listingId === 'object' ? application.listingId.jobTitle : 'Unknown';

  return (
    <Table.Tr key={application._id}>
      <Table.Td
        styles={{
          td: { borderLeft: '1px solid #eee', borderRight: '1px solid #eee' },
        }}
      >
        <Text fz="sm" fw="bold" c="dimmed" ta="center">
          {rowNumber}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm" fw={500}>
          {application.firstName} {application.lastName}
        </Text>
      </Table.Td>

      {showListingTitle && (
        <Table.Td>
          <Text fz="sm" fw={500}>
            {listingTitle}
          </Text>
        </Table.Td>
      )}

      <Table.Td>
        <Text fz="sm" fw={500}>
          {application.phone}
        </Text>
      </Table.Td>

      <Table.Td>
        <Text fz="sm">{application.email}</Text>
      </Table.Td>

      <Table.Td>{application.createdAt && formatDate(application.createdAt)}</Table.Td>

      <Table.Td>
        <Anchor
          href={application.resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Download resume"
        >
          <IconFileDownload size={30} />
        </Anchor>
      </Table.Td>

      <Table.Td w={75}>
        <ApplicationMatchScore matchScore={application.matchScore} />
      </Table.Td>

      <Table.Td>
        <Select
          px={5}
          value={application.status}
          onChange={(value) => onStatusChange(application._id, value)}
          data={[
            { value: 'pending', label: 'Pending' },
            { value: 'reviewed', label: 'Reviewed' },
            { value: 'rejected', label: 'Rejected' },
          ]}
          aria-label="Application status"
        />
      </Table.Td>

      <Table.Td styles={{ td: { borderRight: '1px solid #eee' } }}>
        <Group gap="xs">
          <ActionIcon
            size={30}
            variant="outline"
            color="red"
            onClick={() => onDelete(application._id, listingTitle)}
            aria-label={`Delete application from ${application.firstName} ${application.lastName}`}
          >
            <IconTrash size={25} stroke={1.5} />
          </ActionIcon>
        </Group>
      </Table.Td>
    </Table.Tr>
  );
};
