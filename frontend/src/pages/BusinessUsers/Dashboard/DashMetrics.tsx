import { IconBriefcase, IconChecks, IconClock, IconUsers, IconX } from '@tabler/icons-react';
import { Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { TDashboardMetrics } from '@/Types';
import styles from '@/styles/gradients.module.css';

interface DashMetricsProps {
  dashboardMetrics?: TDashboardMetrics;
}

export const DashMetrics = ({ dashboardMetrics }: DashMetricsProps) => {
  return (
    <Group gap="md" grow>
      <>
        <Paper
          shadow="sm"
          p="md"
          radius="md"
          withBorder
          className={styles.cardGradientSubtle}
        >
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
        <Paper
          shadow="sm"
          p="md"
          radius="md"
          withBorder
          className={styles.cardGradientRed}
        >
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
      </>
    </Group>
  );
};
