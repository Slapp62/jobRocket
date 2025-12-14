import { IconFilter2 } from '@tabler/icons-react';
import { Select, StyleProp } from '@mantine/core';
import WORK_ARRANGEMENTS from '@/data/workArr';

type SearchWorkArrangementProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: StyleProp<string | number>;
  radius?: number;
};

export function SearchWorkArrangement({
  value,
  onChange,
  placeholder,
  width,
  radius,
}: SearchWorkArrangementProps) {
  const data = WORK_ARRANGEMENTS.map((arrangement) => ({
    value: arrangement,
    label: arrangement,
  }));

  return (
    <Select
      radius={radius || 100}
      w={width}
      placeholder={placeholder || 'Work Type'}
      rightSection={<IconFilter2 size={15}/>}
      data={data}
      value={value || null}
      onChange={(val) => onChange(val || '')}
      clearable
    />
  );
}
