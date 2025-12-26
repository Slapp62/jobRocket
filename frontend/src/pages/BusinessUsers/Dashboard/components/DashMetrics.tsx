import { useMemo } from 'react';
import { IconAlertTriangle, IconBriefcase, IconChecks, IconClock, IconUsers, IconX } from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, Text, ThemeIcon, Tooltip } from '@mantine/core';
import styles from '@/styles/gradients.module.css';
import { TApplication, TDashboardMetrics, TListing } from '@/Types';

interface DashMetricsProps {
  dashboardMetrics?: TDashboardMetrics;
  listings?: TListing[];
  applications?: TApplication[];
}

export const DashMetrics = ({ dashboardMetrics, listings, applications }: DashMetricsProps) => {
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

  // Calculate applications for listings expiring within 30 days
  const expiringApplicationsCount = useMemo(() => {
    if (!listings || !applications) return 0;

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const now = new Date();

    // Find listings expiring within 30 days and get their IDs as strings
    const expiringListingIds = listings
      .filter((listing) => {
        if (!listing.expiresAt) return false;
        const expiresDate = new Date(listing.expiresAt);
        return expiresDate >= now && expiresDate <= thirtyDaysFromNow;
      })
      .map((listing) => String(listing._id));

    // Count applications for those listings
    return applications.filter((app: TApplication) =>
      expiringListingIds.includes(String(app.listingId))
    ).length;
  }, [listings, applications]);

  return (
    <SimpleGrid cols={{ base: 1, xs: 2, sm: 3, md: 6 }} spacing="md">
      <>
        {/* Total Applications */}
        <Tooltip
          label="All applications received across all your job listings, including pending, reviewed, and rejected applications."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
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
        </Tooltip>

        {/* Total Listings */}
        <Tooltip
          label="Active job postings currently visible to job seekers. Listings expire 30 days after creation unless manually deleted or renewed."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
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
        </Tooltip>

        {/* Pending Applications */}
        <Tooltip
          label="Applications you haven't reviewed yet. Review them to help candidates know their status."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
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
        </Tooltip>

        {/* Reviewed Applications */}
        <Tooltip
          label="Applications you've marked as reviewed. These candidates have been notified of their application status."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
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
        </Tooltip>

        {/* Rejected Applications */}
        <Tooltip
          label="Applications you've marked as rejected. These candidates have been notified they were not selected."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
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
        </Tooltip>

        {/* Listings Expiring Soon */}
        <Tooltip
          label="Listings that will expire within 7 days. After expiration, listings are hidden from job seekers and deleted 90 days later (along with applications)."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                Listings Expiring Soon
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
        </Tooltip>

        {/* Applications Expiring Soon - NEW */}
        <Tooltip
          label="Applications for job listings expiring within 30 days. Review these soon - applications are deleted 90 days after the listing expires."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
          <Paper shadow="sm" p="md" radius="md" withBorder>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                Applications Expiring Soon
              </Text>
              <ThemeIcon color="orange" variant="light" size="lg" radius="md">
                <IconAlertTriangle size={20} />
              </ThemeIcon>
            </Group>
            <Text size="xl" fw={700}>
              {expiringApplicationsCount}
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              Within 30 days
            </Text>
          </Paper>
        </Tooltip>
      </>
    </SimpleGrid>
  );
};
