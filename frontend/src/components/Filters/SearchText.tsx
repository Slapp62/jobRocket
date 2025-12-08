import { IconSearch } from '@tabler/icons-react';
import { TextInput, StyleProp } from '@mantine/core';

// SearchInput.tsx
type SearchTextProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: StyleProp<string | number>;
};

export function SearchText({ value, onChange, placeholder, width }: SearchTextProps) {
  return (
    <TextInput
      radius={0}
      w={width}
      variant="default"
      rightSection={<IconSearch size={15}/>}
      placeholder={placeholder || 'Text...'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
