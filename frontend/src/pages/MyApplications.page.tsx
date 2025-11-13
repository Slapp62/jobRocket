import axios from 'axios';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Flex, Skeleton, Title, Text, Center, Stack, Loader, Card, Badge } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';
import { useEffect, useState } from 'react';
import { TApplication } from '@/Types';
import { notifications } from '@mantine/notifications';

export function MyApplications() {
  const user = useSelector((state: RootState) => state.userSlice.user);
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width: 500px)');
  const [isLoading, setIsLoading] = useState(false);
  const [applications, setApplications] = useState<TApplication[]>([]);
  const [noListings, setNoListings] = useState(false);

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
  console.log(applications);
  return (
    <>
      <PageMeta
        title="Job Applications | JobRocket"
        description="Manage your job applications on JobRocket"
        keywords="job applications, manage job applications, job listings"
      />

    {isLoading ?  
      <Center py={50} h="calc(100vh - 200px)">
        <Loader size="xl" variant="oval"/>
      </Center> 
      : 
      <Stack w="100%" gap="md">
        <Title ta="center" order={2}>Applications</Title>

        {noListings ? <Text>No applications found</Text> : null}

        <Flex w="100%" gap="md" wrap="wrap" align="center" justify="center" >
          {applications.map((application, index) => (
            <Card withBorder key={index} p="md" w="200px">
              <Stack h="100px">
                <Title mb="auto" order={4}>{application.listingId.companyName}</Title>
                <Badge variant="outline" 
                  c={
                    application.status === 'rejected' ? 'red' 
                  : application.status === 'pending' ? 'yellow' 
                  : 'green'}>{application.status}
                </Badge>
              </Stack>
            </Card>
          ))}
        </Flex>
      </Stack>}
    </>
  );
}
