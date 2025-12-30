import { useMemo } from 'react';
import {
  IconAlertTriangle,
  IconBriefcase,
  IconChecks,
  IconClock,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, Text, ThemeIcon, Tooltip, Box } from '@mantine/core';
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
    if (!listings) {return 0;}

    const sevenDaysFromNow = new Date();
    sevenDaysFromNow.setDate(sevenDaysFromNow.getDate() + 7);

    return listings.filter((listing) => {
      if (!listing.expiresAt) {return false;}
      const expiresDate = new Date(listing.expiresAt);
      const now = new Date();
      return expiresDate >= now && expiresDate <= sevenDaysFromNow;
    }).length;
  }, [listings]);

  // Calculate applications for listings expiring within 30 days
  const expiringApplicationsCount = useMemo(() => {
    if (!listings || !applications) {return 0;}

    const thirtyDaysFromNow = new Date();
    thirtyDaysFromNow.setDate(thirtyDaysFromNow.getDate() + 30);
    const now = new Date();

    // Find listings expiring within 30 days and get their IDs as strings
    const expiringListingIds = listings
      .filter((listing) => {
        if (!listing.expiresAt) {return false;}
        const expiresDate = new Date(listing.expiresAt);
        return expiresDate >= now && expiresDate <= thirtyDaysFromNow;
      })
      .map((listing) => String(listing._id));

    // Count applications for those listings
    return applications.filter((app: TApplication) =>
      expiringListingIds.includes(String(app.listingId))
    ).length;
  }, [listings, applications]);

  // Calculate applications for listings in grace period (expired but not yet deleted)
  const gracePeriodApplicationsCount = useMemo(() => {
    if (!listings || !applications) {return 0;}

    const now = new Date();
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    // Find listings in grace period (expired 0-7 days ago)
    const gracePeriodListingIds = listings
      .filter((listing) => {
        if (!listing.expiresAt) {return false;}
        const expiresDate = new Date(listing.expiresAt);
        return expiresDate < now && expiresDate > sevenDaysAgo;
      })
      .map((listing) => String(listing._id));

    // Count applications for those listings
    return applications.filter((app: TApplication) =>
      gracePeriodListingIds.includes(String(app.listingId))
    ).length;
  }, [listings, applications]);

  return (
    <SimpleGrid cols={{ base: 2, sm: 3, md: 7 }} spacing="md">
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
              <Box visibleFrom="sm">
                <ThemeIcon color="rocketOrange" variant="light" size="lg" radius="md">
                  <IconUsers size={20} />
                </ThemeIcon>
              </Box>
            </Group>
            <Text size="xl" fw={700}>
              {dashboardMetrics?.metrics?.totalApplications || 0}
            </Text>
          </Paper>
        </Tooltip>

        {/* Total Listings */}
        <Tooltip
          label="Active job postings currently visible to job seekers. All listings must have an expiration date (max 90 days from creation). After expiration, listings enter a 7-day grace period before deletion."
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
              <Box visibleFrom="sm">
                <ThemeIcon color="rocketRed" variant="light" size="lg" radius="md">
                  <IconBriefcase size={20} />
                </ThemeIcon>
              </Box>
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
          <Paper shadow="sm" p="md" radius="md" withBorder className={styles.cardGradientYellow}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                Pending
              </Text>
              <Box visibleFrom="sm">
                <ThemeIcon color="yellow" variant="light" size="lg" radius="md">
                  <IconClock size={20} />
                </ThemeIcon>
              </Box>
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
          <Paper shadow="sm" p="md" radius="md" withBorder className={styles.cardGradientGreen}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                Reviewed
              </Text>
              <Box visibleFrom="sm">
                <ThemeIcon color="green" variant="light" size="lg" radius="md">
                  <IconChecks size={20} />
                </ThemeIcon>
              </Box>
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
          <Paper shadow="sm" p="md" radius="md" withBorder className={styles.cardGradientRedDark}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                Rejected
              </Text>
              <Box visibleFrom="sm">
                <ThemeIcon color="red" variant="light" size="lg" radius="md">
                  <IconX size={20} />
                </ThemeIcon>
              </Box>
            </Group>
            <Text size="xl" fw={700}>
              {dashboardMetrics?.metrics?.rejectedApplications || 0}
            </Text>
          </Paper>
        </Tooltip>

        {/* Listings Expiring Soon */}
        <Tooltip
          label="Listings that will expire within 7 days. After expiration, listings enter a 7-day grace period where you can extend them. If not extended, they're permanently deleted after 7 days (along with all applications)."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
          <Paper shadow="sm" p="md" radius="md" withBorder className={styles.cardGradientBlue}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                Listings Expiring Soon
              </Text>
              <Box visibleFrom="sm">
                <ThemeIcon color="blue" variant="light" size="lg" radius="md">
                  <IconAlertTriangle size={20} />
                </ThemeIcon>
              </Box>
            </Group>
            <Text size="xl" fw={700}>
              {expiringListingsCount}
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              Within 7 days
            </Text>
          </Paper>
        </Tooltip>

        {/* Applications Expiring Soon */}
        <Tooltip
          label="Applications for job listings expiring within 30 days. Review these soon - applications are permanently deleted 7 days after the listing expires (end of grace period)."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
          <Paper shadow="sm" p="md" radius="md" withBorder className={styles.cardGradientOrange}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                Applications Expiring Soon
              </Text>
              <Box visibleFrom="sm">
                <ThemeIcon color="orange" variant="light" size="lg" radius="md">
                  <IconAlertTriangle size={20} />
                </ThemeIcon>
              </Box>
            </Group>
            <Text size="xl" fw={700}>
              {expiringApplicationsCount}
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              Within 30 days
            </Text>
          </Paper>
        </Tooltip>

        {/* Applications in Grace Period - URGENT */}
        <Tooltip
          label="Applications for listings that have ALREADY EXPIRED and are in the 7-day grace period. Most urgent! These will be permanently deleted soon unless you extend the listing."
          multiline
          w={220}
          withArrow
          position="top"
          events={{ hover: true, focus: true, touch: true }}
        >
          <Paper shadow="sm" p="md" radius="md" withBorder className={styles.cardGradientRedDark}>
            <Group justify="space-between" mb="xs">
              <Text size="xs" c="dimmed" fw={700} tt="uppercase">
                In Grace Period
              </Text>
              <Box visibleFrom="sm">
                <ThemeIcon color="red" variant="light" size="lg" radius="md">
                  <IconAlertTriangle size={20} />
                </ThemeIcon>
              </Box>
            </Group>
            <Text size="xl" fw={700}>
              {gracePeriodApplicationsCount}
            </Text>
            <Text size="xs" c="dimmed" mt={4}>
              Expires in 0-7 days
            </Text>
          </Paper>
        </Tooltip>
      </>
    </SimpleGrid>
  );
};
