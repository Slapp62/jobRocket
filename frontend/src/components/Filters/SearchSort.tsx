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

// Define which sort options belong to each sort type
const SORT_GROUPS = {
  title: ['title-asc', 'title-desc'],
  date: ['date-created-old', 'date-created-new'],
  matchScore: ['match-score', 'match-score-desc'],
};

type SortType = 'title' | 'date' | 'matchScore' | 'all';

// Filter options based on sort type
function getOptionsForType(sortType: SortType) {
  if (sortType === 'all') return SORT_OPTIONS;
  const allowedValues = SORT_GROUPS[sortType];
  return SORT_OPTIONS.filter(opt => allowedValues.includes(opt.value));
}

type SearchSortProps = {
  value: string;
  onChange: (value: string) => void;
  sortType?: SortType;
  placeholder?: string;
  width?: StyleProp<string | number>;
  radius?: number;
  disabled?: boolean;
};

export function SearchSort({ value, onChange, sortType = 'all', placeholder, width, radius, disabled = false }: SearchSortProps) {
  const filteredOptions = getOptionsForType(sortType);

  return (
    <Select
      radius={radius || 100}
      w={width}
      placeholder={placeholder || 'Sort By'}
      rightSection={<IconFilter2 size={15}/>}
      data={filteredOptions}
      value={value || null}
      onChange={(val) => onChange(val || '')}
      clearable
      disabled={disabled}
    />
  );
}
