import { IconFilter2 } from '@tabler/icons-react';
import { Select, StyleProp } from '@mantine/core';
import { CITIES } from '@/data/israelCities';

type SearchCityProps = {
  value: string;
  onChange: (value: string) => void;
  cities?: string[];
  placeholder?: string;
  width?: StyleProp<string | number>;
  radius?: number;
};

export function SearchCity({
  value,
  onChange,
  cities = CITIES,
  placeholder,
  width,
  radius,
}: SearchCityProps) {
  const data = cities.map((city) => ({ value: city, label: city }));

  return (
    <Select
      radius={radius || 100}
      w={width}
      placeholder={placeholder || 'City'}
      rightSection={<IconFilter2 size={15} />}
      data={data}
      searchable
      nothingFoundMessage="No city found"
      value={value || null}
      onChange={(val) => onChange(val || '')}
      clearable
    />
  );
}
