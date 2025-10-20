import { TextInput, Select, Textarea } from "@mantine/core";
import { UseFormRegister, FieldErrors, Control, Controller, useWatch } from 'react-hook-form';
import { TUsers } from '@/Types';
// @ts-ignore
import INDUSTRIES from '@/data/industries';
// @ts-ignore
import { REGIONS, getCitiesByRegion } from '@/data/israelCities';
import { useMemo } from 'react';

type BusinessFieldsProps = {
  register: UseFormRegister<TUsers>;
  errors: FieldErrors<TUsers>;
  control: Control<TUsers>;
}

const EMPLOYEE_COUNTS = [
  "1-10",
  "11-50",
  "51-200",
  "201-500",
  "501-1000",
  "1000+"
];

export function BusinessFields({ register, errors, control }: BusinessFieldsProps) {
  // Watch the selected region to filter cities
  const selectedRegion = useWatch({
    control,
    name: 'businessProfile.location.country',
  });

  // Get cities for the selected region
  const availableCities = useMemo(() => {
    if (!selectedRegion) {return [];}
    return getCitiesByRegion(selectedRegion);
  }, [selectedRegion]);

  return (
    <>
      {/* Required: Company Name */}
      <TextInput
        label="Company Name"
        placeholder="Enter your company name"
        withAsterisk
        {...register('businessProfile.name')}
        error={errors.businessProfile?.name?.message}
      />

      {/* Required: Location - Region (stored as country in schema) */}
      <Controller
        name="businessProfile.location.country"
        control={control}
        render={({ field }) => (
          <Select
            label="Region"
            placeholder="Select region"
            withAsterisk
            data={REGIONS}
            searchable
            {...field}
            error={errors.businessProfile?.location?.country?.message}
          />
        )}
      />

      {/* Required: Location - City */}
      <Controller
        name="businessProfile.location.city"
        control={control}
        render={({ field }) => (
          <Select
            label="City"
            placeholder={selectedRegion ? "Select city" : "Select region first"}
            withAsterisk
            data={availableCities}
            searchable
            disabled={!selectedRegion}
            {...field}
            error={errors.businessProfile?.location?.city?.message}
          />
        )}
      />

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
            {...field}
            error={errors.businessProfile?.numberOfEmployees?.message}
          />
        )}
      />

      {/* Optional: Logo URL */}
      <TextInput
        label="Logo URL"
        placeholder="https://example.com/logo.png"
        {...register('businessProfile.logo.url')}
        error={errors.businessProfile?.logo?.url?.message}
      />

      {/* Optional: Logo Alt Text */}
      <TextInput
        label="Logo Alt Text"
        placeholder="Company logo description"
        {...register('businessProfile.logo.alt')}
        error={errors.businessProfile?.logo?.alt?.message}
      />

      {/* Optional: Website */}
      <TextInput
        label="Website"
        placeholder="https://www.yourcompany.com"
        {...register('businessProfile.website')}
        error={errors.businessProfile?.website?.message}
      />

      {/* Optional: Contact Email */}
      <TextInput
        label="Contact Email"
        placeholder="contact@yourcompany.com"
        type="email"
        {...register('businessProfile.contactEmail')}
        error={errors.businessProfile?.contactEmail?.message}
      />

      {/* Optional: Social Media - LinkedIn */}
      <TextInput
        label="LinkedIn"
        placeholder="https://www.linkedin.com/company/yourcompany"
        {...register('businessProfile.socialMedia.linkedin')}
        error={errors.businessProfile?.socialMedia?.linkedin?.message}
      />

      {/* Optional: Social Media - Twitter */}
      <TextInput
        label="Twitter"
        placeholder="https://twitter.com/yourcompany"
        {...register('businessProfile.socialMedia.twitter')}
        error={errors.businessProfile?.socialMedia?.twitter?.message}
      />

      {/* Optional: Social Media - Facebook */}
      <TextInput
        label="Facebook"
        placeholder="https://www.facebook.com/yourcompany"
        {...register('businessProfile.socialMedia.facebook')}
        error={errors.businessProfile?.socialMedia?.facebook?.message}
      />

      {/* Optional: Description */}
      <Textarea
        label="Company Description"
        placeholder="Tell us about your company (max 2000 characters)"
        minRows={4}
        maxRows={8}
        {...register('businessProfile.description')}
        error={errors.businessProfile?.description?.message}
      />
    </>
  );
}