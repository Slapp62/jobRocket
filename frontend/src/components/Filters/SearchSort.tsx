import { IconFilter2 } from '@tabler/icons-react';
import { Select, StyleProp } from '@mantine/core';

const SORT_OPTIONS = [
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
  { value: 'date-created-old', label: 'Date Created (Oldest First)' },
  { value: 'date-created-new', label: 'Date Created (Latest First)' },
  { value: 'match-score', label: 'Match Score (Highest First)' },
  { value: 'match-score-desc', label: 'Match Score (Lowest First)' },
];

type SearchSortProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: StyleProp<string | number>;
};

export function SearchSort({ value, onChange, placeholder, width }: SearchSortProps) {
  return (
    <Select
      radius={0}
      w={width}
      placeholder={placeholder || 'Sort By'}
      rightSection={<IconFilter2 size={15}/>}
      data={SORT_OPTIONS}
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
