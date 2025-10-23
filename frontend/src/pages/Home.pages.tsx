import { IconCards, IconFilter2, IconSearch } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Box,
  Button,
  Flex,
  Stack,
  Select,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import INDUSTRIES from '../data/industries.ts';
import {getAllCities}  from '../data/israelCities.ts';
import WORK_ARRANGEMENTS  from '../data/workArr.ts';
import { RootState } from '@/store/store';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';

export function HomePage() {
  const isMobile = useMediaQuery('(max-width: 700px)');
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.userSlice.user);

  const isBusiness = user?.profileType === 'business';
  //const isAdmin = user?.isAdmin;
  const allCitiesArr = getAllCities();
  const [searchObj, setSearchObj] = useState({
    searchWord: '',
    sortOption: '',
    region: '',
    city: '',
    industry: '',
    workArrangement: '',
  });

  const searchListing = async () => {
    try {
      const API_BASE_URL = import.meta.env.VITE_API_URL;
      const response = await axios.get(`${API_BASE_URL}/api/listings/search/`, {params: searchObj});

      if (response.status === 200) {
          navigate('/search');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || error.message);
    }    
  };

  return (
    <Box mb={-50} h='80vh' py={100} style={{ background: 'linear-gradient(to bottom,rgb(240, 114, 12),rgb(199, 10, 10))'}}>
      <Stack w="70%" gap={20} px={50} py={30} mx="auto" style={{ borderRadius: '10px', background: 'rgba(192, 192, 192, 0.92)', boxShadow: '0px 5px 100px rgba(0, 0, 0, 0.61)'}}>
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
          <TextInput
            w={isMobile ? '100%' : '50%'}
            variant="default"
            rightSection={<IconSearch />}
            placeholder="Search for a listing..."
            onChange={(e) => {
              setSearchObj((prev) => ({ ...prev, searchWord: e.target.value }));
            }}
          />

          <Select
            w={isMobile ? '100%' : '50%'}
            placeholder="Filter"
            rightSection={<IconFilter2 />}
            data={[
              { value: 'title-asc', label: 'Title (A-Z)' },
              { value: 'title-desc', label: 'Title (Z-A)' },
              {
                value: 'date-created-old',
                label: 'Date Created (Oldest First)',
              },
              {
                value: 'date-created-new',
                label: 'Date Created (Latest First)',
              },
            ]}
            value={searchObj.sortOption}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, sortOption: value || '' }));
            }}
          />
        </Flex>
        <Flex gap={10} align="center" direction={isMobile ? 'column' : 'row'}>
          {/* Sort */}
          <Select
            w={isMobile ? '100%' : '50%'}
            placeholder="Region"
            rightSection={<IconFilter2 />}
            data={[
              { value: 'galilee', label: 'Galilee' },
              { value: 'golan', label: 'Golan' },
              { value: 'center', label: 'Center' },
              { value: 'jerusalem-district', label: 'Jerusalem District' },
              { value: 'south', label: 'South' },
            ]}
            value={searchObj.region}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, region: value || '' }));
            }}
          />

          {/* Sort */}
          <Select
            w={isMobile ? '100%' : '50%'}
            placeholder="City"
            rightSection={<IconFilter2 />}
            data={allCitiesArr.map((city) => ({ value: city, label: city }))}
            value={searchObj.city}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, city: value || '' }));
            }}
          />

          <Select
            w={isMobile ? '100%' : '50%'}
            placeholder="Industry"
            rightSection={<IconFilter2 />}
            data={INDUSTRIES.map((industry) => ({
              value: industry,
              label: industry,
            }))}
            value={searchObj.industry}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, industry: value || '' }));
            }}
          />

          <Select
            w={isMobile ? '100%' : '50%'}
            placeholder="Work Type"
            rightSection={<IconFilter2 />}
            data={WORK_ARRANGEMENTS.map((type) => ({
              value: type,
              label: type,
            }))}
            value={searchObj.workArrangement}
            onChange={(value) => {
              setSearchObj((prev) => ({ ...prev, workArrangement: value || '' }));
            }}
          />
        </Flex>

        <Button
          component={Link}
          to="/search"
          mx="auto"
          variant="filled"
          color="purple"
          size="md"
          w="40%"
          fz={20}
          rightSection={<IconSearch />}
          onClick={() => searchListing()}
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
