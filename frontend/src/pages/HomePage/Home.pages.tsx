import { useState, KeyboardEvent } from 'react';
import { IconCoffee, IconSearch, IconX } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Stack, Text, Title, List, TextInput, ActionIcon } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';
import KofiButton from '@/components/Buttons/KofiButton';

export function HomePage() {
  const isMobile = useMediaQuery('(max-width: 500px)');
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);
  const isBusiness = user?.profileType === 'business';
  const [searchText, setSearchText] = useState('');

  const searchListing = () => {
    // Build URL query params from searchObj
    const params = new URLSearchParams();

    // Only add params that have values
    if (searchText?.trim()) {
      params.append('searchText', searchText.trim());
    }

    // Navigate to search page with query params
    navigate(`/search?${params.toString()}`);
  };

  const handleSearchKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      searchListing();
    }
  };

  const handleClearSearch = () => {
    setSearchText('');
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
          bg='rocketRed.7'
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
          <Flex w='100%' direction={isMobile ? 'column' : 'row'} gap={0} justify='center' align='stretch'>
            <TextInput
              w={{base:'100%', md: '70%'}}
              radius={0}
              size='lg'
              variant="default"
              placeholder={'Start finding jobs...'}
              value={searchText}
              onChange={(event) => setSearchText(event.currentTarget.value)}
              onKeyDown={handleSearchKeyDown}
              rightSection={
                searchText ? (
                  <ActionIcon
                    variant="subtle"
                    color="gray"
                    onClick={handleClearSearch}
                    aria-label="Clear search"
                  >
                    <IconX size={16} />
                  </ActionIcon>
                ) : null
              } 
            />
            <Button
              mx="auto"
              variant='rocketOrangeFilled'
              radius={0}
              w={{base: '100%', md: '40%'}}
              size="lg"
              fz={20}
              rightSection={<IconSearch />}
              onClick={searchListing}
              style={{ fontWeight: 700 }}
            >
              Search
            </Button>
            
          </Flex>
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
          <Flex gap={30} direction={isMobile ? 'column' : 'row'} mx='auto' align='stretch' justify='center' w='100%'>
            <Stack c='rocketRed.9' h='auto' w='100%' p={{base: 'md', sm: 'lg', md: 'xl'}} style={{border: '2px solid orange', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
              <Title order={isMobile ? 2 : 1}>For Job Seekers</Title>
              <Text fw={500} size={isMobile ? 'sm' : 'md'} c='rocketRed.8' style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>Find your perfect match with AI-powered job recommendations</Text>
              <List spacing="sm" size={isMobile ? 'sm' : 'md'}>
                <List.Item style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}><Text component="span" fw={500}>AI Match Scores</Text> - See compatibility percentage for every job listing</List.Item>
                <List.Item style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}><Text component="span" fw={500}>Smart Recommendations</Text> - Get personalized job suggestions based on your skills</List.Item>
                <List.Item style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}><Text component="span" fw={500}>One-Click Applications</Text> - Apply instantly with your saved profile</List.Item>
                <List.Item style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}><Text component="span" fw={500}>Favorites & Tracking</Text> - Save listings and monitor application progress</List.Item>
              </List>
              <Button variant='rocketRedFilled' component={Link} to='/register' mx='auto' mt='auto' w={{base: '90%', md: '80%'}} h={45} fz={{base: 'sm', md:'lg'}} fw={600}>Start Finding Jobs</Button>
            </Stack>

            <Stack c='rocketRed.9' w='100%' h='auto' p={{base: 'md', sm: 'lg', md: 'xl'}} style={{border: '2px solid orange', borderRadius: '10px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)'}}>
              <Title order={isMobile ? 2 : 1}>For Employers</Title>
              <Text fw={500} size={isMobile ? 'sm' : 'md'} c='rocketRed.8' style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}>Connect with qualified candidates using intelligent matching</Text>
              <List spacing="sm" size={isMobile ? 'sm' : 'md'}>
                <List.Item style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}><Text component="span" fw={500}>AI-Powered Matching</Text> - See match scores for every applicant automatically</List.Item>
                <List.Item style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}><Text component="span" fw={500}>Smart Filtering</Text> - Find the best candidates faster with intelligent sorting</List.Item>
                <List.Item style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}><Text component="span" fw={500}>Real-Time Analytics</Text> - Track listing performance and application metrics</List.Item>
                <List.Item style={{wordWrap: 'break-word', overflowWrap: 'break-word'}}><Text component="span" fw={500}>Streamlined Management</Text> - Review, update, and manage applications effortlessly</List.Item>
              </List>
              <Button variant='rocketRedFilled' component={Link} to='/register' mx='auto' mt='auto' w={{base: '90%', md: '80%'}} h={45} fz={{base: 'sm', md:'lg'}} fw={600}>Start Hiring Smarter</Button>
            </Stack>
          </Flex>

          <Flex direction='column' mt='xl' gap={20} p='xl'  mx='auto' style={{border: '1px solid orange', borderRadius: '10px'}}>
            <Title order={1} fw={600} ta='center' c='rocketRed.9'>Support JobRocket</Title>
            <Text w='90%' mx='auto' ta='center' c='rocketRed.9'>This site was not built by a team. It isn't owned by a big company. It was built by one person in order to help other English speaking people in Israel find a job and support their families. My goal was, and still is, to create a platform that is user-friendly and efficient. It takes a serious amount of time and effort in order to maintain such a platform. As of now, the entire site is free to use, which means I am funding it out of my own pocket. Any donations made help me maintain, improve, and expand the platform.</Text>
            <Button
              component="a"
              href="https://ko-fi.com/L4L01PZCY8"
              target="_blank"
              rel="noopener noreferrer"
              leftSection={<IconCoffee />}
              w={{base: '90%', md: '30%'}}
              mx='auto'
              size='md'
              fw={500}
              color='rocketRed'
            >
              Support JobRocket
            </Button>
          </Flex>
        </Box>
      </Box>
    </>
  );
}
