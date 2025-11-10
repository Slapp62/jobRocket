import { Flex, Group } from '@mantine/core';
import { SearchCity } from './SearchCity';
import { SearchIndustry } from './SearchIndustry';
import { SearchRegion } from './SearchRegion';
import { SearchSort } from './SearchSort';
import { SearchText } from './SearchText';
import { SearchWorkArrangement } from './SearchWorkArrangement';

type FilterBarProps = {
  searchParams: URLSearchParams;
  updateSearchParam: (key: string, value: string) => void;
  isMobile: boolean | undefined;
};

export function FilterBar({ searchParams, updateSearchParam, isMobile }: FilterBarProps) {
  return (
    <Flex direction={isMobile ? 'column' : 'row'} gap={10} w="90%" mx="auto" p="md">
      <SearchText
        value={searchParams.get('searchWord') || ''}
        onChange={(val) => updateSearchParam('searchWord', val)}
        width={isMobile ? '100%' : '15%'}
      />
      <SearchRegion
        value={searchParams.get('region') || ''}
        onChange={(val) => updateSearchParam('region', val)}
        width={isMobile ? '100%' : '15%'}
      />
      <SearchCity
        value={searchParams.get('city') || ''}
        onChange={(val) => updateSearchParam('city', val)}
        width={isMobile ? '100%' : '15%'}
      />
      <SearchIndustry
        value={searchParams.get('industry') || ''}
        onChange={(val) => updateSearchParam('industry', val)}
        width={isMobile ? '100%' : '15%'}
      />
      <SearchWorkArrangement
        value={searchParams.get('workArrangement') || ''}
        onChange={(val) => updateSearchParam('workArrangement', val)}
        width={isMobile ? '100%' : '15%'}
      />
      <SearchSort
        value={searchParams.get('sortOption') || ''}
        onChange={(val) => updateSearchParam('sortOption', val)}
        width={isMobile ? '100%' : '15%'}
      />
    </Flex>
  );
}
