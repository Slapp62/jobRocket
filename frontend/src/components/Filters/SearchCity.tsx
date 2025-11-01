import { Select } from '@mantine/core';
import { IconFilter2 } from '@tabler/icons-react';
import { CITIES } from '@/data/israelCities';

type SearchCityProps = {
  value: string;
  onChange: (value: string) => void;
  cities?: string[];
  placeholder?: string;
  width?: string | number;
};

export function SearchCity({
  value,
  onChange,
  cities = CITIES,
  placeholder,
  width,
}: SearchCityProps) {
  const data = cities.map((city) => ({ value: city, label: city }));

  return (
    <Select
      w={width}
      placeholder={placeholder || 'City'}
      rightSection={<IconFilter2 />}
      data={data}
      searchable
      nothingFoundMessage="No city found"
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
