import { IconFilter2 } from '@tabler/icons-react';
import { Select, StyleProp } from '@mantine/core';
import INDUSTRIES from '@/data/industries';

type SearchIndustryProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: StyleProp<string | number>;
};

export function SearchIndustry({ value, onChange, placeholder, width }: SearchIndustryProps) {
  const data = INDUSTRIES.map((industry) => ({ value: industry, label: industry }));

  return (
    <Select
      radius={0}
      w={width}
      placeholder={placeholder || 'Industry'}
      rightSection={<IconFilter2 size={15}/>}
      data={data}
      searchable
      nothingFoundMessage="No industry found"
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
