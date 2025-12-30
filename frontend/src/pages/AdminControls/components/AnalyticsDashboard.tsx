import { Card, Flex, Grid, Group, Loader, Stack, Table, Text, Title } from '@mantine/core';
import { formatDate } from '@/utils/dateUtils';
import { useAnalytics } from '../hooks/useAnalytics';

/**
 * AnalyticsDashboard Component
 *
 * Displays platform analytics for admin users including:
 * - Platform metrics (jobs, applications, users, engagement)
 * - Search insights (top searched terms)
 * - Popular jobs (most viewed listings)
 * - Application funnel metrics
 *
 * Data is fetched via the useAnalytics hook which calls the backend analytics API.
 */
export const AnalyticsDashboard = () => {
  const { platformMetrics, searchInsights, popularJobs, applicationMetrics, isLoading, error } =
    useAnalytics();

  // Loading state
  if (isLoading) {
    return (
      <Flex align="center" direction="column" mt={50}>
        <Text size="xl" fw={600}>
          Loading Analytics...
        </Text>
        <Loader color="cyan" size="xl" mt={30} />
      </Flex>
    );
  }

  // Error state
  if (error) {
    return (
      <Flex align="center" direction="column" mt={50}>
        <Text size="xl" fw={600} c="red">
          Error Loading Analytics
        </Text>
        <Text size="md" c="dimmed" mt="md">
          {error}
        </Text>
      </Flex>
    );
  }

  return (
    <Stack gap="xl" w="100%">
      {/* Platform Metrics Cards */}
      <div>
        <Title order={2} mb="md">
          Platform Metrics
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Total Jobs
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {platformMetrics?.jobs.total || 0}
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Total Users
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {platformMetrics?.users.total || 0}
              </Text>
              <Group gap="xs" mt="xs">
                <Text size="xs" c="dimmed">
                  Jobseekers: {platformMetrics?.users.jobseekers || 0}
                </Text>
                <Text size="xs" c="dimmed">
                  •
                </Text>
                <Text size="xs" c="dimmed">
                  Businesses: {platformMetrics?.users.businesses || 0}
                </Text>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Applications (30d)
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {platformMetrics?.applications.last30Days || 0}
              </Text>
              <Group gap="xs" mt="xs">
                <Text size="xs" c="dimmed">
                  7d: {platformMetrics?.applications.last7Days || 0}
                </Text>
                <Text size="xs" c="dimmed">
                  •
                </Text>
                <Text size="xs" c="dimmed">
                  Total: {platformMetrics?.applications.total || 0}
                </Text>
              </Group>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 3 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Conversion Rate (30d)
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {platformMetrics?.engagement.conversionRate30d?.toFixed(2) || 0}%
              </Text>
              <Text size="xs" c="dimmed" mt="xs">
                Applications per view
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Job Views (30d)
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {platformMetrics?.engagement.jobViews30d || 0}
              </Text>
              <Text size="xs" c="dimmed" mt="xs">
                7d: {platformMetrics?.engagement.jobViews7d || 0}
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Searches (30d)
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {platformMetrics?.engagement.searches30d || 0}
              </Text>
              <Text size="xs" c="dimmed" mt="xs">
                7d: {platformMetrics?.engagement.searches7d || 0}
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 6, md: 4 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Application Status
              </Text>
              <Stack gap={4} mt="xs">
                <Group gap="xs">
                  <Text size="sm" fw={500}>
                    Pending:
                  </Text>
                  <Text size="sm" c="dimmed">
                    {applicationMetrics?.applicationsByStatus.pending || 0}
                  </Text>
                </Group>
                <Group gap="xs">
                  <Text size="sm" fw={500}>
                    Reviewed:
                  </Text>
                  <Text size="sm" c="dimmed">
                    {applicationMetrics?.applicationsByStatus.reviewed || 0}
                  </Text>
                </Group>
                <Group gap="xs">
                  <Text size="sm" fw={500}>
                    Rejected:
                  </Text>
                  <Text size="sm" c="dimmed">
                    {applicationMetrics?.applicationsByStatus.rejected || 0}
                  </Text>
                </Group>
              </Stack>
            </Card>
          </Grid.Col>
        </Grid>
      </div>

      {/* Search Insights */}
      <div>
        <Title order={2} mb="md">
          Top Search Terms (Last 30 Days)
        </Title>
        {!searchInsights || searchInsights.length === 0 ? (
          <Card withBorder padding="lg">
            <Text c="dimmed" ta="center">
              No search data available yet
            </Text>
          </Card>
        ) : (
          <Card withBorder padding="0">
            <Table.ScrollContainer minWidth={500}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Search Query</Table.Th>
                    <Table.Th>Search Count</Table.Th>
                    <Table.Th>Avg Results</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {searchInsights.map((insight, index) => (
                    <Table.Tr key={index}>
                      <Table.Td>
                        <Text fw={500}>{insight.query}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text>{insight.searchCount}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text c="dimmed">{insight.avgResults}</Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Card>
        )}
      </div>

      {/* Popular Jobs */}
      <div>
        <Title order={2} mb="md">
          Most Viewed Jobs (Last 30 Days)
        </Title>
        {!popularJobs || popularJobs.length === 0 ? (
          <Card withBorder padding="lg">
            <Text c="dimmed" ta="center">
              No job view data available yet
            </Text>
          </Card>
        ) : (
          <Card withBorder padding="0">
            <Table.ScrollContainer minWidth={700}>
              <Table striped highlightOnHover>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Job Title</Table.Th>
                    <Table.Th>Company</Table.Th>
                    <Table.Th>City</Table.Th>
                    <Table.Th>Views (30d)</Table.Th>
                    <Table.Th>Total Views</Table.Th>
                    <Table.Th>Created</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>
                  {popularJobs.map((job) => (
                    <Table.Tr key={job._id}>
                      <Table.Td>
                        <Text fw={500}>{job.jobTitle}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text>{job.companyName}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text c="dimmed">{job.city}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text fw={600} c="blue">
                          {job.viewsLast30Days}
                        </Text>
                      </Table.Td>
                      <Table.Td>
                        <Text c="dimmed">{job.totalViews}</Text>
                      </Table.Td>
                      <Table.Td>
                        <Text size="sm" c="dimmed">
                          {formatDate(job.createdAt)}
                        </Text>
                      </Table.Td>
                    </Table.Tr>
                  ))}
                </Table.Tbody>
              </Table>
            </Table.ScrollContainer>
          </Card>
        )}
      </div>

      {/* Application Funnel Metrics */}
      <div>
        <Title order={2} mb="md">
          Application Funnel (Last 30 Days)
        </Title>
        <Grid>
          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Total Job Views
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {applicationMetrics?.totalViews || 0}
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                Total Applications
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {applicationMetrics?.totalApplications || 0}
              </Text>
            </Card>
          </Grid.Col>

          <Grid.Col span={{ base: 12, sm: 4 }}>
            <Card withBorder padding="lg">
              <Text size="sm" c="dimmed" fw={500}>
                View to Application Rate
              </Text>
              <Text size="xl" fw={700} mt="xs">
                {applicationMetrics?.viewToApplicationRate?.toFixed(2) || 0}%
              </Text>
              <Text size="xs" c="dimmed" mt="xs">
                How many views result in applications
              </Text>
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </Stack>
  );
};
