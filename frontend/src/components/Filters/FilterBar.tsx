import { Group } from "@mantine/core";
import { SearchCity } from "./SearchCity";
import { SearchIndustry } from "./SearchIndustry";
import { SearchRegion } from "./SearchRegion";
import { SearchSort } from "./SearchSort";
import { SearchText } from "./SearchText";
import { SearchWorkArrangement } from "./SearchWorkArrangement";

type FilterBarProps = {
    searchParams: URLSearchParams;
    updateSearchParam: (key: string, value: string) => void;
}

export function FilterBar({ searchParams, updateSearchParam }: FilterBarProps) {
    return (
      <Group gap={10} w="90%" mx="auto" p="md">
          <SearchText
            value={searchParams.get('searchWord') || ''}
            onChange={(val) => updateSearchParam('searchWord', val)}
            width="15%"
          />
          <SearchRegion
            value={searchParams.get('region') || ''}
            onChange={(val) => updateSearchParam('region', val)}
            width="15%"
          />
          <SearchCity
            value={searchParams.get('city') || ''}
            onChange={(val) => updateSearchParam('city', val)}
            width="15%"
          />
          <SearchIndustry
            value={searchParams.get('industry') || ''}
            onChange={(val) => updateSearchParam('industry', val)}
            width="15%"
          />
          <SearchWorkArrangement
            value={searchParams.get('workArrangement') || ''}
            onChange={(val) => updateSearchParam('workArrangement', val)}
            width="15%"
          />
          <SearchSort
            value={searchParams.get('sortOption') || ''}
            onChange={(val) => updateSearchParam('sortOption', val)}
            width="15%"
          />
        </Group>
    )
}
