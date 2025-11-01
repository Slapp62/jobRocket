import { TextInput } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

// SearchInput.tsx
type SearchTextProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string | number;
};

export function SearchText({ value, onChange, placeholder, width }: SearchTextProps) {
  return (
    <TextInput
      w={width}
      variant="default"
      rightSection={<IconSearch />}
      placeholder={placeholder || "Search..."}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  );
}