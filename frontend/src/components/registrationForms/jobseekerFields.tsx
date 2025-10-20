import { TextInput, Select, Textarea, MultiSelect } from "@mantine/core";
import { UseFormRegister, FieldErrors, Control, Controller } from 'react-hook-form';
import { TUsers } from '@/Types';
// @ts-ignore
import WORK_ARRANGEMENTS from '@/data/workArr';

type JobseekerFieldsProps = {
  register: UseFormRegister<TUsers>;
  errors: FieldErrors<TUsers>;
  control: Control<TUsers>;
}

const EDUCATION_LEVELS = [
  "High School",
  "Associate Degree",
  "Bachelor's Degree",
  "Master's Degree",
  "Doctorate",
  "Other"
];

export function JobseekerFields({ register, errors, control }: JobseekerFieldsProps) {
  return (
    <>
      {/* Required: First Name */}
      <TextInput
        label="First Name"
        placeholder="Enter your first name"
        withAsterisk
        {...register('jobseekerProfile.firstName')}
        error={errors.jobseekerProfile?.firstName?.message}
      />

      {/* Required: Last Name */}
      <TextInput
        label="Last Name"
        placeholder="Enter your last name"
        withAsterisk
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
        {...register('jobseekerProfile.linkedinPage')}
        error={errors.jobseekerProfile?.linkedinPage?.message}
      />

      {/* Optional: Resume URL/Path */}
      <TextInput
        label="Resume URL"
        placeholder="Link to your resume (max 1024 characters)"
        {...register('jobseekerProfile.resume')}
        error={errors.jobseekerProfile?.resume?.message}
      />

      {/* Optional: Skills */}
      <Controller
        name="jobseekerProfile.skills"
        control={control}
        render={({ field }) => (
          <MultiSelect
            label="Skills"
            placeholder="Type and press Enter to add skills"
            data={field.value || []}
            searchable
            {...field}
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
        {...register('jobseekerProfile.description')}
        error={errors.jobseekerProfile?.description?.message}
      />
    </>
  );
}
