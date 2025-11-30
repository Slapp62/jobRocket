import { useState } from 'react';
import { IconCards, IconSearch } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Stack, Text, Title, Image } from '@mantine/core';
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

      <Box h="85%">
        <Stack
          w="100%"
          h="100%"
          gap={20}
          py={20}
          className={bgStyles.primaryBg}
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
                <Text ta="center" className={styles.lightDark} fw="bold" fz={30}>
                  Welcome Back, {user.jobseekerProfile?.firstName || user.businessProfile?.companyName}!
                </Text>
              )}
            </Box>

          {/* Search & Sort */}
            <Flex gap={10} justify="center"direction={isMobile ? 'column' : 'row'}>
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

        <Stack
          justify="center"
          align="center"
          p="50px"
          gap={100}
        >
          <Flex
            direction={{ base: 'column', md: 'row' }}
            justify="start"
            align="center"
            w={{ base: '95%', md: '80%' }}
            gap="lg"
            p="lg"
            style={{border: '1px solid orange', borderRadius: '10px', minHeight: '400px'}}
          >
            <HomePageCards
              title="The Best Job Board for English Speakers in Israel"
              description="Find English-speaking jobs in Israel. Browse tech, marketing, sales, and remote positions from top Israeli companies."
              height={isMobile ? '300px' : '400px'}
              width={isMobile ? '100%' : '50%'}
            />
            <Image
              src="/peopleWorking-1.jpg"
              alt="People working"
              h={{ base: '250px', md: '400px' }}
              w={{ base: '100%', md: '50%' }}
              ml="auto"
              fit="cover"
              radius="md"
            />
          </Flex>

          <Flex
            direction={{ base: 'column-reverse', md: 'row' }}
            justify="end"
            align="center"
            w={{ base: '95%', md: '80%' }}
            gap='lg'
            p="lg"
            style={{border: '1px solid orange', borderRadius: '10px', minHeight: '400px'}}
          >
            <Image
              src="/data-analytics.jpg"
              alt="People working"
              h={{ base: '250px', md: '400px' }}
              w={{ base: '100%', md: '50%' }}
              ml="auto"
              fit="cover"
              radius="md"
            />
            <HomePageCards
              title="Create a Job Seeker or Employer Account"
              description="As a job seeker, you can search for jobs, apply to them, and manage your applications. As an employer, you can create job listings and manage your company's listings."
              height={isMobile ? '300px' : '400px'}
              width={isMobile ? '100%' : '50%'}
              fontSize=""
            />
          </Flex>
        </Stack>
      </Box>
    </>
  );
}
