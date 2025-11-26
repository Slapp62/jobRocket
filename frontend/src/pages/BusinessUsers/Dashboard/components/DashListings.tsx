import { IconCircle, IconCircleFilled, IconPencil, IconTrash } from '@tabler/icons-react';
import { ActionIcon, Group, Select, Stack, Table, Text, TextInput } from '@mantine/core';
import { TListing } from '@/Types';
import INDUSTRIES from '@/data/industries';
import { DeleteListingModal } from '../modals/DeleteListingModal';
import { useDisclosure } from '@mantine/hooks';
import { useState } from 'react';
import { EditListingModal } from '../modals/EditListingModal';

interface DashListingsProps {
  listings: TListing[];
  isLoading: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  industry: string | null;
  setIndustry: (industry: string | null) => void;
  sortOption: string | null;
  setSortOption: (sortOption: string | null) => void;
  activeFilter: string | null;
  setActiveFilter: (activeFilter: string | null) => void;
  page: number;
  setPage: (page: number) => void;
  handleEdit: (listingId: string) => Promise<void>;
  handleDelete: (listingId: string) => Promise<void>;
}

export const DashListings = ({ listings, handleDelete, handleEdit, searchText, setSearchText, industry, setIndustry, sortOption, setSortOption, activeFilter, setActiveFilter, page, setPage }: DashListingsProps) => {
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [listingDelete, setListingDelete] = useState<{id: string, title: string} | null>(null);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [listingEdit, setListingEdit] = useState<TListing>();

  const clickDeleteListing = (id: string, title: string) => {
    setListingDelete({ id, title });
    openDelete();
  };
  const clickEditListing = (listing: TListing) => {
    setListingEdit(listing);
    openEdit();
  };

  

  return (
    <>
      <Stack>
        <Group justify='center'>
          <TextInput
            label="Search listings"
            placeholder="Search listings"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <Select
            label="Sort by"
            placeholder="Select sort option"
            value={sortOption}
            onChange={(value) => {setSortOption(value)}}
            data={[
              { value: 'all', label: 'All Listings' },
              { value: 'date-created-new', label: 'Newest First' },
              { value: 'date-created-old', label: 'Oldest First' },
              { value: 'favorites-most', label: 'Most Favorited' },
              { value: 'favorites-least', label: 'Least Favorited' },
              { value: 'title-asc', label: 'Title A-Z' },
              { value: 'title-desc', label: 'Title Z-A' },
            ]}
          />
          <Select
            label="Filter by status"
            placeholder="Select active filter"
            value={activeFilter}
            onChange={(value) => {setActiveFilter(value)}}
            data={[
              { value: 'all', label: 'All Listings' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
          <Select
            label="Filter by industry"
            placeholder="Select industry"
            value={industry}
            onChange={(value) => {setIndustry(value)}}
            data={[
              {value: 'all', label: 'All Industries'},
              ...INDUSTRIES
              ]}
          />
        </Group>
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
              {listings?.map((listing) => (
                <Table.Tr key={listing._id}>
                  <Table.Td
                    styles={{ td: { borderLeft: '1px solid #eee', borderRight: '1px solid #eee' } }}
                  >
                    <Text fz="sm" fw="bold" c="dimmed" ta="center">
                      {listings.indexOf(listing) + 1}
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
                    {listing.isActive === true ? <IconCircleFilled size={16} color="green" /> : <IconCircleFilled size={16} color="red" />}
                  </Table.Td>
                  
                  <Table.Td>
                    <Text fz="sm">{listing.likes?.length}</Text>
                  </Table.Td>

                  <Table.Td>
                    <ActionIcon
                      size={30}
                      variant="outline"
                      color="yellow"
                      onClick={() => clickEditListing(listing)}
                    >
                      <IconPencil size={25} stroke={1.5} />
                    </ActionIcon>
                  </Table.Td>

                  <Table.Td styles={{ td: { borderRight: '1px solid #eee' } }}>
                  <ActionIcon
                    size={30}
                    variant="outline"
                    color="red"
                    onClick={() => clickDeleteListing(listing._id, listing.jobTitle)}
                  >
                    <IconTrash size={25} stroke={1.5} />
                  </ActionIcon>
                </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Table.ScrollContainer>
      </Stack>

      <EditListingModal 
        opened={editOpened} 
        onClose={closeEdit} 
        listing={listingEdit} 
        //handleEdit={handleEdit} 
      />

      <DeleteListingModal 
        opened={deleteOpened} 
        onClose={closeDelete} 
        listingId={listingDelete?.id || ""} 
        listingTitle={listingDelete?.title || ""} 
        handleDelete={handleDelete} 
      />
    </>
  );
};
