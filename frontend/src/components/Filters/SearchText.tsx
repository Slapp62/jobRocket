import { IconSearch } from '@tabler/icons-react';
import { MantineSize, StyleProp, TextInput } from '@mantine/core';

// SearchInput.tsx
type SearchTextProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: StyleProp<string | number>;
  radius?: number | string;
  size?: MantineSize;
};

export function SearchText({ value, onChange, placeholder, width, radius, size }: SearchTextProps) {
  return (
    <TextInput
      radius={radius || 0}
      size={size}
      w={width}
      variant="default"
      rightSection={<IconSearch size={15} />}
      placeholder={placeholder || 'Text...'}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}
