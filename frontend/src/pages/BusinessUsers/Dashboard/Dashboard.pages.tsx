import { useEffect, useState } from 'react';
import {
  Center,
  Container,
  Loader,
  Stack,
  Tabs,
  Text,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import styles from '@/styles/gradients.module.css';
import {
  fetchDashboardMetrics,
  updateApplicationStatus,
} from '@/pages/BusinessUsers/Dashboard/dashboardApi';
import { PageMeta } from '@/SEO/PageMeta';
import {
  TApplication,
  TDashboardMetrics,
} from '@/Types';
import { DashApplications } from './DashApplications';
import { DashListings } from './DashListings';
import { DashMetrics } from './DashMetrics';
import { useDashboardListings } from './useDashboardListings'
import { useDashboardApplications } from './useDashboardApplications'

export const Dashboard = () => {
  const [dashboardMetrics, setDashboardMetrics] = useState<TDashboardMetrics>();
  const [isLoading, setIsLoading] = useState(false);
  const {
    listings,
    isLoading: listingsLoading,
    searchText,
    setSearchText,
    industry,
    setIndustry,
    sortOption,
    setSortOption,
    activeFilter,
    setActiveFilter,
    page,
    setPage
  } = useDashboardListings();

  const {
    applications,
    isLoading: applicationsLoading,
    searchText : appSearchText,
    setSearchText: setAppSearchText,
    status,
    setStatus,
    listingId,
    setListingId,
    dateFrom,
    setDateFrom,
    dateTo,
    setDateTo,
    sortOption : appSortOption,
    setSortOption: setAppSortOption,
    page : appPage,
    setPage: setAppPage,
    newStatus,
    setNewStatus,
    setApplications
  } = useDashboardApplications();
  
  const listingOptions = [
    { value: 'all', label: 'All Listings' },
    ...(listings.map(listing => ({
      value: listing._id,
      label: listing.jobTitle
    })) ?? [])
  ];

  useEffect(() => {
    const getDashboardMetrics = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDashboardMetrics();
        setDashboardMetrics(data); // Keep this for now since metrics are in here
      } catch (error: any) {
        notifications.show({
          title: 'Error',
          message: error.response?.data?.message || error.message,
          color: 'red',
        });
      } finally {
        setIsLoading(false);
      }
    };
    getDashboardMetrics();
  }, []);

  const handleStatusChange = async (applicationId: string, newStatus: string | null) => {
    if (!newStatus) return;
    const validStatus = newStatus as 'pending' | 'reviewed' | 'rejected';

    try {
      await updateApplicationStatus(applicationId, validStatus);
      // Refresh dashboard metrics to reflect the status change
      const data = await fetchDashboardMetrics();
      setDashboardMetrics(data);
    } catch (error : any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update application status',
        color: 'red'
      });
    }

    setApplications(prev => {
      if (!prev) return prev;

      return prev.map(app => 
        app._id === applicationId ? { ...app, status: validStatus } : app
      );
    });

    setDashboardMetrics((prev) => {
      if (!prev) return prev;
      const updatedMetrics = {
        pendingApplications: applications.filter(app => app.status === 'pending').length,
        reviewedApplications: applications.filter(app => app.status === 'reviewed').length,
        rejectedApplications: applications.filter(app => app.status === 'rejected').length,
      }
  
      return {
        ...prev,
       updatedMetrics
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

      <div className={styles.pageBackgroundAlt}>
        {isLoading ? (
          <Center py={50} h="calc(100vh - 200px)">
            <Loader size="xl" variant="oval" />
          </Center>
        ) : (
          <Container size="xl" py="xl" w="85%">
            <Stack gap="xl">
            {/* Header */}
            <div>
              <Title order={1} mb="xs">
                Dashboard
              </Title>
              <Text c="dimmed" size="lg">
                Welcome back! Here's your overview
              </Text>
            </div>

            <DashMetrics dashboardMetrics={dashboardMetrics} />

            <Tabs color="rocketOrange" variant="outline" defaultValue="applications">
              <Tabs.List mb={20} justify='center' fw={600} >
                <Tabs.Tab value="applications" fz={30}>Applications</Tabs.Tab>
                <Tabs.Tab value="listings" fz={30}>Listings</Tabs.Tab>
              </Tabs.List>

              <Tabs.Panel value="applications">
                <DashApplications 
                  dashApplications={applications} 
                  listingOptions={listingOptions}
                  onStatusChange={handleStatusChange}
                  searchText={appSearchText}
                  setSearchText={setAppSearchText}
                  status={status}
                  setStatus={setStatus}
                  listingId={listingId}
                  setListingId={setListingId}
                  dateFrom={dateFrom}
                  setDateFrom={setDateFrom}
                  dateTo={dateTo}
                  setDateTo={setDateTo}
                  sortOption={appSortOption}
                  setSortOption={setAppSortOption}
                  page={appPage}
                  setPage={setAppPage}
                  updateApplicationStatus={handleStatusChange}
                  newStatus={newStatus}
                  setNewStatus={setNewStatus}
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
                  industry={industry}
                  setIndustry={setIndustry}
                />
              </Tabs.Panel>
            </Tabs>
          </Stack>
        </Container>
      )}
      </div>
    </>
  );
};
