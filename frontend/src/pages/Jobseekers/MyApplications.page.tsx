import { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { Badge, Button, Card, Center, Flex, Loader, Stack, Text, Title } from '@mantine/core';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { EditApplicationModal } from '@/components/Modals/EditApplicationModal';
import { ListingDetailsModal } from '@/components/Modals/ListingDetailsModal';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';
import { TApplication, TListing } from '@/Types';

export function MyApplications() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isMobile = useMediaQuery('(max-width: 500px)');
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<TApplication[]>([]);
  const [noListings, setNoListings] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);
  const [selectedListing, setSelectedListing] = useState<TListing | null>(null);
  const [editOpened, { open: openEdit, close: closeEdit }] = useDisclosure(false);
  const [selectedApplication, setSelectedApplication] = useState<TApplication | null>(null);

  useEffect(() => {
    const fetchApplications = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('token') || sessionStorage.getItem('token');
        const API_BASE_URL = import.meta.env.VITE_API_URL;

        const response = await axios.get(`${API_BASE_URL}/api/applications/my-applications`, {
          headers: { 'x-auth-token': token },
        });

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
        console.error('Failed to refresh applications:', error);
      }
    };
    fetchApplications();
  };

  return (
    <>
      <PageMeta
        title="Job Applications | JobRocket"
        description="Manage your job applications on JobRocket"
        keywords="job applications, manage job applications, job listings"
      />

      {isLoading ? (
        <Center py={50} h="calc(100vh - 200px)">
          <Loader size="xl" variant="oval" />
        </Center>
      ) : (
        <Stack w="100%" gap="md">
          <Title ta="center" order={2} my={15} c="rocketRed.9">
            Applications
          </Title>

          {noListings ? <Text>No applications found</Text> : null}

          <Flex w="100%" gap="md" wrap="wrap" align="stretch" justify="center">
            {applications.map((application, index) => (
              <Card withBorder key={index} p="md" w="250px" style={{ display: 'flex' }}>
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
                    Submitted on {new Date(application.createdAt).toLocaleDateString()}
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
