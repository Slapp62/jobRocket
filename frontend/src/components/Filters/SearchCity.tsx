import { IconFilter2 } from '@tabler/icons-react';
import { Select, StyleProp } from '@mantine/core';
import { CITIES } from '@/data/israelCities';

type SearchCityProps = {
  value: string;
  onChange: (value: string) => void;
  cities?: string[];
  placeholder?: string;
  width?: StyleProp<string | number>;
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
      radius={0}
      w={width}
      placeholder={placeholder || 'City'}
      rightSection={<IconFilter2 size={15}/>}
      data={data}
      searchable
      nothingFoundMessage="No city found"
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
