import { useEffect, useMemo, useState } from 'react';
import {
  IconAlertCircle,
  IconCalendarPlus,
  IconCircle,
  IconCircleFilled,
  IconPencil,
  IconTrash,
  IconX,
} from '@tabler/icons-react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import {
  ActionIcon,
  Alert,
  Box,
  Button,
  Card,
  Group,
  Popover,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  Tooltip,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { DurationPresetSelect } from '@/components/DurationPresetSelect';
import { EmptyState } from '@/components/EmptyState';
import { TListing } from '@/Types';
import { addDays, formatDate, toLocalMidnight } from '@/utils/dateUtils';
import { DeleteListingModal } from '../modals/DeleteListingModal';
import { EditListingModal } from '../modals/EditListingModal';
import { cleanedListingData } from '../utils/getCleanedListingData';

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
  const [alertDismissed, setAlertDismissed] = useState(false);
  const [extendPopoverOpened, setExtendPopoverOpened] = useState(false);
  const [extendListing, setExtendListing] = useState<TListing | null>(null);
  const [extendDuration, setExtendDuration] = useState(7); // Default 7 days
  const [isExtending, setIsExtending] = useState(false);
  const navigate = useNavigate();

  // Helper function to check if a listing expires within 7 days
  const isExpiringSoon = (expiresAt: string | null | undefined): boolean => {
    if (!expiresAt) {return false;}
    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);
    const expiresDate = new Date(expiresAt);
    const now = new Date();
    return expiresDate >= now && expiresDate <= sevenDaysFromNow;
  };

  // Helper function to check if a listing is in grace period (expired but not yet deleted)
  const isInGracePeriod = (expiresAt: string | null | undefined): boolean => {
    if (!expiresAt) {return false;}
    const expDate = new Date(expiresAt);
    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    return expDate < now && expDate > sevenDaysAgo;
  };

  // Helper function to get days until deletion for expired listings
  const getDaysUntilDeletion = (expiresAt: string | null | undefined): number => {
    if (!expiresAt) {return 0;}
    const expDate = new Date(expiresAt);
    const deletionDate = new Date(expDate.getTime() + 7 * 24 * 60 * 60 * 1000);
    const now = new Date();
    const daysLeft = Math.ceil((deletionDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return Math.max(0, daysLeft);
  };

  // Calculate expiring listings (within 7 days)
  const expiringListings = useMemo(() => {
    return listings.filter((listing) => isExpiringSoon(listing.expiresAt));
  }, [listings]);

  // Calculate grace period listings (expired but not yet deleted)
  const gracePeriodListings = useMemo(() => {
    return listings.filter((listing) => isInGracePeriod(listing.expiresAt));
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
    openEdit();
  };

  const clickExtendListing = (listing: TListing) => {
    setExtendListing(listing);
    setExtendDuration(7); // Reset to default
    setExtendPopoverOpened(true);
  };

  const handleExtendConfirm = async () => {
    if (!extendListing) {return;}

    setIsExtending(true);
    try {
      // Calculate new expiration date from duration
      const expirationDate = addDays(toLocalMidnight(new Date()), extendDuration);

      // Get all listing data (cleaned for validation)
      const { expiresAt: _unused, ...listingData } = cleanedListingData(extendListing);

      const response = await axios.put(`/api/listings/${extendListing._id}`, {
        ...listingData,
        expiresAt: expirationDate.toISOString(),
      });

      // Update listing in state
      setListings((prevListings: TListing[]) =>
        prevListings.map((listing: TListing) =>
          listing._id === response.data._id ? response.data : listing
        )
      );

      notifications.show({
        title: 'Success',
        message: `Listing extended to ${formatDate(expirationDate)}`,
        color: 'green',
      });

      setExtendPopoverOpened(false);
      setExtendListing(null);
    } catch (error) {
      console.error('Error extending listing:', error);
      notifications.show({
        title: 'Error',
        message: 'Failed to extend listing. Please try again.',
        color: 'red',
      });
    } finally {
      setIsExtending(false);
    }
  };

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
        {/* Grace Period Alert Banner (Expired Listings) */}
        {gracePeriodListings.length > 0 && (
          <Alert
            variant="light"
            color="red"
            title={`⚠️ Warning: ${gracePeriodListings.length} expired listing${gracePeriodListings.length > 1 ? 's' : ''} will be deleted soon`}
          >
            <Text size="sm">
              You have expired listing{gracePeriodListings.length > 1 ? 's' : ''} that will be permanently deleted soon. Extend them now to keep them active.
            </Text>
          </Alert>
        )}

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
                  <Group gap="xs">
                    <Text fw={600} size="lg">
                      {listing.jobTitle}
                    </Text>
                    {isInGracePeriod(listing.expiresAt) && (
                      <Tooltip
                        label={`This listing expired. It will be deleted in ${getDaysUntilDeletion(listing.expiresAt)} day${getDaysUntilDeletion(listing.expiresAt) !== 1 ? 's' : ''} unless you extend it.`}
                        withArrow
                      >
                        <IconAlertCircle size={20} color="red" />
                      </Tooltip>
                    )}
                  </Group>
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
                    c={isInGracePeriod(listing.expiresAt) || isExpiringSoon(listing.expiresAt) ? 'red' : 'dimmed'}
                    fw={isInGracePeriod(listing.expiresAt) || isExpiringSoon(listing.expiresAt) ? 'bold' : 'normal'}
                  >
                    {isInGracePeriod(listing.expiresAt) && `EXPIRED: ${formatDate(listing.expiresAt)} (Deletes in ${getDaysUntilDeletion(listing.expiresAt)} day${getDaysUntilDeletion(listing.expiresAt) !== 1 ? 's' : ''})`}
                    {!isInGracePeriod(listing.expiresAt) && `Expires: ${formatDate(listing.expiresAt)}`}
                  </Text>
                )}

                {/* ACCESSIBILITY: Edit and Delete buttons need aria-labels */}
                <Group gap="xs" mt="xs">
                  <Popover
                    opened={extendPopoverOpened && extendListing?._id === listing._id}
                    onClose={() => setExtendPopoverOpened(false)}
                    position="bottom"
                    withArrow
                    shadow="md"
                  >
                    <Popover.Target>
                      <ActionIcon
                        size={36}
                        variant="outline"
                        color="blue"
                        onClick={() => clickExtendListing(listing)}
                        aria-label={`Extend ${listing.jobTitle} listing expiration`}
                      >
                        <IconCalendarPlus size={20} aria-hidden="true" />
                      </ActionIcon>
                    </Popover.Target>
                    <Popover.Dropdown>
                      <Stack gap="md" w={300}>
                        <Text size="sm" fw={600}>
                          Extend Listing
                        </Text>
                        <DurationPresetSelect
                          value={extendDuration}
                          onChange={setExtendDuration}
                          label="Extend Duration"
                          showCalculatedDate
                        />
                        <Group justify="flex-end" gap="xs">
                          <Button
                            variant="subtle"
                            size="xs"
                            onClick={() => setExtendPopoverOpened(false)}
                            disabled={isExtending}
                          >
                            Cancel
                          </Button>
                          <Button size="xs" onClick={handleExtendConfirm} loading={isExtending}>
                            Confirm
                          </Button>
                        </Group>
                      </Stack>
                    </Popover.Dropdown>
                  </Popover>
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
                      <Group gap="xs">
                        <Text fz="sm" fw={500}>
                          {listing.jobTitle}
                        </Text>
                        {isInGracePeriod(listing.expiresAt) && (
                          <Tooltip
                            label={`This listing expired. It will be deleted in ${getDaysUntilDeletion(listing.expiresAt)} day${getDaysUntilDeletion(listing.expiresAt) !== 1 ? 's' : ''} unless you extend it.`}
                            withArrow
                          >
                            <IconAlertCircle size={16} color="red" />
                          </Tooltip>
                        )}
                      </Group>
                    </Table.Td>

                    <Table.Td>{listing.createdAt && formatDate(listing.createdAt)}</Table.Td>

                    <Table.Td>
                      <Text
                        fz="sm"
                        c={isInGracePeriod(listing.expiresAt) || isExpiringSoon(listing.expiresAt) ? 'red' : 'dimmed'}
                        fw={isInGracePeriod(listing.expiresAt) || isExpiringSoon(listing.expiresAt) ? 'bold' : 'normal'}
                      >
                        {isInGracePeriod(listing.expiresAt) && `EXPIRED: ${formatDate(listing.expiresAt)} (Deletes in ${getDaysUntilDeletion(listing.expiresAt)} day${getDaysUntilDeletion(listing.expiresAt) !== 1 ? 's' : ''})`}
                        {!isInGracePeriod(listing.expiresAt) && listing.expiresAt && formatDate(listing.expiresAt)}
                        {!isInGracePeriod(listing.expiresAt) && !listing.expiresAt && 'No expiration'}
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
                      <Popover
                        opened={extendPopoverOpened && extendListing?._id === listing._id}
                        onClose={() => setExtendPopoverOpened(false)}
                        position="bottom"
                        withArrow
                        shadow="md"
                      >
                        <Popover.Target>
                          <ActionIcon
                            size={30}
                            variant="outline"
                            color="blue"
                            onClick={() => clickExtendListing(listing)}
                            aria-label={`Extend ${listing.jobTitle} listing expiration`}
                          >
                            <IconCalendarPlus size={25} stroke={1.5} aria-hidden="true" />
                          </ActionIcon>
                        </Popover.Target>
                        <Popover.Dropdown>
                          <Stack gap="md" w={300}>
                            <Text size="sm" fw={600}>
                              Extend Listing
                            </Text>
                            <DurationPresetSelect
                              value={extendDuration}
                              onChange={setExtendDuration}
                              label="Extend Duration"
                              showCalculatedDate
                            />
                            <Group justify="flex-end" gap="xs">
                              <Button
                                variant="subtle"
                                size="xs"
                                onClick={() => setExtendPopoverOpened(false)}
                                disabled={isExtending}
                              >
                                Cancel
                              </Button>
                              <Button size="xs" onClick={handleExtendConfirm} loading={isExtending}>
                                Confirm
                              </Button>
                            </Group>
                          </Stack>
                        </Popover.Dropdown>
                      </Popover>
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
