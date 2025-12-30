import {
  Accordion,
  Badge,
  Button,
  Group,
  List,
  Modal,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from '@mantine/core';
import {
  IconAlertCircle,
  IconAlertTriangle,
  IconBriefcase,
  IconCalendar,
  IconChecks,
  IconClock,
  IconTrash,
  IconUsers,
  IconX,
} from '@tabler/icons-react';

type DashboardGuideModalProps = {
  opened: boolean;
  close: () => void;
};

export const DashboardGuideModal = ({ opened, close }: DashboardGuideModalProps) => {
  return (
    <Modal
      opened={opened}
      onClose={close}
      title={
        <Title order={2} size="h3">
          Dashboard Guide
        </Title>
      }
      size="xl"
      centered
    >
      <Stack gap="lg">
        <Text>
          Welcome to your JobRocket Business Dashboard! This guide will help you understand how to
          manage your job listings and applications effectively.
        </Text>

        <Accordion variant="separated" radius="md">
          {/* Understanding Your Metrics */}
          <Accordion.Item value="metrics">
            <Accordion.Control>
              <Group gap="sm">
                <ThemeIcon color="blue" variant="light" size="md" radius="md">
                  <IconBriefcase size={18} />
                </ThemeIcon>
                <Text fw={600}>Understanding Your Metrics</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                <Text size="sm">
                  The metrics cards at the top of your dashboard provide a quick overview of your
                  hiring activity:
                </Text>
                <List size="sm" spacing="xs">
                  <List.Item>
                    <strong>Total Applications:</strong> All applications received across all
                    listings
                  </List.Item>
                  <List.Item>
                    <strong>Total Listings:</strong> Your active job postings visible to job seekers
                  </List.Item>
                  <List.Item>
                    <strong>Pending:</strong> Applications awaiting your review
                  </List.Item>
                  <List.Item>
                    <strong>Reviewed:</strong> Applications you've marked as reviewed
                  </List.Item>
                  <List.Item>
                    <strong>Rejected:</strong> Applications you've declined
                  </List.Item>
                  <List.Item>
                    <strong>Listings Expiring Soon:</strong> Listings expiring within 7 days
                  </List.Item>
                  <List.Item>
                    <strong>Applications Expiring Soon:</strong> Applications for listings expiring
                    within 30 days
                  </List.Item>
                  <List.Item>
                    <strong>In Grace Period:</strong> <Badge color="red" size="sm">URGENT</Badge>{' '}
                    Applications for expired listings (will be deleted in 0-7 days)
                  </List.Item>
                </List>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Job Listing Lifecycle */}
          <Accordion.Item value="lifecycle">
            <Accordion.Control>
              <Group gap="sm">
                <ThemeIcon color="orange" variant="light" size="md" radius="md">
                  <IconCalendar size={18} />
                </ThemeIcon>
                <Text fw={600}>Job Listing Lifecycle & Grace Period</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                <Text size="sm" fw={600}>
                  All job listings follow this lifecycle:
                </Text>
                <Stack gap="xs">
                  <Group gap="xs" align="flex-start">
                    <ThemeIcon color="green" size="sm" radius="xl">
                      1
                    </ThemeIcon>
                    <div>
                      <Text size="sm" fw={600}>
                        Active Period
                      </Text>
                      <Text size="xs" c="dimmed">
                        Your listing is visible to job seekers until the expiration date (max 90
                        days from creation). All listings MUST have an expiration date.
                      </Text>
                    </div>
                  </Group>

                  <Group gap="xs" align="flex-start">
                    <ThemeIcon color="orange" size="sm" radius="xl">
                      2
                    </ThemeIcon>
                    <div>
                      <Text size="sm" fw={600}>
                        7-Day Grace Period <Badge color="orange" size="xs">NEW</Badge>
                      </Text>
                      <Text size="xs" c="dimmed">
                        After expiration, your listing enters a 7-day grace period. The listing is
                        hidden from job seekers but remains in your dashboard with a red warning
                        icon. You can extend it during this time.
                      </Text>
                    </div>
                  </Group>

                  <Group gap="xs" align="flex-start">
                    <ThemeIcon color="red" size="sm" radius="xl">
                      3
                    </ThemeIcon>
                    <div>
                      <Text size="sm" fw={600}>
                        Permanent Deletion
                      </Text>
                      <Text size="xs" c="dimmed">
                        If not extended within 7 days, the listing and ALL associated applications
                        are permanently deleted (including resumes).
                      </Text>
                    </div>
                  </Group>
                </Stack>

                <Text size="xs" c="red" fw={600}>
                  ⚠️ Important: Manually deleted listings are removed immediately without a grace
                  period!
                </Text>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Dashboard Warnings */}
          <Accordion.Item value="warnings">
            <Accordion.Control>
              <Group gap="sm">
                <ThemeIcon color="red" variant="light" size="md" radius="md">
                  <IconAlertCircle size={18} />
                </ThemeIcon>
                <Text fw={600}>Dashboard Warning Indicators</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                <Text size="sm">Watch for these visual warnings in your listings:</Text>

                <Stack gap="sm">
                  <Group gap="xs">
                    <IconAlertCircle size={20} color="red" />
                    <div>
                      <Text size="sm" fw={600}>
                        Red Exclamation Icon
                      </Text>
                      <Text size="xs" c="dimmed">
                        Appears next to expired listings in grace period. Hover to see days
                        remaining until deletion.
                      </Text>
                    </div>
                  </Group>

                  <Group gap="xs">
                    <Badge color="red">EXPIRED</Badge>
                    <div>
                      <Text size="sm" fw={600}>
                        "EXPIRED" Label
                      </Text>
                      <Text size="xs" c="dimmed">
                        Shows on listings in grace period with countdown: "Deletes in X days"
                      </Text>
                    </div>
                  </Group>

                  <div>
                    <Text size="sm" fw={600}>
                      Red Alert Banner
                    </Text>
                    <Text size="xs" c="dimmed">
                      Appears at the top when you have expired listings, showing total count and
                      urging you to extend them.
                    </Text>
                  </div>
                </Stack>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Managing Applications */}
          <Accordion.Item value="applications">
            <Accordion.Control>
              <Group gap="sm">
                <ThemeIcon color="green" variant="light" size="md" radius="md">
                  <IconUsers size={18} />
                </ThemeIcon>
                <Text fw={600}>Managing Applications</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                <Text size="sm">
                  Click on any listing to view and manage its applications. You can:
                </Text>
                <List size="sm" spacing="xs">
                  <List.Item icon={<IconClock size={16} />}>
                    <strong>Pending:</strong> Applications awaiting your review
                  </List.Item>
                  <List.Item icon={<IconChecks size={16} />}>
                    <strong>Mark as Reviewed:</strong> Flag applications you've assessed (candidates
                    are notified)
                  </List.Item>
                  <List.Item icon={<IconX size={16} />}>
                    <strong>Reject:</strong> Decline applications (candidates are notified)
                  </List.Item>
                </List>

                <Text size="xs" c="orange" fw={600}>
                  ⚠️ Review applications before listings expire! Applications are permanently
                  deleted 7 days after listing expiration.
                </Text>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Best Practices */}
          <Accordion.Item value="best-practices">
            <Accordion.Control>
              <Group gap="sm">
                <ThemeIcon color="teal" variant="light" size="md" radius="md">
                  <IconAlertTriangle size={18} />
                </ThemeIcon>
                <Text fw={600}>Best Practices</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                <List size="sm" spacing="sm">
                  <List.Item>
                    <strong>Check "In Grace Period" metric daily:</strong> This is your most urgent
                    metric - these applications will be deleted within days!
                  </List.Item>
                  <List.Item>
                    <strong>Extend listings proactively:</strong> Don't wait for the grace period -
                    extend listings before they expire if you're still hiring.
                  </List.Item>
                  <List.Item>
                    <strong>Review applications promptly:</strong> Candidates appreciate timely
                    responses. Use the "Pending" count to track unreviewed applications.
                  </List.Item>
                  <List.Item>
                    <strong>Set realistic expiration dates:</strong> Choose dates that match your
                    actual hiring timeline (max 90 days).
                  </List.Item>
                  <List.Item>
                    <strong>Act on red warnings:</strong> Red icons and badges mean urgent action is
                    needed to prevent data loss.
                  </List.Item>
                </List>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>

          {/* Account Deletion */}
          <Accordion.Item value="account-deletion">
            <Accordion.Control>
              <Group gap="sm">
                <ThemeIcon color="gray" variant="light" size="md" radius="md">
                  <IconTrash size={18} />
                </ThemeIcon>
                <Text fw={600}>Account Deletion & Recovery</Text>
              </Group>
            </Accordion.Control>
            <Accordion.Panel>
              <Stack gap="md">
                <Text size="sm">
                  If you delete your account, it enters a <strong>30-day grace period</strong>:
                </Text>
                <List size="sm" spacing="xs">
                  <List.Item>Your profile is immediately hidden from all users</List.Item>
                  <List.Item>You cannot log in during this period</List.Item>
                  <List.Item>Your account data is preserved for 30 days</List.Item>
                  <List.Item>
                    You can restore your account by emailing{' '}
                    <strong>support@jobrocket.work</strong> within 30 days
                  </List.Item>
                  <List.Item>
                    After 30 days, all personal data is permanently deleted and cannot be recovered
                  </List.Item>
                </List>
              </Stack>
            </Accordion.Panel>
          </Accordion.Item>
        </Accordion>

        <Group justify="center" mt="md">
          <Button onClick={close}>Got it!</Button>
        </Group>
      </Stack>
    </Modal>
  );
};
