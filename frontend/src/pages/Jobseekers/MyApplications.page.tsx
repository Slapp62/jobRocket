import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router';
import { Badge, Button, Card, Center, Flex, Loader, Stack, Text, Title, useComputedColorScheme } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { EmptyState } from '@/components/EmptyState';
import { EditApplicationModal } from '../../components/Modals/EditApplicationModal';
import { ListingDetailsModal } from '../../components/Modals/ListingDetailsModal';
import { PageMeta } from '@/SEO/PageMeta';
import { TApplication, TListing } from '@/Types';
import { formatDate } from '@/utils/dateUtils';

export function MyApplications() {
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<TApplication[]>([]);
  const [noListings, setNoListings] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedListing, setSelectedListing] = useState<TListing | null>(null);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [selectedApplication, setSelectedApplication] = useState<TApplication | null>(null);
  const navigate = useNavigate();
  const computedColorScheme = useComputedColorScheme('light');

  // Centralized theme-aware colors
  const textHeaderColor = computedColorScheme === 'light' ? 'rocketGray.9' : 'rocketBlack.1';

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/applications/my-applications');

        response.data.length > 0 ? setApplications(response.data) : setNoListings(true);
      } catch (error: any) {
        notifications.show({
          title: 'Error',
          message: error.response?.data?.message || error.message,
          color: 'red',
        });
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };
    fetchApplications();
  }, []);

  const handleViewListing = (listing: any) => {
    setSelectedListing(listing);
    open();
  };

  const handleEditApplication = (application: TApplication) => {
    setSelectedApplication(application);
    openEdit();
  };

  const handleApplicationUpdated = () => {
    // Refetch applications after update
    const fetchApplications = async () => {
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_URL;
        const response = await axios.get(`${API_BASE_URL}/api/applications/my-applications`, {
          headers: { 'x-auth-token': token },
        });
        setApplications(response.data);
      } catch (error: any) {
        notifications.show({
          title: 'Error',
          message: 'Failed to refresh applications',
          color: 'red',
        });
      }
    };
    fetchApplications();
  };

  return (
    <>
      <PageMeta
        title="My Applications | JobRocket"
        description="Manage your job applications on JobRocket"
        keywords="job applications, manage job applications, job listings"
      />

      {isLoading ? (
        <Center py={50} h="calc(100vh - 200px)">
          <Loader size="xl" variant="oval" />
        </Center>
      ) : (
        <Stack w="100%" gap="md">
          <Title ta="center" order={2} my={15} c={textHeaderColor}>
            Applications
          </Title>

          {noListings ? (
            <EmptyState
              title="No Applications Found"
              description="You haven't applied to any jobs yet. Start exploring opportunities and apply to your dream job!"
              action={{
                label: 'Browse Jobs',
                onClick: () => navigate('/search'),
              }}
            />
          ) : null}

          <Flex w="100%" gap="md" wrap="wrap" align="stretch" justify="center">
            {applications.map((application, index) => (
              <Card withBorder key={index} p="md" w={{ base: '90%', md: '250px' }} style={{ display: 'flex' }}>
                <Stack h="100%" w="100%" justify="space-between" style={{ flex: 1 }}>
                  {typeof application.listingId === 'object' && (
                    <Title order={5}>{application.listingId.companyName}</Title>
                  )}
                  {typeof application.listingId === 'object' && (
                    <Text>{application.listingId.jobTitle}</Text>
                  )}
                  <Badge
                    variant="outline"
                    c={
                      application.status === 'rejected'
                        ? 'red'
                        : application.status === 'pending'
                          ? 'yellow'
                          : 'green'
                    }
                  >
                    {application.status}
                  </Badge>
                  <Text fz="sm" c="dimmed">
                    Submitted on {formatDate(application.createdAt)}
                  </Text>
                  <Button
                    variant="outline"
                    onClick={() => handleViewListing(application.listingId)}
                  >
                    View Listing
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => handleEditApplication(application)}
                    disabled={application.status !== 'pending'}
                  >
                    Edit Application
                  </Button>
                </Stack>
              </Card>
            ))}
          </Flex>
        </Stack>
      )}

      <ListingDetailsModal opened={opened} onClose={close} listing={selectedListing} />
      <EditApplicationModal
        opened={editOpened}
        onClose={closeEdit}
        application={selectedApplication}
        onSuccess={handleApplicationUpdated}
      />
    </>
  );
}
