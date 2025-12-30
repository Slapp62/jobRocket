import { useMemo, useState } from 'react';
import groupBy from 'lodash.groupby';
import {
  Accordion,
  Badge,
  Box,
  Button,
  Group,
  Select,
  Stack,
  Table,
  Text,
  TextInput,
  useComputedColorScheme,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { EmptyState } from '@/components/EmptyState';
import { TApplication } from '@/Types';
import { DeleteApplicationModal } from '../modals/DeleteApplicationModal';
import { ApplicationCard } from './ApplicationCard';
import { ApplicationTableRow } from './ApplicationTableRow';

interface DashApplicationsGroupedProps {
  dashApplications?: TApplication[];
  searchText: string;
  setSearchText: (searchText: string) => void;
  status: string | null;
  setStatus: (status: string | null) => void;
  dateFrom: string | null;
  setDateFrom: (dateFrom: string | null) => void;
  dateTo: string | null;
  setDateTo: (dateTo: string | null) => void;
  sortOption: string | null;
  setSortOption: (sortOption: string | null) => void;
  updateApplicationStatus: (applicationId: string, newStatus: string | null) => void;
  handleApplicationDelete: (applicationId: string) => Promise<void>;
}

export const DashApplicationsGrouped = ({
  dashApplications,
  searchText,
  setSearchText,
  status,
  setStatus,
  dateFrom,
  setDateFrom,
  dateTo,
  setDateTo,
  sortOption,
  setSortOption,
  updateApplicationStatus,
  handleApplicationDelete,
}: DashApplicationsGroupedProps) => {
  const [deleteOpened, { open: openDelete, close: closeDelete }] = useDisclosure(false);
  const [applicationDelete, setApplicationDelete] = useState<{ id: string; title: string } | null>(
    null
  );
  const computedColorScheme = useComputedColorScheme('light');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const handleDeleteApplication = (id: string, title: string) => {
    setApplicationDelete({ id, title });
    openDelete();
  };

  // Group applications by listing ID
  const groupedApplications = useMemo(() => {
    if (!dashApplications || dashApplications.length === 0) {return {};}

    // Group by listing ID, handling both populated and unpopulated cases
    const grouped = groupBy(dashApplications, (app) => {
      if (typeof app.listingId === 'object' && app.listingId !== null) {
        return app.listingId._id;
      }
      return 'unknown';
    });

    return grouped;
  }, [dashApplications]);

  // Calculate status breakdown for each listing
  const getStatusBreakdown = (apps: TApplication[]) => {
    const counts = {
      pending: apps.filter((app) => app.status === 'pending').length,
      reviewed: apps.filter((app) => app.status === 'reviewed').length,
      rejected: apps.filter((app) => app.status === 'rejected').length,
    };
    return counts;
  };

  // Toggle all accordions
  const handleExpandAll = () => {
    if (expandedItems.length === Object.keys(groupedApplications).length) {
      setExpandedItems([]);
    } else {
      setExpandedItems(Object.keys(groupedApplications));
    }
  };

  const allExpanded = expandedItems.length === Object.keys(groupedApplications).length;

  return (
    <>
      <Stack>
        {/* Filters Section */}
        {/* Mobile Filters */}
        <Stack gap="md" hiddenFrom="md">
          <TextInput
            type="date"
            label="From"
            value={dateFrom || ''}
            onChange={(e) => setDateFrom(e.target.value)}
          />
          <TextInput
            type="date"
            label="To"
            value={dateTo || ''}
            onChange={(e) => setDateTo(e.target.value)}
          />
          <Select
            label="Status"
            value={status}
            onChange={(value) => setStatus(value)}
            data={[
              { value: 'all', label: 'All Statuses' },
              { value: 'pending', label: 'Pending' },
              { value: 'reviewed', label: 'Reviewed' },
              { value: 'rejected', label: 'Rejected' },
            ]}
          />
          <TextInput
            label="Search"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search applications..."
          />
          <Select
            label="Sort"
            value={sortOption}
            onChange={(value) => setSortOption(value)}
            data={[
              { value: 'date-newest', label: 'Newest First' },
              { value: 'date-oldest', label: 'Oldest First' },
              { value: 'name-asc', label: 'Name (A-Z)' },
              { value: 'name-desc', label: 'Name (Z-A)' },
              { value: 'match-desc', label: 'Match (High to Low)' },
              { value: 'match-asc', label: 'Match (Low to High)' },
            ]}
          />
        </Stack>

        {/* Desktop Filters */}
        <Group justify="center" align="center" visibleFrom="md">
          <TextInput
            type="date"
            label="From"
            value={dateFrom || ''}
            onChange={(e) => setDateFrom(e.target.value)}
            w="18%"
          />
          <TextInput
            type="date"
            label="To"
            value={dateTo || ''}
            onChange={(e) => setDateTo(e.target.value)}
            w="18%"
          />
          <Select
            label="Status"
            w="18%"
            value={status}
            onChange={(value) => setStatus(value)}
            data={[
              { value: 'all', label: 'All Statuses' },
              { value: 'pending', label: 'Pending' },
              { value: 'reviewed', label: 'Reviewed' },
              { value: 'rejected', label: 'Rejected' },
            ]}
          />
          <TextInput
            label="Search"
            w="18%"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
            placeholder="Search applications..."
          />
          <Select
            label="Sort"
            w="18%"
            value={sortOption}
            onChange={(value) => setSortOption(value)}
            data={[
              { value: 'date-newest', label: 'Newest First' },
              { value: 'date-oldest', label: 'Oldest First' },
              { value: 'name-asc', label: 'Name (A-Z)' },
              { value: 'name-desc', label: 'Name (Z-A)' },
              { value: 'match-desc', label: 'Match (High to Low)' },
              { value: 'match-asc', label: 'Match (Low to High)' },
            ]}
          />
        </Group>

        {/* Expand/Collapse All Button */}
        {Object.keys(groupedApplications).length > 0 && (
          <Group justify="flex-end">
            <Button variant="subtle" size="xs" onClick={handleExpandAll}>
              {allExpanded ? 'Collapse All' : 'Expand All'}
            </Button>
          </Group>
        )}

        {/* Applications Grouped by Listing */}
        {Object.keys(groupedApplications).length === 0 ? (
          <EmptyState
            title="No Applications Found"
            description="You haven't received any applications yet. Make sure your job listings are active and visible to attract candidates."
          />
        ) : (
          <Accordion
            multiple
            value={expandedItems}
            onChange={setExpandedItems}
            variant="separated"
            radius="md"
          >
            {Object.entries(groupedApplications).map(([listingId, applications]) => {
              const firstApp = applications[0];
              const listingTitle =
                typeof firstApp?.listingId === 'object' && firstApp.listingId !== null
                  ? firstApp.listingId.jobTitle
                  : 'Unknown Listing';

              const statusBreakdown = getStatusBreakdown(applications);

              return (
                <Accordion.Item key={listingId} value={listingId}>
                  <Accordion.Control>
                    <Group justify="space-between" wrap="wrap">
                      <Group>
                        <Text fw={600} size="lg">
                          {listingTitle}
                        </Text>
                        <Badge
                          color="blue"
                          variant="light"
                          c={computedColorScheme === 'light' ? 'black' : 'gray.4'}
                        >
                          {applications.length}{' '}
                          {applications.length === 1 ? 'applicant' : 'applicants'}
                        </Badge>
                      </Group>

                      <Group gap="xs">
                        {statusBreakdown.pending > 0 && (
                          <Badge
                            color="orange"
                            c={computedColorScheme === 'light' ? 'black' : 'gray.4'}
                            variant="dot"
                            size="sm"
                          >
                            {statusBreakdown.pending} pending
                          </Badge>
                        )}
                        {statusBreakdown.reviewed > 0 && (
                          <Badge
                            color="green"
                            c={computedColorScheme === 'light' ? 'black' : 'gray.4'}
                            variant="dot"
                            size="sm"
                          >
                            {statusBreakdown.reviewed} reviewed
                          </Badge>
                        )}
                        {statusBreakdown.rejected > 0 && (
                          <Badge
                            color="red"
                            c={computedColorScheme === 'light' ? 'black' : 'gray.4'}
                            variant="dot"
                            size="sm"
                          >
                            {statusBreakdown.rejected} rejected
                          </Badge>
                        )}
                      </Group>
                    </Group>
                  </Accordion.Control>

                  <Accordion.Panel>
                    {/* Mobile Card View */}
                    <Stack hiddenFrom="md" gap="md">
                      {applications.map((app) => (
                        <ApplicationCard
                          key={app._id}
                          application={app}
                          showListingTitle={false}
                          onStatusChange={updateApplicationStatus}
                          onDelete={handleDeleteApplication}
                        />
                      ))}
                    </Stack>

                    {/* Desktop Table View */}
                    <Box visibleFrom="md">
                      <Table.ScrollContainer minWidth={800}>
                        <Table verticalSpacing="sm">
                          <Table.Thead>
                            <Table.Tr>
                              <Table.Th />
                              <Table.Th>Applicant</Table.Th>
                              <Table.Th>Phone</Table.Th>
                              <Table.Th>Email</Table.Th>
                              <Table.Th>Submitted</Table.Th>
                              <Table.Th>Resume</Table.Th>
                              <Table.Th>Match</Table.Th>
                              <Table.Th>Status</Table.Th>
                              <Table.Th>Actions</Table.Th>
                            </Table.Tr>
                          </Table.Thead>

                          <Table.Tbody>
                            {applications.map((app, index) => (
                              <ApplicationTableRow
                                key={app._id}
                                application={app}
                                rowNumber={index + 1}
                                showListingTitle={false}
                                onStatusChange={updateApplicationStatus}
                                onDelete={handleDeleteApplication}
                              />
                            ))}
                          </Table.Tbody>
                        </Table>
                      </Table.ScrollContainer>
                    </Box>
                  </Accordion.Panel>
                </Accordion.Item>
              );
            })}
          </Accordion>
        )}
      </Stack>

      <DeleteApplicationModal
        opened={deleteOpened}
        onClose={closeDelete}
        applicationId={applicationDelete?.id || ''}
        applicationTitle={applicationDelete?.title || ''}
        handleDelete={handleApplicationDelete}
      />
    </>
  );
};
