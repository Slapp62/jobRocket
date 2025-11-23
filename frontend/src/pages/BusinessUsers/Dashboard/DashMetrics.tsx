import { IconBriefcase, IconChecks, IconClock, IconUsers, IconX } from '@tabler/icons-react';
import { Group, Paper, Text, ThemeIcon } from '@mantine/core';
import { TBusinessDashboard } from '@/Types';

interface DashMetricsProps {
  dashboardData?: TBusinessDashboard;
}

export const DashMetrics = ({ dashboardData }: DashMetricsProps) => {
  return (
    <Group gap="md" grow>
      <>
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
              Total Applications
            </Text>
            <ThemeIcon color="blue" variant="light" size="lg" radius="md">
              <IconUsers size={20} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700}>
            {dashboardData?.metrics?.totalApplications || 0}
          </Text>
        </Paper>
        <Paper shadow="sm" p="md" radius="md" withBorder>
          <Group justify="space-between" mb="xs">
            <Text size="xs" c="dimmed" fw={700} tt="uppercase">
              Total Listings
            </Text>
            <ThemeIcon color="violet" variant="light" size="lg" radius="md">
              <IconBriefcase size={20} />
            </ThemeIcon>
          </Group>
          <Text size="xl" fw={700}>
            {dashboardData?.metrics?.totalListings || 0}
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
            {dashboardData?.metrics?.pendingApplications || 0}
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
            {dashboardData?.metrics?.reviewedApplications || 0}
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
            {dashboardData?.metrics?.rejectedApplications || 0}
          </Text>
        </Paper>
      </>
    </Group>
  );
};
