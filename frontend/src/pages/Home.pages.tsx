import { useState } from 'react';
import { IconCards, IconSearch } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Box, Button, Flex, Stack, Text, Title } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { RootState } from '@/store/store';
import { SearchText } from '@/components/Filters/SearchText.tsx';
import { SearchSort } from '@/components/Filters/SearchSort';
import { SearchRegion } from '@/components/Filters/SearchRegion';
import { SearchCity } from '@/components/Filters/SearchCity';
import { SearchIndustry } from '@/components/Filters/SearchIndustry';
import { SearchWorkArrangement } from '@/components/Filters/SearchWorkArrangement';

export function HomePage() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);

  const isBusiness = user?.profileType === 'business';
  //const isAdmin = user?.isAdmin;
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
    <Box
      mb={-50}
      h="80vh"
      py={100}
      style={{ background: 'linear-gradient(to bottom,rgb(240, 114, 12),rgb(199, 10, 10))' }}
    >
      <Stack
        w="70%"
        gap={20}
        px={50}
        py={30}
        mx="auto"
        style={{
          borderRadius: '10px',
          background: 'rgba(192, 192, 192, 0.92)',
          boxShadow: '0px 5px 100px rgba(0, 0, 0, 0.61)',
        }}
      >
        {/* Conditional Welcome Message */}
        {!user && (
          <Title ta="center" c="black">
            Find your next career!
          </Title>
        )}
        {user && (
          <Text ta="center" c="blue" fw="bold" fz={30}>
            Welcome Back
          </Text>
        )}

        {/* Search & Sort */}
        <Flex gap={10} align="center" direction={isMobile ? 'column' : 'row'}>
          {/* Search */}
          <SearchText
            value={searchObj.searchWord}
            onChange={(val) => setSearchObj(prev => ({...prev, searchWord: val}))}
            width={isMobile ? '100%' : '50%'}
          />

          <SearchSort
            width={isMobile ? '100%' : '50%'}
            value={searchObj.sortOption}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, sortOption: value }));
            }}
          />
        </Flex>
        <Flex gap={10} align="center" direction={isMobile ? 'column' : 'row'}>
          {/* Sort */}
          <SearchRegion
            width={isMobile ? '100%' : '50%'}
            value={searchObj.region}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, region: value }));
            }}
          />

          {/* Sort */}
          <SearchCity
            width={isMobile ? '100%' : '50%'}
            value={searchObj.city}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, city: value }));
            }}
          />

          <SearchIndustry
            width={isMobile ? '100%' : '50%'}
            value={searchObj.industry}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, industry: value }));
            }}
          />

          <SearchWorkArrangement
            width={isMobile ? '100%' : '50%'}
            value={searchObj.workArrangement}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, workArrangement: value }));
            }}
          />
        </Flex>

        <Button
          mx="auto"
          variant="filled"
          color="purple"
          size="md"
          w="40%"
          fz={20}
          rightSection={<IconSearch />}
          onClick={searchListing}
        >
          Search
        </Button>

        {/* Conditinally Register */}
        {!user && (
          <Title order={2} ta="center" style={{ color: 'black' }}>
            <Link to="register" style={{ textDecoration: '', color: 'black' }}>
              Register
            </Link>{' '}
            now and start your journey
          </Title>
        )}

        {/* Conditinally Create Listing */}
        {isBusiness && (
          <Button
            component={Link}
            to="create-card"
            fullWidth
            mx="auto"
            variant="filled"
            color="blue"
            size="md"
            fz={20}
            rightSection={<IconCards />}
          >
            Create A Listing
          </Button>
        )}
      </Stack>
    </Box>
  );
}
