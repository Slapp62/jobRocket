import { Anchor, Checkbox, Fieldset, Text } from '@mantine/core';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { TUsers } from '@/Types';

interface ConsentCheckboxesProps {
  control: Control<TUsers>;
  errors: FieldErrors<TUsers>;
  disabled?: boolean;
}

/**
 * ConsentCheckboxes Component
 *
 * Renders Israeli Amendment 13 compliant consent checkboxes for registration.
 * Includes both data processing consent and terms & conditions acceptance.
 *
 * @param control - React Hook Form control object
 * @param errors - Form validation errors
 * @param disabled - Whether checkboxes should be disabled (default: false)
 */
export const ConsentCheckboxes = ({ control, errors, disabled = false }: ConsentCheckboxesProps) => {
  return (
    <>
      {/* Data Processing Consent - Israeli Amendment 13 Compliance */}
      <Fieldset
        legend="Data Processing Consent"
        mt="md"
        style={{
          backgroundColor: '#FFF4E6',
          padding: '1rem',
          borderRadius: '8px'
        }}
      >
        <Controller
          name="dataProcessingConsent"
          control={control}
          render={({ field: { value, ...field } }) => (
            <Checkbox
              {...field}
              checked={value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              disabled={disabled}
              label={
                <Text size="sm">
                  I consent to JobRocket processing my data (account creation, resume
                  storage via Cloudinary, AI job matching via OpenAI) as described in the{' '}
                  <Anchor href="/privacy-policy" target="_blank">
                    Privacy Policy
                  </Anchor>
                </Text>
              }
              error={errors.dataProcessingConsent?.message}
            />
          )}
        />
      </Fieldset>

      {/* Terms and Conditions */}
      <Fieldset legend="Terms and Conditions" mt="md">
        <Controller
          name="terms"
          control={control}
          render={({ field }) => (
            <Checkbox
              label={
                <>
                  I agree to the{' '}
                  <Anchor href="/terms" target="_blank">
                    terms and conditions
                  </Anchor>
                </>
              }
              checked={field.value}
              onChange={(event) => field.onChange(event.currentTarget.checked)}
              error={errors.terms?.message}
              disabled={disabled}
            />
          )}
        />
      </Fieldset>
    </>
  );
};
