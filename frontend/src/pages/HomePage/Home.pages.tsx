import { useState, useEffect } from 'react';
import { IconCards, IconSearch } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Stack, Text, Title, List } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SearchCity } from '@/components/Filters/SearchCity';
import { SearchRegion } from '@/components/Filters/SearchRegion';
import { SearchText } from '@/components/Filters/SearchText.tsx';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';

export function HomePage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isBusiness = user?.profileType === 'business';
  const [searchWord, setSearchWord] = useState('');

  const searchListing = () => {
    // Build URL query params from searchObj
    const params = new URLSearchParams();

    // Only add params that have values
    if (searchWord?.trim()) {
      params.append('searchWord', searchWord.trim());
    }

    // Navigate to search page with query params
    navigate(`/search?${params.toString()}`);
  };
  
  return (
    <>
      <PageMeta
        title="English Job Board for Israel | JobRocket"
        description="Find English-speaking jobs in Israel. Browse tech, marketing, sales, and remote positions from top Israeli companies."
        keywords="English jobs Israel, Tel Aviv jobs, Jerusalem jobs, tech jobs Israel"
      />

      <Box h="85%" w="100%">
        <Stack
          w="100%"
          h="100%"
          gap={20}
          py={20}
          bg='rocketRed.9'
        >
          <Stack w={{ base: '95%', sm: '85%', md: '40%' }} align="center" mx="auto">
          
            {/* Conditional Welcome Message */}
            {!user && (
              <Title order={2} c="white">
                Welcome to a world of possibility.
              </Title>
            )}
            {user && (
              <Text ta="center" c="white" fz={30}>
                Welcome Back, {user.jobseekerProfile?.firstName || user.businessProfile?.companyName}!
              </Text>
            )}
           

          {/* Search & Sort */}
            
            {/* Search */}
            <SearchText
              value={searchWord}
              onChange={(val) => setSearchWord(val)}
              width={{base: '95%', md: '60%'}}
              radius='sm'
              size='md'
            />
            
            <Button
              mx="auto"
              variant="outline"
              color='white'
              w={{base: '95%', md: '40%'}}
              size="md"
              fz={20}
              rightSection={<IconSearch />}
              onClick={searchListing}
              style={{ fontWeight: 700 }}
            >
              Search
            </Button>

            {/* Conditinally Create Listing */}
            {isBusiness && (
              <Button
                component={Link}
                to="create-listing"
                w='40%'
                mx="auto"
                variant="outline"
                color="white"
                size="md"
                fz={20}
                style={{ fontWeight: 700 }}
              >
                New Listing
              </Button>
            )}
          </Stack>
        </Stack>

        <Box my="50px" w={{base: '95%', md:'70%'}} mx='auto'>
          <Flex gap={30} direction={isMobile ? 'column' : 'row'} mx='auto' align='center' justify='center' w='100%'>
            <Stack c='rocketRed.9' h='400px' w='100%' p='xl' style={{border: '1px solid orange', borderRadius: '10px'}}>
              <Title order={1}>Looking for a job?</Title>
              <Text td='underline'>At JobRocket you can:</Text>
              <List>
                <List.Item>Search and apply to jobs easily</List.Item>
                <List.Item>Save your favorite listings</List.Item>
                <List.Item>Track your application status</List.Item>
                <List.Item>Get job recommendations based on your profile</List.Item>
              </List>
              <Button variant='rocketRedFilled' component={Link} to='/register' mx='auto' mt='auto' w='80%' h={40} fz={{base: 'md', md:'lg'}}>Register now</Button>
            </Stack>

            <Stack c='rocketRed.9' w='100%' h='400px' p='xl' style={{border: '1px solid orange', borderRadius: '10px'}}>
              <Title order={1}>Looking to recruit?</Title>
              <Text td='underline'>At JobRocket you can:</Text>
              <List>
                <List.Item>Post and update listings</List.Item>
                <List.Item>View and manage incoming applications</List.Item>
                <List.Item>View realtime analytics for listings and applications</List.Item>
              </List>
              <Button variant='rocketRedFilled' component={Link} to='/register' mx='auto' mt='auto' w='80%' h={40} fz={{base: 'md', md:'lg'}}>Register now</Button>
            </Stack>
          </Flex>

          <Flex direction='column' mt='xl' gap={20} p='xl'  mx='auto' style={{border: '1px solid orange', borderRadius: '10px'}}>
            <Title order={1} fw={600} ta='center' c='rocketRed.9'>Support JobRocket</Title>
            <Text w='90%' mx='auto' ta='center' c='rocketRed.9'>This site was not built by a team. It isn't owned by a big company. It was built by one person in order to help other English speaking people in Israel find a job and support their families. My goal was, and still is, to create a platform that is user-friendly and efficient. It takes a serious amount of time and effort in order to maintain such a platform. As of now, the entire site is free to use, which means I am funding it out of my own pocket. Any donations made help me maintain, improve, and expand the platform.</Text>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
