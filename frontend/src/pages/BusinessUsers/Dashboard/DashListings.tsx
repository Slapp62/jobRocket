import { IconBriefcase, IconChecks, IconClock, IconPencil, IconTrash, IconUsers, IconX } from '@tabler/icons-react';
import { ActionIcon, Anchor, Card, Flex, Group, ListItem, Paper, Table, Text, ThemeIcon, Title } from '@mantine/core';
import { TBusinessDashboard } from '@/Types';
import { toggleAdminView } from '@/store/userSlice';

interface DashListingsProps {
  dashboardData?: TBusinessDashboard;
}

export const DashListings = ({ dashboardData }: DashListingsProps) => {
  return (
    <Table.ScrollContainer minWidth={800}>
      <Table verticalSpacing="sm" maw="100%" mx="auto">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Job Title</Table.Th>
            <Table.Th>Industry</Table.Th>
            <Table.Th>Created At</Table.Th>
            <Table.Th>Expires At</Table.Th>
            <Table.Th>Active</Table.Th>
            <Table.Th>Favorites</Table.Th>
            <Table.Th>Edit</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {dashboardData?.listings?.map((listing) => (
            <Table.Tr key={listing._id}>
              <Table.Td
                styles={{ td: { borderLeft: '1px solid #eee', borderRight: '1px solid #eee' } }}
              >
                <Text fz="sm" fw="bold" c="dimmed" ta="center">
                  {dashboardData.listings.indexOf(listing) + 1}
                </Text>
              </Table.Td>

              <Table.Td>
                <Text fz="sm" fw={500}>
                  {listing.jobTitle}
                </Text>
              </Table.Td>

              <Table.Td>
                <Text fz="sm" fw={500}>
                  {listing.industry}
                </Text>
              </Table.Td>

              <Table.Td>
                {listing.createdAt && new Date(listing.createdAt).toLocaleString()}
              </Table.Td>

              <Table.Td>
                <Text fz="sm">
                  {listing.expiresAt}
                </Text>
              </Table.Td>

              <Table.Td>
                <Text fz="sm">{listing.isActive}</Text>
              </Table.Td>
              
              <Table.Td>
                <Text fz="sm">{listing.likes?.length}</Text>
              </Table.Td>

              <Table.Td>
                <ActionIcon
                  size={30}
                  variant="outline"
                  color="yellow"
                  onClick={() => {}}
                >
                  <IconPencil size={25} stroke={1.5} />
                </ActionIcon>
              </Table.Td>

              <Table.Td styles={{ td: { borderRight: '1px solid #eee' } }}>
              <ActionIcon
                size={30}
                variant="outline"
                color="red"
                onClick={()=>{}}
              >
                <IconTrash size={25} stroke={1.5} />
              </ActionIcon>
            </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>
  );
};
