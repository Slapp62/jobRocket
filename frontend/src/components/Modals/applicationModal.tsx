import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  Anchor,
  Button,
  Checkbox,
  FileInput,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RootState } from '@/store/store';
import { TApplication } from '@/Types';
import { validateRequiredPdfFile } from '@/utils/fileValidation';
import { applicationSchema } from '@/validationRules/application.joi';

interface ApplicationModalProps {
  opened: boolean;
  onClose: () => void;
  listingID: string;
}

export const ApplicationModal = ({ opened, onClose, listingID }: ApplicationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  const user = useSelector((state: RootState) => state.userSlice.user);

  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TApplication>({
    mode: 'all',
    resolver: joiResolver(applicationSchema),
    shouldUnregister: false,
    criteriaMode: 'all',
  });

  useEffect(() => {
    if (user && opened) {
      reset({
        firstName: user.jobseekerProfile?.firstName,
        lastName: user.jobseekerProfile?.lastName,
        email: user.email,
        phone: user.phone || '',
        applicationDataConsent: false,
      });
    }
  }, [user, opened, reset]);

  /**
   * Handle resume file selection with validation
   * Validates the file and sets error state if validation fails
   */
  const handleResumeChange = (file: File | null) => {
    const error = validateRequiredPdfFile(file);
    setResumeError(error);
    setResumeFile(error ? null : file);
  };

  const onSubmit = async (data: TApplication) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      if (data.phone) {
        formData.append('phone', data.phone);
      }
      if (data.message) {
        formData.append('message', data.message);
      }
      if (resumeFile) {
        formData.append('resume', resumeFile);
      }
      formData.append('applicationDataConsent', String(data.applicationDataConsent));

      console.log(formData);
      
      await axios.post(`/api/applications/${listingID}`, formData);
      reset();
      notifications.show({
        title: 'Application',
        message: 'Application submitted successfully',
        color: 'green',
      });
    } catch (error) {
      console.error(error);
      notifications.show({
        title: 'Application',
        message: 'Application failed to submit.',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <Modal opened={opened} onClose={onClose} title="Application" zIndex={1000} size='md'>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack w={{ base: '100%', md: '95%' }} mx="auto">
          <TextInput
            label="First Name"
            required
            {...register('firstName')}
            error={errors.firstName?.message}
          />
          <TextInput
            label="Last Name"
            required
            {...register('lastName')}
            error={errors.lastName?.message}
          />
          <TextInput label="Email" required {...register('email')} error={errors.email?.message} />
          <TextInput label="Phone" {...register('phone')} error={errors.phone?.message} />

          <FileInput
            label="Resume/CV"
            accept="application/pdf"
            required
            onChange={handleResumeChange}
            error={resumeError}
          />
          <Textarea label="Message" {...register('message')} error={errors.message?.message} />
          <Controller
            name="applicationDataConsent"
            control={control}
            render={({ field: { value, ...field } }) => (
              <Checkbox
                {...field}
                checked={value}
                onChange={(event) => field.onChange(event.currentTarget.checked)}
                label={
                  <Text size="sm">
                    I consent to JobRocket sharing my data (full name, email, phone number, and resume via Cloudinary) as described in the{' '}
                    <Anchor href="/privacy-policy" target="_blank">
                      Privacy Policy.
                    </Anchor>
                  </Text>
                }
                error={errors. applicationDataConsent?.message}
              />
            )}
          />

          <Button
            type="submit"
            mx="auto"
            w={200}
            disabled={!isValid || !resumeFile || !!resumeError}
            loading={isLoading}
          >
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
