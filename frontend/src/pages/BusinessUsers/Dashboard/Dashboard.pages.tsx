import { useState } from 'react';
import { ActionIcon, Button, Center, Container, Group, Loader, Stack, Tabs, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { IconArrowUpRight, IconQuestionMark } from '@tabler/icons-react';
import {
  deleteApplication,
  deleteListing,
  fetchDashboardMetrics,
  updateApplicationStatus,
} from '@/pages/BusinessUsers/Dashboard/utils/dashboardApi';
import { PageMeta } from '@/SEO/PageMeta';
import { DashboardGuideModal } from '@/components/Modals/DashboardGuideModal';
import { DashApplicationsGrouped } from './components/DashApplicationsGrouped';
import { DashListings } from './components/DashListings';
import { DashMetrics } from './components/DashMetrics';
import { useDashboardApplications } from './hooks/useDashboardApplications';
import { useDashboardListings } from './hooks/useDashboardListings';
import { useDashboardMetrics } from './hooks/useDashboardMetrics';

export const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [guideOpened, { open: openGuide, close: closeGuide }] = useDisclosure(false);
  const { dashboardMetrics, setDashboardMetrics, getDashboardMetrics } = useDashboardMetrics();

  const {
    listings,
    setListings,
    isLoading: listingsLoading,
    searchText,
    setSearchText,
    sortOption,
    setSortOption,
    activeFilter,
    setActiveFilter,
    page,
    setPage,
    removeListingById,
  } = useDashboardListings();

  const {
    applications,
    isLoading: applicationsLoading,
    searchText: appSearchText,
    setSearchText: setAppSearchText,
    status,
    setStatus,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    sortOption: appSortOption,
    setSortOption: setAppSortOption,
    setApplications,
    removeApplicationById,
  } = useDashboardApplications();

  const handleListingDelete = async (listingId: string) => {
    if (!listingId) {
      return;
    }
    const newListings = removeListingById(listingId);
    setListings(newListings);

    try {
      await deleteListing(listingId);
      // Refresh dashboard metrics to reflect the change
      notifications.show({
        title: 'Success',
        message: 'Listing deleted successfully',
        color: 'green',
      });
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to delete listing',
        color: 'red',
      });
    }

    // update listings metrics
    //TODO: add option to delete associated applications
    setDashboardMetrics((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        metrics: {
          // Update the nested metrics object
          ...prev.metrics, // Keep all other metrics
          totalListings: newListings.length, // Update just this one
        },
      };
    });
  };

  const handleApplicationDelete = async (applicationId: string) => {
    if (!applicationId) {
      return;
    }
    const newApplications = removeApplicationById(applicationId);
    setApplications(newApplications);

    try {
      await deleteApplication(applicationId);
      // Refresh dashboard metrics to reflect the change
      notifications.show({
        title: 'Success',
        message: 'Application deleted successfully',
        color: 'green',
      });
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to delete application',
        color: 'red',
      });
    }

    // update applications metrics
    setDashboardMetrics((prev) => {
      if (!prev) {
        return prev;
      }

      return {
        ...prev,
        metrics: {
          ...prev.metrics,
          totalApplications: newApplications.length,
          pendingApplications: newApplications.filter((app) => app.status === 'pending').length,
          reviewedApplications: newApplications.filter((app) => app.status === 'reviewed').length,
          rejectedApplications: newApplications.filter((app) => app.status === 'rejected').length,
        },
      };
    });
  };

  const handleStatusChange = async (applicationId: string, newStatus: string | null) => {
    if (!newStatus) {
      return;
    }
    const validStatus = newStatus as 'pending' | 'reviewed' | 'rejected';

    try {
      await updateApplicationStatus(applicationId, validStatus);
      // Refresh dashboard metrics to reflect the status change
      const data = await fetchDashboardMetrics();
      setDashboardMetrics(data);
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update application status',
        color: 'red',
      });
    }

    setApplications((prev) => {
      if (!prev) {
        return prev;
      }

      return prev.map((app) => (app._id === applicationId ? { ...app, status: validStatus } : app));
    });

    setDashboardMetrics((prev) => {
      if (!prev) {
        return prev;
      }
      const updatedMetrics = {
        pendingApplications: applications.filter((app) => app.status === 'pending').length,
        reviewedApplications: applications.filter((app) => app.status === 'reviewed').length,
        rejectedApplications: applications.filter((app) => app.status === 'rejected').length,
      };

      return {
        ...prev,
        metrics: {
          ...prev.metrics,
          updatedMetrics,
        },
      };
    });
  };

  return (
    <>
      <PageMeta
        title="Dashboard | JobRocket"
        description="Manage your listings and applications."
        keywords="analytics, dashboard, job applications, manage job applications, manage job listings"
      />

      {isLoading ? (
        <Center py={50} h="calc(100vh - 200px)">
          <Loader size="xl" variant="oval" />
        </Center>
      ) : (
        <Container size="xl" py="xl" w={{ base: '100%', sm: '95%', md: '85%' }}>
          <Stack gap="xl">
            {/* Header */}
            <Group justify="space-between" align="flex-start">
              <div>
                <Title order={1} mb="xs">
                  Dashboard
                </Title>
                <Text c="dimmed" size="lg">
                  Welcome back! Here's your overview
                </Text>
              </div>
              <Button
                variant="light"
                rightSection={<IconArrowUpRight size={18} />}
                onClick={openGuide}
                visibleFrom="sm"
              >
                Dashboard Guide
              </Button>
            </Group>

            <DashMetrics
              dashboardMetrics={dashboardMetrics}
              listings={listings}
              applications={applications}
            />

            <Tabs color="rocketOrange" variant="outline" defaultValue="applications">
              <Tabs.List mb={20} justify="center" fw={600}>
                <Tabs.Tab value="applications" fz={{ base: 'lg', md: 30 }}>
                  Applications
                </Tabs.Tab>
                <Tabs.Tab value="listings" fz={{ base: 'lg', md: 30 }}>
                  Listings
                </Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="applications">
                <DashApplicationsGrouped
                  dashApplications={applications}
                  searchText={appSearchText}
                  setSearchText={setAppSearchText}
                  status={status}
                  setStatus={setStatus}
                  dateFrom={dateFrom}
                  setDateFrom={setDateFrom}
                  dateTo={dateTo}
                  setDateTo={setDateTo}
                  sortOption={appSortOption}
                  setSortOption={setAppSortOption}
                  updateApplicationStatus={handleStatusChange}
                  handleApplicationDelete={handleApplicationDelete}
                />
              </Tabs.Panel>

              <Tabs.Panel value="listings">
                <DashListings
                  listings={listings}
                  isLoading={listingsLoading}
                  searchText={searchText}
                  setSearchText={setSearchText}
                  sortOption={sortOption}
                  setSortOption={setSortOption}
                  activeFilter={activeFilter}
                  setActiveFilter={setActiveFilter}
                  page={page}
                  setPage={setPage}
                  handleDelete={handleListingDelete}
                  setListings={setListings}
                />
              </Tabs.Panel>
            </Tabs>
          </Stack>
        </Container>
      )}

      {/* Dashboard Guide Modal */}
      <DashboardGuideModal opened={guideOpened} close={closeGuide} />
    </>
  );
};
