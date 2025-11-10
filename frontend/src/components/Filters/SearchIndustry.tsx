import { IconFilter2 } from '@tabler/icons-react';
import { Select } from '@mantine/core';
import INDUSTRIES from '@/data/industries';

type SearchIndustryProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string | number;
};

export function SearchIndustry({ value, onChange, placeholder, width }: SearchIndustryProps) {
  const data = INDUSTRIES.map((industry) => ({ value: industry, label: industry }));

  return (
    <Select
      w={width}
      placeholder={placeholder || 'Industry'}
      rightSection={<IconFilter2 />}
      data={data}
      searchable
      nothingFoundMessage="No industry found"
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
