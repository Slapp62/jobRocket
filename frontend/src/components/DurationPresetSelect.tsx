import { Select, Text } from '@mantine/core';
import { addDays, formatDate } from '../utils/dateUtils';

interface DurationPresetSelectProps {
  value: number;
  onChange: (value: number) => void;
  label?: string;
  description?: string;
  error?: string;
  required?: boolean;
  disabled?: boolean;
  showCalculatedDate?: boolean;
  currentExpirationDate?: string | null;
}

const DURATION_OPTIONS = [
  { value: '7', label: '7 days' },
  { value: '14', label: '14 days' },
  { value: '30', label: '30 days' },
  { value: '60', label: '60 days' },
  { value: '90', label: '90 days' },
];

/**
 * DurationPresetSelect Component
 *
 * A reusable dropdown component for selecting listing expiration durations.
 * Provides preset options (7, 14, 30, 60, 90 days) and optionally displays
 * the calculated expiration date.
 *
 * @param value - Currently selected duration in days
 * @param onChange - Callback when duration is changed
 * @param label - Label text for the select field
 * @param description - Helper text below the field (e.g., current expiration)
 * @param error - Error message to display
 * @param required - Show asterisk for required field
 * @param disabled - Disable the select input
 * @param showCalculatedDate - Whether to show the calculated expiration date
 * @param currentExpirationDate - Current expiration date (for edit mode description)
 */
export function DurationPresetSelect({
  value,
  onChange,
  label = 'Listing Duration',
  description,
  error,
  required = false,
  disabled = false,
  showCalculatedDate = true,
  currentExpirationDate,
}: DurationPresetSelectProps) {
  const handleChange = (selectedValue: string | null) => {
    if (selectedValue) {
      onChange(parseInt(selectedValue, 10));
    }
  };

  // Calculate the new expiration date based on selected duration
  const calculatedExpirationDate = formatDate(addDays(new Date(), value));

  return (
    <>
      <Select
        label={label}
        description={description}
        error={error}
        data={DURATION_OPTIONS}
        value={value.toString()}
        onChange={handleChange}
        required={required}
        disabled={disabled}
        allowDeselect={false}
        withAsterisk={required}
      />
      {showCalculatedDate && (
        <Text size="sm" c="dimmed" mt="xs">
          Will expire on: {calculatedExpirationDate}
        </Text>
      )}
    </>
  );
}
