import { useMemo } from 'react';
import { IconAlertTriangle, IconBriefcase, IconChecks, IconClock, IconUsers, IconX } from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, Text, ThemeIcon } from '@mantine/core';
import styles from '@/styles/gradients.module.css';
import { TDashboardMetrics, TListing } from '@/Types';

interface DashMetricsProps {
  dashboardMetrics?: TDashboardMetrics;
  listings?: TListing[];
}

export const DashMetrics = ({ dashboardMetrics, listings }: DashMetricsProps) => {
  // Calculate listings expiring within 7 days
  const expiringListingsCount = useMemo(() => {
    if (!listings) return 0;

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    return listings.filter((listing) => {
      if (!listing.expiresAt) return false;
      const expiresDate = new Date(listing.expiresAt);
      const now = new Date();
      return expiresDate >= now && expiresDate <= sevenDaysFromNow;
    }).length;
  }, [listings]);

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 6 }} spacing="md">
      <>
        <Paper shadow="sm" p="md" radius="md" withBorder className={styles.cardGradientSubtle}>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
              Total Applications
            </Text>
            <ThemeIcon color="rocketOrange" variant="light" size="lg" radius="md">
              <IconUsers size={20} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700}>
            {dashboardMetrics?.metrics?.totalApplications || 0}
          </Text>
        </Paper>
        <Paper shadow="sm" p="md" radius="md" withBorder className={styles.cardGradientRed}>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
              Total Listings
            </Text>
            <ThemeIcon color="rocketRed" variant="light" size="lg" radius="md">
              <IconBriefcase size={20} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700}>
            {dashboardMetrics?.metrics?.totalListings || 0}
          </Text>
        </Paper>
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
              Pending
            </Text>
            <ThemeIcon color="yellow" variant="light" size="lg" radius="md">
              <IconClock size={20} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700}>
            {dashboardMetrics?.metrics?.pendingApplications || 0}
          </Text>
        </Paper>
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
              Reviewed
            </Text>
            <ThemeIcon color="green" variant="light" size="lg" radius="md">
              <IconChecks size={20} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700}>
            {dashboardMetrics?.metrics?.reviewedApplications || 0}
          </Text>
        </Paper>
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
              Rejected
            </Text>
            <ThemeIcon color="red" variant="light" size="lg" radius="md">
              <IconX size={20} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700}>
            {dashboardMetrics?.metrics?.rejectedApplications || 0}
          </Text>
        </Paper>
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
              Expiring Soon
            </Text>
            <ThemeIcon color="blue" variant="light" size="lg" radius="md">
              <IconAlertTriangle size={20} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700}>
            {expiringListingsCount}
          </Text>
          <Text size="xs" c="dimmed" mt={4}>
            Within 7 days
          </Text>
        </Paper>
      </>
    </SimpleGrid>
  );
};
