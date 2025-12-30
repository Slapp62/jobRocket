import { useMemo } from 'react';
import { Control, Controller, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { Select, Textarea, TextInput } from '@mantine/core';
import { INDUSTRIES } from '@/data/industries';
import { getCitiesByRegion, REGIONS } from '@/data/israelCities.ts';
import { TUsers } from '@/Types';
import { formatRegionForDisplay } from '@/utils/formatters';
import { ConsentCheckboxes } from './ConsentCheckboxes';

type BusinessFieldsProps = {
  register: UseFormRegister<TUsers>;
  errors: FieldErrors<TUsers>;
  control: Control<TUsers>;
  disabled?: boolean;
  showConsentCheckboxes?: boolean;
};

const EMPLOYEE_COUNTS = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];

export function BusinessFields({
  register,
  errors,
  control,
  disabled = false,
  showConsentCheckboxes = true,
}: BusinessFieldsProps) {
  // Watch the selected country to determine if region/city fields should be shown
  const selectedCountry = useWatch({
    control,
    name: 'businessProfile.location.country',
  });

  // Watch the selected region to filter cities
  const selectedRegion = useWatch({
    control,
    name: 'businessProfile.location.region',
  });

  // Check if the country is Israel (case-insensitive)
  const isIsrael = selectedCountry?.toLowerCase().trim() === 'israel';

  // Get cities for the selected region
  const availableCities = useMemo(() => {
    if (!selectedRegion) {
      return [];
    }
    return getCitiesByRegion(selectedRegion).map((city: string) => ({
      value: city,
      label: city,
    }));
  }, [selectedRegion]);

  return (
    <>
      {/* Required: Company Name */}
      <TextInput
        label="Company Name"
        placeholder="Enter your company name"
        withAsterisk
        disabled={disabled}
        {...register('businessProfile.companyName')}
        error={errors.businessProfile?.companyName?.message}
      />

      {/* Required: Location - Country */}
      <TextInput
        label="Country"
        placeholder="Israel"
        withAsterisk
        disabled={disabled}
        {...register('businessProfile.location.country')}
        error={errors.businessProfile?.location?.country?.message}
      />

      {/* Conditional: Location - Region (only shown for Israel) */}
      {isIsrael && (
        <Controller
          name="businessProfile.location.region"
          control={control}
          render={({ field }) => (
            <Select
              label="Region"
              placeholder="Select region"
              withAsterisk
              data={REGIONS.map((region: string) => ({
                value: region,
                label: formatRegionForDisplay(region),
              }))}
              searchable
              disabled={disabled}
              {...field}
              error={errors.businessProfile?.location?.region?.message}
            />
          )}
        />
      )}

      {/* Conditional: Location - City (only shown for Israel) */}
      {isIsrael && (
        <Controller
          name="businessProfile.location.city"
          control={control}
          render={({ field }) => (
            <Select
              label="City"
              placeholder={selectedRegion ? 'Select city' : 'Select region first'}
              withAsterisk
              data={availableCities}
              searchable
              disabled={!selectedRegion || disabled}
              {...field}
              error={errors.businessProfile?.location?.city?.message}
            />
          )}
        />
      )}

      {/* Required: Industry */}
      <Controller
        name="businessProfile.industry"
        control={control}
        render={({ field }) => (
          <Select
            label="Industry"
            placeholder="Select your industry"
            withAsterisk
            data={INDUSTRIES}
            searchable
            disabled={disabled}
            {...field}
            error={errors.businessProfile?.industry?.message}
          />
        )}
      />

      {/* Required: Number of Employees */}
      <Controller
        name="businessProfile.numberOfEmployees"
        control={control}
        render={({ field }) => (
          <Select
            label="Number of Employees"
            placeholder="Select company size"
            withAsterisk
            data={EMPLOYEE_COUNTS}
            disabled={disabled}
            {...field}
            error={errors.businessProfile?.numberOfEmployees?.message}
          />
        )}
      />

      {/* Optional: Logo URL */}
      <TextInput
        label="Logo URL"
        placeholder="https://example.com/logo.png"
        disabled={disabled}
        {...register('businessProfile.logo.url')}
        error={errors.businessProfile?.logo?.url?.message}
      />

      {/* Optional: Logo Alt Text */}
      <TextInput
        label="Logo Alt Text"
        placeholder="Company logo description"
        disabled={disabled}
        {...register('businessProfile.logo.alt')}
        error={errors.businessProfile?.logo?.alt?.message}
      />

      {/* Optional: Website */}
      <TextInput
        label="Website"
        placeholder="https://www.yourcompany.com"
        disabled={disabled}
        {...register('businessProfile.website')}
        error={errors.businessProfile?.website?.message}
      />

      {/* Optional: Contact Email */}
      <TextInput
        label="Contact Email"
        placeholder="contact@yourcompany.com"
        type="email"
        disabled={disabled}
        {...register('businessProfile.contactEmail')}
        error={errors.businessProfile?.contactEmail?.message}
      />

      {/* Optional: Social Media - LinkedIn */}
      <TextInput
        label="LinkedIn"
        placeholder="https://www.linkedin.com/company/yourcompany"
        disabled={disabled}
        {...register('businessProfile.socialMedia.linkedin')}
        error={errors.businessProfile?.socialMedia?.linkedin?.message}
      />

      {/* Optional: Social Media - Twitter */}
      <TextInput
        label="Twitter"
        placeholder="https://twitter.com/yourcompany"
        disabled={disabled}
        {...register('businessProfile.socialMedia.twitter')}
        error={errors.businessProfile?.socialMedia?.twitter?.message}
      />

      {/* Optional: Social Media - Facebook */}
      <TextInput
        label="Facebook"
        placeholder="https://www.facebook.com/yourcompany"
        disabled={disabled}
        {...register('businessProfile.socialMedia.facebook')}
        error={errors.businessProfile?.socialMedia?.facebook?.message}
      />

      {/* Optional: Description */}
      <Textarea
        label="Company Description"
        placeholder="Tell us about your company (max 2000 characters)"
        minRows={4}
        maxRows={8}
        disabled={disabled}
        {...register('businessProfile.description')}
        error={errors.businessProfile?.description?.message}
      />

      {/* Consent and Legal Checkboxes - Only show during registration */}
      {showConsentCheckboxes && (
        <ConsentCheckboxes
          control={control}
          errors={errors}
          disabled={disabled}
          profileType="business"
        />
      )}
    </>
  );
}
