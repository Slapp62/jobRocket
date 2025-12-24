import { useEffect, useMemo, useRef, useState } from 'react';
import { IconCalendarPlus, IconCircle, IconCircleFilled, IconPencil, IconTrash, IconX } from '@tabler/icons-react';
import { useNavigate } from 'react-router';
import { ActionIcon, Alert, Box, Card, Group, Select, Stack, Table, Text, TextInput } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { EmptyState } from '@/components/EmptyState';
import { TListing } from '@/Types';
import { formatDate } from '@/utils/dateUtils';
import { DeleteListingModal } from '../modals/DeleteListingModal';
import { EditListingModal } from '../modals/EditListingModal';

interface DashListingsProps {
  listings: TListing[];
  isLoading: boolean;
  searchText: string;
  setSearchText: (text: string) => void;
  sortOption: string | null;
  setSortOption: (sortOption: string | null) => void;
  activeFilter: string | null;
  setActiveFilter: (activeFilter: string | null) => void;
  page: number;
  setPage: (page: number) => void;
  handleDelete: (listingId: string) => Promise<void>;
  setListings: React.Dispatch<React.SetStateAction<TListing[]>>;
}

export const DashListings = ({
  listings,
  handleDelete,
  searchText,
  setSearchText,
  sortOption,
  setSortOption,
  activeFilter,
  setActiveFilter,
  page,
  setPage,
  setListings,
}: DashListingsProps) => {
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [listingDelete, setListingDelete] = useState<{ id: string; title: string } | null>(null);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [listingEdit, setListingEdit] = useState<TListing>();
  const [isExtendMode, setIsExtendMode] = useState(false);
  const [alertDismissed, setAlertDismissed] = useState(false);
  const dateInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  // Helper function to check if a listing expires within 7 days
  const isExpiringSoon = (expiresAt: string | null | undefined): boolean => {
    if (!expiresAt) return false;
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const expiresDate = new Date(expiresAt);
    const now = new Date();
    return expiresDate >= now && expiresDate <= sevenDaysFromNow;
  };

  // Calculate expiring listings (within 7 days)
  const expiringListings = useMemo(() => {
    return listings.filter((listing) => isExpiringSoon(listing.expiresAt));
  }, [listings]);

  // Check localStorage for alert dismissal
  useEffect(() => {
    const dismissedData = localStorage.getItem('expirationAlertDismissed');
    if (dismissedData) {
      try {
        const { timestamp } = JSON.parse(dismissedData);
        const dismissedDate = new Date(timestamp);
        const today = new Date();

        // Reset if dismissed on a different day
        if (
          dismissedDate.getDate() !== today.getDate() ||
          dismissedDate.getMonth() !== today.getMonth() ||
          dismissedDate.getFullYear() !== today.getFullYear()
        ) {
          localStorage.removeItem('expirationAlertDismissed');
          setAlertDismissed(false);
        } else {
          setAlertDismissed(true);
        }
      } catch {
        localStorage.removeItem('expirationAlertDismissed');
        setAlertDismissed(false);
      }
    }
  }, []);

  const handleAlertClose = () => {
    const dismissData = {
      timestamp: new Date().toISOString(),
    };
    localStorage.setItem('expirationAlertDismissed', JSON.stringify(dismissData));
    setAlertDismissed(true);
  };

  const clickDeleteListing = (id: string, title: string) => {
    setListingDelete({ id, title });
    openDelete();
  };

  const clickEditListing = (listing: TListing) => {
    setListingEdit(listing);
    setIsExtendMode(false);
    openEdit();
  };

  const clickExtendListing = (listing: TListing) => {
    setListingEdit(listing);
    setIsExtendMode(true);
    openEdit();
  };

  // Auto-scroll and focus date input when in extend mode
  useEffect(() => {
    if (editOpened && isExtendMode && dateInputRef.current) {
      setTimeout(() => {
        // Scroll to the date input
        dateInputRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Focus the date input
        dateInputRef.current?.focus();
      }, 100);
    }
  }, [editOpened, isExtendMode]);

  // If no listings, show empty state
  if (listings.length === 0) {
    return (
      <EmptyState
        title="No Listings Found"
        description="You haven't created any job listings yet. Start attracting top talent by creating your first listing!"
        action={{
          label: 'Create Your First Listing',
          onClick: () => navigate('/create-listing'),
        }}
      />
    );
  }

  return (
    <>
      <Stack>
        {/* Expiration Alert Banner */}
        {expiringListings.length > 0 && !alertDismissed && (
          <Alert
            variant="light"
            color="yellow"
            title={`${expiringListings.length} listing${expiringListings.length > 1 ? 's' : ''} expiring within 7 days`}
            withCloseButton
            onClose={handleAlertClose}
          >
            <Text size="sm">
              You have listings that will expire soon. Review and extend them to keep them active.
            </Text>
          </Alert>
        )}

        {/* Mobile Filters */}
        <Stack gap="md" hiddenFrom="md">
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
            onChange={(value) => {
              setSortOption(value);
            }}
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
            onChange={(value) => {
              setActiveFilter(value);
            }}
            data={[
              { value: 'all', label: 'All Listings' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </Stack>

        {/* Desktop Filters */}
        <Group justify="center" visibleFrom="md">
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
            onChange={(value) => {
              setSortOption(value);
            }}
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
            onChange={(value) => {
              setActiveFilter(value);
            }}
            data={[
              { value: 'all', label: 'All Listings' },
              { value: 'active', label: 'Active' },
              { value: 'inactive', label: 'Inactive' },
            ]}
          />
        </Group>

        {/* Mobile Card View */}
        <Stack hiddenFrom="md" gap="md">
          {listings?.map((listing) => (
            <Card key={listing._id} withBorder p="md">
              <Stack gap="xs">
                <Group justify="space-between" align="start">
                  <div>
                    <Text fw={600} size="lg">
                      {listing.jobTitle}
                    </Text>
                  </div>
                  {listing.isActive ? (
                    <IconCircleFilled size={20} color="green" />
                  ) : (
                    <IconCircleFilled size={20} color="red" />
                  )}
                </Group>

                <Group gap="xs">
                  <Text size="xs" c="dimmed">
                    Created: {listing.createdAt && formatDate(listing.createdAt)}
                  </Text>
                  <Text size="xs" c="dimmed">
                    •
                  </Text>
                  <Text size="xs" c="dimmed">
                    {listing.likes?.length || 0} favorites
                  </Text>
                </Group>

                {listing.expiresAt && (
                  <Text
                    size="xs"
                    c={isExpiringSoon(listing.expiresAt) ? 'red' : 'dimmed'}
                    fw={isExpiringSoon(listing.expiresAt) ? 'bold' : 'normal'}
                  >
                    Expires: {formatDate(listing.expiresAt)}
                  </Text>
                )}

                {/* ACCESSIBILITY: Edit and Delete buttons need aria-labels */}
                <Group gap="xs" mt="xs">
                  <ActionIcon
                    size={36}
                    variant="outline"
                    color="blue"
                    onClick={() => clickExtendListing(listing)}
                    aria-label={`Extend ${listing.jobTitle} listing expiration`}
                  >
                    <IconCalendarPlus size={20} aria-hidden="true" />
                  </ActionIcon>
                  <ActionIcon
                    size={36}
                    variant="outline"
                    color="yellow"
                    onClick={() => clickEditListing(listing)}
                    aria-label={`Edit ${listing.jobTitle} listing`}
                  >
                    <IconPencil size={20} aria-hidden="true" />
                  </ActionIcon>
                  <ActionIcon
                    size={36}
                    variant="outline"
                    color="red"
                    onClick={() => clickDeleteListing(listing._id, listing.jobTitle)}
                    aria-label={`Delete ${listing.jobTitle} listing`}
                  >
                    <IconTrash size={20} aria-hidden="true" />
                  </ActionIcon>
                </Group>
              </Stack>
            </Card>
          ))}
        </Stack>

        {/* Desktop Table View */}
        <Box visibleFrom="md">
          <Table.ScrollContainer minWidth={800}>
            <Table verticalSpacing="sm" maw="100%" mx="auto">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th />
                  <Table.Th>Job Title</Table.Th>
                  <Table.Th>Created At</Table.Th>
                  <Table.Th>Expires At</Table.Th>
                  <Table.Th>Active</Table.Th>
                  <Table.Th>Favorites</Table.Th>
                  <Table.Th>Extend</Table.Th>
                  <Table.Th>Edit</Table.Th>
                  <Table.Th>Delete</Table.Th>
                </Table.Tr>
              </Table.Thead>

              <Table.Tbody>
                {listings?.map((listing) => (
                  <Table.Tr key={listing._id}>
                    <Table.Td
                      styles={{
                        td: { borderLeft: '1px solid #eee', borderRight: '1px solid #eee' },
                      }}
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
                      {listing.createdAt && formatDate(listing.createdAt)}
                    </Table.Td>

                    <Table.Td>
                      <Text
                        fz="sm"
                        c={isExpiringSoon(listing.expiresAt) ? 'red' : 'dimmed'}
                        fw={isExpiringSoon(listing.expiresAt) ? 'bold' : 'normal'}
                      >
                        {listing.expiresAt ? formatDate(listing.expiresAt) : 'No expiration'}
                      </Text>
                    </Table.Td>

                    <Table.Td>
                      {listing.isActive === true ? (
                        <IconCircleFilled size={16} color="green" />
                      ) : (
                        <IconCircleFilled size={16} color="red" />
                      )}
                    </Table.Td>

                    <Table.Td>
                      <Text fz="sm">{listing.likes?.length}</Text>
                    </Table.Td>

                    <Table.Td>
                      <ActionIcon
                        size={30}
                        variant="outline"
                        color="blue"
                        onClick={() => clickExtendListing(listing)}
                        aria-label={`Extend ${listing.jobTitle} listing expiration`}
                      >
                        <IconCalendarPlus size={25} stroke={1.5} aria-hidden="true" />
                      </ActionIcon>
                    </Table.Td>

                    <Table.Td>
                      <ActionIcon
                        size={30}
                        variant="outline"
                        color="yellow"
                        onClick={() => clickEditListing(listing)}
                        aria-label={`Edit ${listing.jobTitle} listing`}
                      >
                        <IconPencil size={25} stroke={1.5} aria-hidden="true" />
                      </ActionIcon>
                    </Table.Td>

                    <Table.Td styles={{ td: { borderRight: '1px solid #eee' } }}>
                      <ActionIcon
                        size={30}
                        variant="outline"
                        color="red"
                        onClick={() => clickDeleteListing(listing._id, listing.jobTitle)}
                        aria-label={`Delete ${listing.jobTitle} listing`}
                      >
                        <IconTrash size={25} stroke={1.5} aria-hidden="true" />
                      </ActionIcon>
                    </Table.Td>
                  </Table.Tr>
                ))}
              </Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Box>
      </Stack>

      <EditListingModal
        opened={editOpened}
        onClose={closeEdit}
        listing={listingEdit}
        setListings={setListings}
        dateInputRef={dateInputRef}
        isExtendMode={isExtendMode}
      />

      <DeleteListingModal
        opened={deleteOpened}
        onClose={closeDelete}
        listingId={listingDelete?.id || ''}
        listingTitle={listingDelete?.title || ''}
        handleDelete={handleDelete}
      />
    </>
  );
};
