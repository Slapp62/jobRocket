import { Flex } from '@mantine/core';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';
import { SearchCity } from './SearchCity';
import { SearchRegion } from './SearchRegion';
import { SearchSort } from './SearchSort';
import { SearchWorkArrangement } from './SearchWorkArrangement';

type FilterBarProps = {
  searchParams: URLSearchParams;
  updateSearchParam: (key: string, value: string) => void;
  isMobile: boolean | undefined;
};

export function FilterBar({ searchParams, updateSearchParam, isMobile }: FilterBarProps) {
  const isLoggedIn = useSelector((state: RootState) => state.userSlice.isLoggedIn);
  const isSearchActive = !!(searchParams.get('searchWord')?.trim());

  return (
    <Flex direction='row' w={{base:'100%', md: '100%'}} wrap={isMobile ? 'wrap' : 'nowrap'} gap={isMobile ? 5 : 10 } mx="auto" align='center' justify='center'>
      {isSearchActive && (
        <SearchSort
          sortType="relevance"
          value={searchParams.get('sortOption') || ''}
          onChange={(val) => updateSearchParam('sortOption', val)}
          placeholder="Relevance"
          width={{base:'30%', md: '100%'}}
          radius={100}
          includeRelevance={true}
        />
      )}
      <SearchSort
        sortType="title"
        value={searchParams.get('sortOption') || ''}
        onChange={(val) => updateSearchParam('sortOption', val)}
        placeholder="Sort by Title"
        width={{base:'30%', md: '100%'}}
        radius={100}
      />
      <SearchSort
        sortType="date"
        value={searchParams.get('sortOption') || ''}
        onChange={(val) => updateSearchParam('sortOption', val)}
        placeholder="Sort by Date"
        width={{base:'30%', md: '100%'}}
        radius={100}
      />
      {isLoggedIn && <SearchSort
        sortType="matchScore"
        value={searchParams.get('sortOption') || ''}
        onChange={(val) => updateSearchParam('sortOption', val)}
        placeholder="Sort by Match Score"
        width={{base:'30%', md: '100%'}}
        radius={100}
      />}
      <SearchRegion
        value={searchParams.get('region') || ''}
        onChange={(val) => updateSearchParam('region', val)}
        width={{base:'30%', md: '100%'}}
        radius={100}
      />
      <SearchCity
        value={searchParams.get('city') || ''}
        onChange={(val) => updateSearchParam('city', val)}
        width={{base:'30%', md: '100%'}}
        radius={100}
      />
      <SearchWorkArrangement
        value={searchParams.get('workArrangement') || ''}
        onChange={(val) => updateSearchParam('workArrangement', val)}
        width={{base:'30%', md: '100%'}}
        radius={100}
      />
    </Flex>
  );
}
