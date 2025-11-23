import { IconBriefcase, IconChecks, IconClock, IconUsers, IconX } from '@tabler/icons-react';
import { Card, Flex, Group, Paper, Text, ThemeIcon, Title } from '@mantine/core';
import { TBusinessDashboard } from '@/Types';

interface DashListingsProps {
  dashboardData?: TBusinessDashboard;
}

export const DashListings = ({ dashboardData }: DashListingsProps) => {
  return (
    <div>
      <Title order={2} mb="md">
        Active Job Listings
      </Title>

      <Flex gap="md" direction="row" wrap="wrap">
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
  );
};
