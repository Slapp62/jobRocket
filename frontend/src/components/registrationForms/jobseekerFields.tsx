import { TextInput, Select, Textarea } from "@mantine/core";
import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form';
import { TUsers } from '@/Types';
import WORK_ARRANGEMENTS from '../../data/workArr.ts';

type JobseekerFieldsProps = {
  register: UseFormRegister<TUsers>;
  errors: FieldErrors<TUsers>;
  control: Control<TUsers>;
  disabled?: boolean;
}

const EDUCATION_LEVELS = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other"
];

export function JobseekerFields({ register, errors, control, disabled = false }: JobseekerFieldsProps) {
  return (
    <>
      {/* Required: First Name */}
      <TextInput
        label="First Name"
        placeholder="Enter your first name"
        withAsterisk
        disabled={disabled}
        {...register('jobseekerProfile.firstName')}
        error={errors.jobseekerProfile?.firstName?.message}
      />

      {/* Required: Last Name */}
      <TextInput
        label="Last Name"
        placeholder="Enter your last name"
        withAsterisk
        disabled={disabled}
        {...register('jobseekerProfile.lastName')}
        error={errors.jobseekerProfile?.lastName?.message}
      />

      {/* Required: Highest Education */}
      <Controller
        name="jobseekerProfile.highestEducation"
        control={control}
        render={({ field }) => (
          <Select
            label="Highest Education"
            placeholder="Select your education level"
            withAsterisk
            disabled={disabled}
            data={EDUCATION_LEVELS}
            {...field}
            error={errors.jobseekerProfile?.highestEducation?.message}
          />
        )}
      />

      {/* Required: Preferred Work Arrangement */}
      <Controller
        name="jobseekerProfile.preferredWorkArrangement"
        control={control}
        render={({ field }) => (
          <Select
            label="Preferred Work Arrangement"
            placeholder="Select your preferred work arrangement"
            withAsterisk
            disabled={disabled}
            data={WORK_ARRANGEMENTS}
            searchable
            {...field}
            error={errors.jobseekerProfile?.preferredWorkArrangement?.message}
          />
        )}
      />

      {/* Optional: LinkedIn Page */}
      <TextInput
        label="LinkedIn Profile"
        placeholder="https://www.linkedin.com/in/yourprofile"
        disabled={disabled}
        {...register('jobseekerProfile.linkedinPage')}
        error={errors.jobseekerProfile?.linkedinPage?.message}
      />

      {/* Optional: Resume URL/Path */}
      <TextInput
        label="Resume URL"
        placeholder="Link to your resume (max 1024 characters)"
        disabled={disabled}
        {...register('jobseekerProfile.resume')}
        error={errors.jobseekerProfile?.resume?.message}
      />

      {/* Optional: Skills */}
      <Controller
        name="jobseekerProfile.skills"
        control={control}
        render={({ field }) => (
          <Textarea
            label="Skills"
            placeholder="Enter one skill per line"
            minRows={3}
            value={(field.value || []).join("\n")}
            onChange={(event) => {
              const next = event.currentTarget.value
                .split("\n")
                .map((line) => line.trim())
                .filter(Boolean);
              field.onChange(next);
            }}
            disabled={disabled}
            error={errors.jobseekerProfile?.skills?.message}
          />
        )}
      />

      {/* Optional: Description */}
      <Textarea
        label="Professional Summary"
        placeholder="Tell us about yourself (max 2000 characters)"
        minRows={4}
        maxRows={8}
        disabled={disabled}
        {...register('jobseekerProfile.description')}
        error={errors.jobseekerProfile?.description?.message}
      />
    </>
  );
}
