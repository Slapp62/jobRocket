import { IconFilter2 } from '@tabler/icons-react';
import { Select } from '@mantine/core';
import WORK_ARRANGEMENTS from '@/data/workArr';

type SearchWorkArrangementProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  width?: string | number;
};

export function SearchWorkArrangement({
  value,
  onChange,
  placeholder,
  width,
}: SearchWorkArrangementProps) {
  const data = WORK_ARRANGEMENTS.map((arrangement) => ({
    value: arrangement,
    label: arrangement,
  }));

  return (
    <Select
      w={width}
      placeholder={placeholder || 'Work Type'}
      rightSection={<IconFilter2 />}
      data={data}
      value={value}
      onChange={(val) => onChange(val || '')}
    />
  );
}
