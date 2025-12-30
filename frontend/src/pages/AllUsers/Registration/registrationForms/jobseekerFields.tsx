import { IconPhone } from '@tabler/icons-react';
import { Control, Controller, FieldErrors, UseFormRegister } from 'react-hook-form';
import { Anchor, FileInput, Flex, Select, TagsInput, Textarea, TextInput } from '@mantine/core';
import WORK_ARRANGEMENTS from '@/data/workArr.ts';
import { TUsers } from '@/Types';
import { validatePdfFile } from '@/utils/fileValidation';
import { ConsentCheckboxes } from './ConsentCheckboxes';

type JobseekerFieldsProps = {
  register: UseFormRegister<TUsers>;
  errors: FieldErrors<TUsers>;
  control: Control<TUsers>;
  disabled?: boolean;
  resumeFile?: File | null;
  setResumeFile?: (file: File | null) => void;
  currentResumeUrl?: string | null;
  resumeError?: string | null;
  setResumeError?: (error: string | null) => void;
  defaultFirstName?: string;
  defaultLastName?: string;
  showConsentCheckboxes?: boolean;
};

const EDUCATION_LEVELS = [
  'High School',
  'Associate Degree',
  "Bachelor's Degree",
  "Master's Degree",
  'Doctorate',
  'Other',
];

export function JobseekerFields({
  register,
  errors,
  control,
  disabled = false,
  resumeFile,
  setResumeFile,
  currentResumeUrl,
  resumeError,
  setResumeError,
  defaultFirstName,
  defaultLastName,
  showConsentCheckboxes = true,
}: JobseekerFieldsProps) {
  /**
   * Handle resume file change with validation
   * Validates the file and updates error state
   */
  const handleResumeChange = (file: File | null) => {
    const error = validatePdfFile(file);
    if (setResumeError) {
      setResumeError(error);
    }
    if (setResumeFile) {
      setResumeFile(error ? null : file);
    }
  };

  return (
    <Flex gap="sm" direction="column">
      {/* Required: First Name */}
      <TextInput
        label="First Name"
        placeholder="Enter your first name"
        withAsterisk
        disabled={disabled}
        {...register('jobseekerProfile.firstName')}
        defaultValue={defaultFirstName}
        error={errors.jobseekerProfile?.firstName?.message}
      />

      {/* Required: Last Name */}
      <TextInput
        label="Last Name"
        placeholder="Enter your last name"
        withAsterisk
        disabled={disabled}
        {...register('jobseekerProfile.lastName')}
        defaultValue={defaultLastName}
        error={errors.jobseekerProfile?.lastName?.message}
      />

      <TextInput
        rightSection={<IconPhone />}
        label="Phone"
        required
        {...register('phone', {
          onChange: (e) => {
            e.target.value = e.target.value.replace(/[^\d-]/g, '');
          },
        })}
        error={errors.phone?.message}
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

      {/* Optional: Resume URL/Path */}

      <FileInput
        label="Resume URL"
        description="Your resume will pre-fill in application forms."
        placeholder="Upload your resume (PDF only)"
        disabled={disabled}
        value={resumeFile}
        onChange={handleResumeChange}
        error={resumeError}
        clearable
        accept="application/pdf"
      />
      {currentResumeUrl && (
        <Anchor href={currentResumeUrl} target="_blank" size="sm">
          View Current Resume
        </Anchor>
      )}

      {/* Optional: LinkedIn Page */}
      <TextInput
        label="LinkedIn Profile"
        placeholder="https://www.linkedin.com/in/yourprofile"
        disabled={disabled}
        {...register('jobseekerProfile.linkedinPage')}
        error={errors.jobseekerProfile?.linkedinPage?.message}
      />

      {/* Optional: Skills */}
      <Controller
        name="jobseekerProfile.skills"
        control={control}
        render={({ field }) => (
          <TagsInput
            label="Skills"
            placeholder="Type a skill and press Enter"
            description="Add your professional skills (max 25)"
            disabled={disabled}
            maxTags={25}
            {...field}
            error={errors.jobseekerProfile?.skills?.message}
            onKeyDown={(e) => {
              // Prevent form submission when Enter is pressed in TagsInput
              if (e.key === 'Enter') {
                e.preventDefault();
                e.stopPropagation();
              }
            }}
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

      {/* Consent and Legal Checkboxes - Only show during registration */}
      {showConsentCheckboxes && (
        <ConsentCheckboxes
          control={control}
          errors={errors}
          disabled={disabled}
          profileType="jobseeker"
        />
      )}
    </Flex>
  );
}
