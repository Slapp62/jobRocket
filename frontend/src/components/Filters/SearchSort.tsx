import { IconFilter2 } from '@tabler/icons-react';
import { Select, StyleProp } from '@mantine/core';

const SORT_OPTIONS = [
  { value: 'relevance', label: 'Relevance (AI)' },
  { value: 'title-asc', label: 'Title (A-Z)' },
  { value: 'title-desc', label: 'Title (Z-A)' },
  { value: 'date-created-old', label: 'Date Created (Oldest First)' },
  { value: 'date-created-new', label: 'Date Created (Latest First)' },
  { value: 'match-score', label: 'Match Score (Highest First)' },
  { value: 'match-score-desc', label: 'Match Score (Lowest First)' },
];

// Define which sort options belong to each sort type
const SORT_GROUPS = {
  relevance: ['relevance'],
  title: ['title-asc', 'title-desc'],
  date: ['date-created-old', 'date-created-new'],
  matchScore: ['match-score', 'match-score-desc'],
};

type SortType = 'relevance' | 'title' | 'date' | 'matchScore' | 'all';

// Filter options based on sort type
function getOptionsForType(sortType: SortType, includeRelevance: boolean = false) {
  if (sortType === 'all') {
    return includeRelevance ? SORT_OPTIONS : SORT_OPTIONS.filter(opt => opt.value !== 'relevance');
  }
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
  includeRelevance?: boolean;
};

export function SearchSort({
  value,
  onChange,
  sortType = 'all',
  placeholder,
  width,
  radius,
  disabled = false,
  includeRelevance = false
}: SearchSortProps) {
  const filteredOptions = getOptionsForType(sortType, includeRelevance);

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
