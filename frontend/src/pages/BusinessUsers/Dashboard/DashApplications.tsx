import {
  IconBriefcase,
  IconChecks,
  IconClock,
  IconFileText,
  IconPencil,
  IconTrash,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { ActionIcon, Anchor, Badge, Card, Center, defaultOptionsFilter, Flex, Group, Paper, Select, Stack, Table, Text, ThemeIcon, Title } from '@mantine/core';
import { TBusinessDashboard } from '@/Types';
import { updateApplicationStatus } from './dashboardApi';
import { notifications } from '@mantine/notifications';
import INDUSTRIES from '@/data/industries';

interface DashApplicationsProps {
  dashApplications?: TBusinessDashboard['applications'];
  onStatusChange: (applicationId: string, newStatus: string | null) => void;
  statusFilter: string | null;
  onFilterChange: (status:string | null) => void;
  listingFilter: string | null;
  onListingFilterChange: (status:string | null) => void;
  listingOptions?: { value: string; label: string; }[];
}

export const DashApplications = (
  { dashApplications, onStatusChange, statusFilter, onFilterChange, listingFilter, onListingFilterChange, listingOptions }: DashApplicationsProps) => {

  return (
    <Stack>
      <Group justify='center'>
        <Select 
          w={200}
          value={statusFilter}
          onChange={(value)=>onFilterChange(value)}
          data={[
            {value:'all', label: "All Statuses"},
            {value:'pending', label: "Pending"},
            {value:'reviewed', label: "Reviewed"},
            {value:'rejected', label: "Rejected"},
          ]}
        />
        <Select 
          w={200}
          value={listingFilter}
          onChange={(value)=>onListingFilterChange(value)}
          data={listingOptions}
        />
      </Group>
      {dashApplications?.length === 0 ? 
        <Center mt={50}>
          <Title order={3} c='red'>No Applications Found</Title>
        </Center> 
      : <Table.ScrollContainer minWidth={900}>
      <Table verticalSpacing="sm" maw="100%" mx="auto">
        <Table.Thead>
          <Table.Tr>
            <Table.Th />
            <Table.Th>Applicant</Table.Th>
            <Table.Th>Listing</Table.Th>
            <Table.Th>Phone</Table.Th>
            <Table.Th>Email</Table.Th>
            <Table.Th>Submitted</Table.Th>
            <Table.Th>Resume</Table.Th>
            <Table.Th>Delete</Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {dashApplications?.map((app) => (
            <Table.Tr key={app._id}>
              <Table.Td
                styles={{ td: { borderLeft: '1px solid #eee', borderRight: '1px solid #eee' } }}
              >
                <Text fz="sm" fw="bold" c="dimmed" ta="center">
                  {dashApplications.indexOf(app) + 1}
                </Text>
              </Table.Td>

              <Table.Td>
                <Text fz="sm" fw={500}>
                  {app.firstName} {app.lastName}
                </Text>
              </Table.Td>

              <Table.Td>
                <Text fz="sm" fw={500}>
                  {typeof app.listingId === 'object' && app.listingId.jobTitle}
                </Text>
              </Table.Td>

              <Table.Td>
                <Text fz="sm" fw={500}>
                  {app.phone}
                </Text>
              </Table.Td>

              <Table.Td>
                <Text fz="sm">
                  {app.email}
                </Text>
              </Table.Td>
              
              <Table.Td>
                {app.createdAt && new Date(app.createdAt).toLocaleString()}
              </Table.Td>

              <Table.Td>
                <Anchor>Resume</Anchor>
              </Table.Td>
              
              <Table.Td>
                <Text fz="sm" c={
                  app.status === "reviewed" ? 'green' 
                  : app.status === "rejected" ? 'red' 
                  : 'orange'
                }>{
                  app.status === "reviewed" ? 'Reviewed' 
                  : app.status === "rejected" ? 'Rejected' 
                  : 'Pending'}
                </Text>
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
    </Table.ScrollContainer>}
    </Stack>
  );
};
