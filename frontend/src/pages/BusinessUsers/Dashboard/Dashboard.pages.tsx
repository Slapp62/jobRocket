import { useEffect, useState } from 'react';
import {
  IconBriefcase,
  IconChecks,
  IconClock,
  IconFileText,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import {
  Badge,
  Card,
  Center,
  Container,
  Flex,
  Group,
  Loader,
  Paper,
  Select,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import {
  fetchDashboardData,
  updateApplicationStatus,
} from '@/pages/BusinessUsers/Dashboard/dashboardApi';
import { PageMeta } from '@/SEO/PageMeta';
import {
  TApplication,
  TBusinessDashboard,
  TBusinessProfile,
  TDashboardMetrics,
  TListing,
} from '@/Types';
import { DashApplications } from './DashApplications';
import { DashListings } from './DashListings';
import { DashMetrics } from './DashMetrics';

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<TBusinessDashboard>();
  const [isLoading, setIsLoading] = useState(false);
  const [statusFilter, setStatusFilter] = useState<string | null>('all');  // 'all', 'pending', 'reviewed', 'rejected'
  const [appListingFilter, setAppListingFilter] = useState<string | null>('all'); // 'all' or a specific listing ID  

  const listingOptions = [
    { value: 'all', label: 'All Listings' },
    ...(dashboardData?.listings.map(listing => ({
      value: listing._id,
      label: listing.jobTitle
    })) ?? [])
  ];

  const filteredApplications = dashboardData?.applications.filter(app => {
    const matchesStatus = statusFilter === 'all' || app.status === statusFilter;
    const matchesListingFilter = appListingFilter === 'all' || (typeof app.listingId === 'object' && app.listingId._id === appListingFilter)
    return matchesStatus && matchesListingFilter
  });

  useEffect(() => {
    const getDashboardData = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDashboardData();
        setDashboardData(data);
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
    getDashboardData();
  }, []);

  const handleStatusChange = async (applicationId: string, newStatus: string | null) => {
    if (!newStatus) return;
    const validStatus = newStatus as 'pending' | 'reviewed' | 'rejected';

    try {
      await updateApplicationStatus(applicationId, validStatus);
      // Refresh dashboard data to reflect the status change
      const data = await fetchDashboardData();
      setDashboardData(data);
    } catch (error) {
      notifications.show({
        title: 'Error',
        message: 'Failed to update application status',
        color: 'red'
      });
    }

    setDashboardData(prev => {
      if (!prev) return prev;

      const updatedApplications : TApplication[] = prev.applications.map(app => 
        app._id === applicationId ? { ...app, status: validStatus } : app
      );

      const updatedMetrics = {
        ...prev.metrics,
        pendingApplications: updatedApplications.filter(app => app.status === 'pending').length,
        reviewedApplications: updatedApplications.filter(app => app.status === 'reviewed').length,
        rejectedApplications: updatedApplications.filter(app => app.status === 'rejected').length,
      }
  
      return {
        ...prev,
        applications: updatedApplications,
        metrics: updatedMetrics
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

            <DashMetrics dashboardData={dashboardData} />

            <Tabs color="orange" variant="outline" defaultValue="listings">
              <Tabs.List mb={20} justify='center'>
                <Tabs.Tab value="listings" fz={20}>Listings</Tabs.Tab>
                <Tabs.Tab value="applications" fz={20}>Applications</Tabs.Tab>
              </Tabs.List>
              
              <Tabs.Panel value="listings">
                <DashListings dashboardData={dashboardData}/>
              </Tabs.Panel>

              <Tabs.Panel value="applications">
                <DashApplications 
                  dashApplications={filteredApplications} 
                  onStatusChange={handleStatusChange} 
                  statusFilter={statusFilter}
                  onFilterChange={setStatusFilter}
                  listingFilter={appListingFilter}
                  onListingFilterChange={setAppListingFilter}
                  listingOptions={listingOptions}
                />
              </Tabs.Panel>
            </Tabs>
          </Stack>
        </Container>
      )}
    </>
  );
};
