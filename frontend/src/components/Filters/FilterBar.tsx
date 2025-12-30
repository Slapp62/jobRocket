import { IconFilterOff } from '@tabler/icons-react';
import { useSelector } from 'react-redux';
import { ActionIcon, Flex, StyleProp, Tooltip } from '@mantine/core';
import { RootState } from '@/store/store';
import { SearchCity } from './SearchCity';
import { SearchRegion } from './SearchRegion';
import { SearchSort } from './SearchSort';
import { SearchWorkArrangement } from './SearchWorkArrangement';

type FilterBarProps = {
  searchParams: URLSearchParams;
  updateSearchParam: (key: string, value: string) => void;
  isMobile: boolean | undefined;
  padding?: StyleProp<string | number>;
  width?: StyleProp<string | number>;
};

export function FilterBar({
  searchParams,
  updateSearchParam,
  isMobile,
  padding,
  width,
}: FilterBarProps) {
  const isLoggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const isSearchActive = !!searchParams.get('searchText')?.trim();

  const hasActiveFilters = !!(
    searchParams.get('searchText') ||
    searchParams.get('sortOption') ||
    searchParams.get('region') ||
    searchParams.get('city') ||
    searchParams.get('workArrangement')
  );

  const handleResetFilters = () => {
    // Clear all filter params by redirecting to clean search page
    window.location.href = '/search';
  };

  return (
    <Flex
      direction="row"
      w={width}
      wrap={isMobile ? 'wrap' : 'nowrap'}
      gap={isMobile ? 5 : 10}
      mx="auto"
      align="center"
      justify="space-evenly"
      p={padding}
    >
      {isSearchActive && (
        <SearchSort
          sortType="all"
          value={searchParams.get('sortOption') || ''}
          onChange={(val) => updateSearchParam('sortOption', val)}
          placeholder="Sort By"
          width={{ base: '40%', md: '100%' }}
          radius={100}
        />
      )}
      <SearchSort
        sortType="title"
        value={searchParams.get('sortOption') || ''}
        onChange={(val) => updateSearchParam('sortOption', val)}
        placeholder="Sort by Title"
        width={{ base: '40%', md: '100%' }}
        radius={100}
      />
      <SearchSort
        sortType="date"
        value={searchParams.get('sortOption') || ''}
        onChange={(val) => updateSearchParam('sortOption', val)}
        placeholder="Sort by Date"
        width={{ base: '40%', md: '100%' }}
        radius={100}
      />
      {isLoggedIn && (
        <SearchSort
          sortType="matchScore"
          value={searchParams.get('sortOption') || ''}
          onChange={(val) => updateSearchParam('sortOption', val)}
          placeholder="Sort by Match Score"
          width={{ base: '40%', md: '100%' }}
          radius={100}
        />
      )}
      <SearchRegion
        value={searchParams.get('region') || ''}
        onChange={(val) => updateSearchParam('region', val)}
        width={{ base: '40%', md: '100%' }}
        radius={100}
      />
      <SearchCity
        value={searchParams.get('city') || ''}
        onChange={(val) => updateSearchParam('city', val)}
        width={{ base: '40%', md: '100%' }}
        radius={100}
      />
      <SearchWorkArrangement
        value={searchParams.get('workArrangement') || ''}
        onChange={(val) => updateSearchParam('workArrangement', val)}
        width={{ base: '40%', md: '100%' }}
        radius={100}
      />
      {hasActiveFilters && (
        <Tooltip label="Reset all filters" position="bottom">
          <ActionIcon
            size="lg"
            w="50%"
            variant="light"
            color="gray"
            onClick={handleResetFilters}
            aria-label="Reset all filters"
            radius={50}
          >
            Clear
          </ActionIcon>
        </Tooltip>
      )}
    </Flex>
  );
}
