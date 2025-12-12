import { Flex } from '@mantine/core';
import { SearchCity } from './SearchCity';
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
    <Flex direction='row' w={{base:'100%', md: '100%'}} wrap={isMobile ? 'wrap' : 'nowrap'} gap={isMobile ? 5 : 10 } mx="auto" align='center' justify='center'>
      <SearchSort
        value={searchParams.get('sortOption') || ''}
        onChange={(val) => updateSearchParam('sortOption', val)}
        width={{base:'30%', md: '100%'}}
        radius={100}
      />
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
