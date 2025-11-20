import { PageMeta } from "@/SEO/PageMeta";
import { TApplication, TBusinessDashboard, TBusinessProfile, TDashboardMetrics, TListing } from "@/Types";
import { fetchDashboardData, updateApplicationStatus } from "@/utils/dashboardApi"
import { Badge, Card, Center, Container, Group, Loader, Paper, Stack, Text, Title, ThemeIcon, Flex, Select } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import { IconBriefcase, IconFileText, IconUsers, IconChecks, IconClock, IconX } from "@tabler/icons-react";
import { useEffect, useState } from "react"

export const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState<TBusinessDashboard>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    const  getDashboardData = async () => {
      try {
        setIsLoading(true)
        const data = await fetchDashboardData();
        setDashboardData(data);
      } catch (error : any) {
        notifications.show({
          title: 'Error',
          message: error.response?.data?.message || error.message,
          color: 'red',
        });
      } finally {
        setIsLoading(false);
      }
    }
    getDashboardData();
  },[])

  const handleStatusChange = async (applicationId: string, newStatus: string | null) => {
    if (!newStatus || !dashboardData) return;
    
    try {
      // 1. Call backend
      await updateApplicationStatus(applicationId, newStatus);
      
      // 2. Update local state
      const updatedApplications = dashboardData.applications.map(app => 
        app._id === applicationId 
          ? { ...app, status: newStatus as 'pending' | 'reviewed' | 'rejected' }
          : app
      );
      
      // 3. Recalculate metrics
      const newMetrics = {
        totalListings: dashboardData.metrics.totalListings,
        totalApplications: dashboardData.metrics.totalApplications,
        pendingApplications: updatedApplications.filter(app => app.status === 'pending').length,
        reviewedApplications: updatedApplications.filter(app => app.status === 'reviewed').length,
        rejectedApplications: updatedApplications.filter(app => app.status === 'rejected').length,
      };
      
      // 4. Update state with new data
      setDashboardData({
        ...dashboardData,
        applications: updatedApplications,
        metrics: newMetrics,
      });
      
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update status',
        color: 'red',
      });
    }
  };

  return (
    <>
      <PageMeta
        title="Dashboard | JobRocket"
        description="Manage your listings and applications."
        keywords="analytics, dashboard, job applications, manage job applications, manage job listings"
      />

      {isLoading ?  (
        <Center py={50} h="calc(100vh - 200px)">
          <Loader size="xl" variant="oval" />
        </Center>
      ) : (
        <Container size="xl" py="xl">
          <Stack gap="xl">
            {/* Header */}
            <div>
              <Title order={1} mb="xs">Dashboard</Title>
              <Text c="dimmed" size="lg">Welcome back! Here's your overview</Text>
            </div>

            {/* Metrics Overview */}
            <Group gap="md" grow>
              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Applications</Text>
                  <ThemeIcon color="blue" variant="light" size="lg" radius="md">
                    <IconUsers size={20} />
                  </ThemeIcon>
                </Group>
                <Text size="xl" fw={700}>{dashboardData?.metrics?.totalApplications || 0}</Text>
              </Paper>

              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">Total Listings</Text>
                  <ThemeIcon color="violet" variant="light" size="lg" radius="md">
                    <IconBriefcase size={20} />
                  </ThemeIcon>
                </Group>
                <Text size="xl" fw={700}>{dashboardData?.metrics?.totalListings || 0}</Text>
              </Paper>

              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">Pending</Text>
                  <ThemeIcon color="yellow" variant="light" size="lg" radius="md">
                    <IconClock size={20} />
                  </ThemeIcon>
                </Group>
                <Text size="xl" fw={700}>{dashboardData?.metrics?.pendingApplications || 0}</Text>
              </Paper>

              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">Reviewed</Text>
                  <ThemeIcon color="green" variant="light" size="lg" radius="md">
                    <IconChecks size={20} />
                  </ThemeIcon>
                </Group>
                <Text size="xl" fw={700}>{dashboardData?.metrics?.reviewedApplications || 0}</Text>
              </Paper>

              <Paper shadow="sm" p="md" radius="md" withBorder>
                <Group justify="space-between" mb="xs">
                  <Text size="xs" c="dimmed" fw={700} tt="uppercase">Rejected</Text>
                  <ThemeIcon color="red" variant="light" size="lg" radius="md">
                    <IconX size={20} />
                  </ThemeIcon>
                </Group>
                <Text size="xl" fw={700}>{dashboardData?.metrics?.rejectedApplications || 0}</Text>
              </Paper>
            </Group>

            {/* Active Job Listings */}
            <div>
              <Title order={2} mb="md">Active Job Listings</Title>

              <Flex gap="md" direction='row' wrap='wrap'>
                {dashboardData?.listings?.map((listing) => (
                  <Card key={listing._id} shadow="sm" padding="lg" radius="md" withBorder w={300}>
                    <Group gap="md">
                      <ThemeIcon size="xl" radius="md" variant="light" color="violet">
                        <IconBriefcase size={24} />
                      </ThemeIcon>
                      <div style={{ flex: 1 }}>
                        <Title order={4}>{listing.jobTitle}</Title>
                        <Text size="sm" c="dimmed" mt="xs" lineClamp={2}>
                          {listing.jobDescription}
                        </Text>
                      </div>
                    </Group>
                  </Card>
                ))}
              </Flex>
            </div>

            {/* Recent Applications */}
            <div>
              <Title order={2} mb="md">Recent Applications</Title>

              <Flex wrap='wrap' gap='md'>
                {dashboardData?.applications?.map((application) => (
                  <Card key={application._id} shadow="sm" padding="lg" radius="md" withBorder w={200}>
                    <Group justify="space-between" align="flex-start">
                      <Group gap="md">
                        <ThemeIcon size="xl" radius="md" variant="light" color="blue">
                          <IconFileText size={24} />
                        </ThemeIcon>
                        <div>
                          <Group gap="sm" align="center">
                            <Text fw={600} size="lg">
                              {application.firstName} {application.lastName}
                            </Text>
                            <Badge
                              color={
                                application.status === 'pending' ? 'yellow' :
                                application.status === 'reviewed' ? 'green' :
                                'red'
                              }
                              variant="light"
                            >
                              {application.status}
                            </Badge>
                          </Group>
                          <Text size="sm" c="dimmed" mt={4}>
                            {application.email}
                          </Text>
                          {application.phone && (
                            <Text size="sm" c="dimmed">
                              {application.phone}
                            </Text>
                          )}
                          {application.message && (
                            <Text size="sm" mt="sm" lineClamp={2}>
                              {application.message}
                            </Text>
                          )}
                        </div>
                        <Select
                          value={application.status}
                          onChange={(value) => handleStatusChange(application._id, value)}
                          data={[
                            { value: 'pending', label: 'Pending' },
                            { value: 'reviewed', label: 'Reviewed' },
                            { value: 'rejected', label: 'Rejected' },
                          ]}
                        />
                      </Group>
                    </Group>
                  </Card>
                ))}
              </Flex>
            </div>
          </Stack>
        </Container>
      )}
    </>
  )
}