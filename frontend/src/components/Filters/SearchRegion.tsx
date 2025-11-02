import { Select } from '@mantine/core';
import { IconFilter2 } from '@tabler/icons-react';

const REGION_OPTIONS = [
  { value: '', label: 'All' },
  { value: 'Galilee', label: 'Galilee' },
  { value: 'Golan', label: 'Golan' },
  { value: 'Center', label: 'Center' },
  { value: 'Jerusalem_District', label: 'Jerusalem District' },
  { value: 'South', label: 'South' },
];

type SearchRegionProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string | number;
};

export function SearchRegion({ value, onChange, placeholder, width }: SearchRegionProps) {
  return (
    <Select
      w={width}
      placeholder={placeholder || 'Region'}
      rightSection={<IconFilter2 />}
      data={REGION_OPTIONS}
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
