import {
  IconDashboard,
  IconDownload,
  IconFileDownload,
  IconPdf,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react';
import { ActionIcon, Anchor, Center, Group, Select, Stack, Table, Text, TextInput, Title } from '@mantine/core';
import { TApplication } from '@/Types';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { DeleteApplicationModal } from '../modals/DeleteApplicationModal';

interface DashApplicationsProps {
  dashApplications?: TApplication[];
  searchText: string;
  setSearchText: (searchText: string) => void;
  status: string | null;
  setStatus: (status: string | null) => void;
  listingId: string | null;
  setListingId: (listingId: string | null) => void;
  dateFrom: string | null;
  setDateFrom: (dateFrom: string | null) => void;
  dateTo: string | null;
  setDateTo: (dateTo: string | null) => void;
  sortOption: string | null;
  setSortOption: (sortOption: string | null) => void;
  page: number;
  setPage: (page: number) => void;
  onStatusChange: (applicationId: string, newStatus: string | null) => void;
  listingOptions: { value: string; label: string }[];
  updateApplicationStatus: (applicationId: string, newStatus: string | null) => void;
  newStatus: string | null;
  setNewStatus: (newStatus: string | null) => void;
  handleApplicationDelete: (applicationId: string) => Promise<void>;
}

export const DashApplications = (
  { dashApplications, searchText, setSearchText, status, setStatus, listingId, setListingId, dateFrom, setDateFrom, dateTo, setDateTo, sortOption, setSortOption, page, setPage, onStatusChange, listingOptions, updateApplicationStatus, newStatus, setNewStatus, handleApplicationDelete }: DashApplicationsProps) => {

  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [applicationDelete, setApplicationDelete] = useState<{id: string, title: string} | null>(null);
  
  const handleDeleteApplication = (id: string, title: string) => {
    setApplicationDelete({ id, title });
    openDelete();
  };
    
  return (
    <>
      <Stack>
      <Group justify='center' align='center'>
        <Select 
          label="Listing"
          w='15%'
          value={listingId}
          onChange={(value)=>setListingId(value)}
          data={listingOptions}
        />
        <TextInput
          type="date"
          label="From"
          value={dateFrom || ''}
          onChange={(e) => setDateFrom(e.target.value)}
          w='15%'
        />
        <TextInput
          type="date"
          label="To"
          value={dateTo || ''}
          onChange={(e) => setDateTo(e.target.value)}
          w='15%'
        />
        <Select 
          label="Status"
          w='15%'
          value={status}
          onChange={(value)=>setStatus(value)}
          data={[
            {value:'all', label: "All Statuses"},
            {value:'pending', label: "Pending"},
            {value:'reviewed', label: "Reviewed"},
            {value:'rejected', label: "Rejected"},
          ]}
        />
        <TextInput
          label="Search"
          w='15%'
          value={searchText}
          onChange={(e)=>setSearchText(e.target.value)}
          placeholder="Search applications..."
        />
        <Select
          label="Sort"
          w='15%'
          value={sortOption}
          onChange={(value)=>setSortOption(value)}
          data={[
            {value:'date-newest', label: "Newest First"},
            {value:'date-oldest', label: "Oldest First"},
            {value:'name-asc', label: "Name (A-Z)"},
            {value:'name-desc', label: "Name (Z-A)"},
          ]}
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
            <Table.Th>Status</Table.Th>
            <Table.Th>Actions</Table.Th>
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
                <Anchor href={app.resume} target="_blank" ><IconFileDownload size={30} /></Anchor>
              </Table.Td>
              
              <Table.Td>
                <Select
                  px={5}
                  value={newStatus || app.status}
                  onChange={(value) => updateApplicationStatus(app._id, value)}
                  data={[
                    { value: 'pending', label: 'Pending' },
                    { value: 'reviewed', label: 'Reviewed' },
                    { value: 'rejected', label: 'Rejected' },
                  ]}
                />
              </Table.Td>

              <Table.Td styles={{ td: { borderRight: '1px solid #eee' } }}>
                <Group gap="xs">
                  <ActionIcon
                    size={30}
                    variant="outline"
                    color="red"
                    onClick={()=>{handleDeleteApplication(app._id, `${typeof app.listingId === 'object' && app.listingId.jobTitle}`)}}
                  >
                    <IconTrash size={25} stroke={1.5} />
                  </ActionIcon>
                </Group>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Table.ScrollContainer>}
      </Stack>

      <DeleteApplicationModal 
        opened={deleteOpened} 
        onClose={closeDelete} 
        applicationId={applicationDelete?.id || ""} 
        applicationTitle={applicationDelete?.title || ""} 
        handleDelete={handleApplicationDelete} 
      />
    </>
  );
};
