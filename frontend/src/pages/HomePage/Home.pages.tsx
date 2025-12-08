import { useState } from 'react';
import { IconCards, IconSearch } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Stack, Text, Title, Image, Paper, List, Group } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { SearchCity } from '@/components/Filters/SearchCity';
import { SearchIndustry } from '@/components/Filters/SearchIndustry';
import { SearchRegion } from '@/components/Filters/SearchRegion';
import { SearchSort } from '@/components/Filters/SearchSort';
import { SearchText } from '@/components/Filters/SearchText.tsx';
import { SearchWorkArrangement } from '@/components/Filters/SearchWorkArrangement';
import HomePageCards from '@/components/InfoCards/homePageCards';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';
import styles from './HomePage.module.css';
import bgStyles from '@/styles/bgStyles.module.css';

export function HomePage() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isBusiness = user?.profileType === 'business';
  const [searchObj, setSearchObj] = useState({
    searchWord: '',
    sortOption: '',
    region: '',
    city: '',
    industry: '',
    workArrangement: '',
  });

  const searchListing = () => {
    // Build URL query params from searchObj
    const params = new URLSearchParams();

    // Only add params that have values
    if (searchObj.searchWord?.trim()) {
      params.append('searchWord', searchObj.searchWord.trim());
    }
    if (searchObj.sortOption?.trim()) {
      params.append('sortOption', searchObj.sortOption.trim());
    }
    if (searchObj.region?.trim()) {
      params.append('region', searchObj.region.trim());
    }
    if (searchObj.city?.trim()) {
      params.append('city', searchObj.city.trim());
    }
    if (searchObj.industry?.trim()) {
      params.append('industry', searchObj.industry.trim());
    }
    if (searchObj.workArrangement?.trim()) {
      params.append('workArrangement', searchObj.workArrangement.trim());
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
          bg='rocketOrange.9'
        >
          <Stack w={{ base: '95%', sm: '85%', md: '60%' }} align="start" mx="auto">
            <Box>
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
            </Box>

          {/* Search & Sort */}
            <Flex gap={10} justify="center" direction={isMobile ? 'column' : 'row'} mx="auto">
              {/* Search */}
              <SearchText
                value={searchObj.searchWord}
                onChange={(val) => setSearchObj((prev) => ({ ...prev, searchWord: val }))}
                width={isMobile ? '100%' : '25%'}
              />
              {/* Sort */}
              <SearchRegion
                width={isMobile ? '100%' : '25%'}
                value={searchObj.region}
                onChange={(value) => {
                  setSearchObj((prev) => ({ ...prev, region: value }));
                }}
              />

              {/* Sort */}
              <SearchCity
                width={isMobile ? '100%' : '25%'}
                value={searchObj.city}
                onChange={(value) => {
                  setSearchObj((prev) => ({ ...prev, city: value }));
                }}
              />

              <SearchIndustry
                width={isMobile ? '100%' : '25%'}
                value={searchObj.industry}
                onChange={(value) => {
                  setSearchObj((prev) => ({ ...prev, industry: value }));
                }}
              />
            </Flex>
          </Stack>

          <Stack w={{ base: '95%', sm: '85%', md: '60%' }} mx="auto">
            <Button
              mx="auto"
              variant="rocketRedFilled"
              size="md"
              w={{ base: '90%', sm: '60%', md: '30%' }}
              fz={20}
              rightSection={<IconSearch />}
              onClick={searchListing}
              style={{ fontWeight: 700 }}
            >
              Search Jobs
            </Button>

            {/* Conditinally Create Listing */}
            {isBusiness && (
              <Button
                component={Link}
                to="create-listing"
                w={{ base: '90%', sm: '60%', md: '30%' }}
                mx="auto"
                variant="outline"
                color="white"
                size="md"
                fz={20}
                rightSection={<IconCards />}
                style={{ fontWeight: 700 }}
              >
                Create A Listing
              </Button>
            )}
          </Stack>
        </Stack>

        <Box my="50px" w="100%">
          <Flex gap={30} direction={isMobile ? 'column' : 'row'} mx='auto' align='center' justify='center' w={{base: '95%', md:'60%'}}>
            <Stack c='rocketOrange.9' h='400px' w='100%' p='xl' style={{border: '1px solid orange', borderRadius: '10px'}}>
              <Title order={1}>Looking for a job?</Title>
              <Text td='underline'>At JobRocket you can:</Text>
              <List>
                <List.Item>Search and apply to jobs easily</List.Item>
                <List.Item>Save your favorite listings</List.Item>
                <List.Item>Track your application status</List.Item>
                <List.Item>Get job recommendations based on your profile</List.Item>
              </List>
              <Button variant='rocketRedFilled' component={Link} to='/register' mx='auto' mt='auto' fullWidth h={40} fz={{base: 'md', md:'lg'}}>Register now to get started</Button>
            </Stack>

            <Stack c='rocketOrange.9' w='100%' h='400px' p='xl' style={{border: '1px solid orange', borderRadius: '10px'}}>
              <Title order={1}>Looking to recruit?</Title>
              <Text td='underline'>At JobRocket you can:</Text>
              <List>
                <List.Item>Post and update listings</List.Item>
                <List.Item>View and manage incoming applications</List.Item>
                <List.Item>View realtime analytics for listings and applications</List.Item>
              </List>
              <Button variant='rocketRedFilled' component={Link} to='/register' mx='auto' mt='auto' fullWidth h={40} fz={{base: 'md', md:'lg'}}>Register now to get started</Button>
            </Stack>
          </Flex>

        </Box>
      </Box>
    </>
  );
}
