import {
  IconBriefcase,
  IconChecks,
  IconClock,
  IconFileText,
  IconUsers,
  IconX,
} from '@tabler/icons-react';
import { Badge, Card, Flex, Group, Paper, Select, Text, ThemeIcon, Title } from '@mantine/core';
import { TBusinessDashboard } from '@/Types';
import { updateApplicationStatus } from './dashboardApi';
import { notifications } from '@mantine/notifications';

interface DashApplicationsProps {
  dashApplications?: TBusinessDashboard['applications'];
  onStatusChange: (applicationId: string, newStatus: string | null) => void;
}

export const DashApplications = ({ dashApplications, onStatusChange }: DashApplicationsProps) => {
  return (
    <div>
      <Title order={2} mb="md">
        Recent Applications
      </Title>

      <Flex wrap="wrap" gap="md">
        {dashApplications?.map((application) => (
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
                        application.status === 'pending'
                          ? 'yellow'
                          : application.status === 'reviewed'
                            ? 'green'
                            : 'red'
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
                  onChange={(value) => onStatusChange(application._id, value)}
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
  );
};
