import { Select } from '@mantine/core';
import { IconFilter2 } from '@tabler/icons-react';

const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
  { value: 'date-created-old', label: 'Date Created (Oldest First)' },
  { value: 'date-created-new', label: 'Date Created (Latest First)' },
];

type SearchSortProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string | number;
};

export function SearchSort({ value, onChange, placeholder, width }: SearchSortProps) {
  return (
    <Select
      w={width}
      placeholder={placeholder || 'Filter'}
      rightSection={<IconFilter2 />}
      data={SORT_OPTIONS}
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
