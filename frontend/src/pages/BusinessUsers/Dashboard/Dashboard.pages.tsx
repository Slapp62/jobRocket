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
    try {
      await updateApplicationStatus(applicationId, newStatus);
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
      const validStatus = newStatus as 'pending' | 'reviewed' | 'rejected';

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

            {/* Active Job Listings */}
            {/* <DashListings dashboardData={dashboardData}/> */}

            {/* Recent Applications */}
            <DashApplications dashApplications={dashboardData?.applications} onStatusChange={handleStatusChange} />
          </Stack>
        </Container>
      )}
    </>
  );
};
