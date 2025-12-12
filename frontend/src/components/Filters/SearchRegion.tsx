import { IconFilter2 } from '@tabler/icons-react';
import { Select, StyleProp } from '@mantine/core';

const REGION_OPTIONS = [
  {value: '', label: 'All'},
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
  width?: StyleProp<string | number>;
  radius?: number;
};

export function SearchRegion({ value, onChange, placeholder, width, radius }: SearchRegionProps) {
  return (
    <Select
      radius={radius || 100}
      w={width}
      placeholder='Region'
      rightSection={<IconFilter2 size={15}/>}
      data={REGION_OPTIONS}
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
