import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Anchor, Button, Text, FileInput, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { TApplication } from '@/Types';
import { applicationSchema } from '@/validationRules/application.joi';
import { validatePdfFile } from '@/utils/fileValidation';

interface EditApplicationModalProps {
  opened: boolean;
  onClose: () => void;
  application: TApplication | null;
  onSuccess?: () => void;
}

export const EditApplicationModal = ({
  opened,
  onClose,
  application,
  onSuccess,
}: EditApplicationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TApplication>({
    mode: 'all',
    resolver: joiResolver(applicationSchema),
    shouldUnregister: false,
    criteriaMode: 'all',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  // Populate form with existing application data when modal opens
  useEffect(() => {
    if (application && opened) {
      reset({
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        phone: application.phone || '',
        message: application.message || '',
      });
      setResumeFile(null);
      setResumeError(null);
    }
  }, [application, opened, reset]);

  const handleResumeChange = (file: File | null) => {
    const error = validatePdfFile(file);
    setResumeError(error);
    setResumeFile(error ? null : file);
  };

  const onSubmit = async (data: TApplication) => {
    if (!application) {return;}

    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      if (data.phone) {formData.append('phone', data.phone);}
      if (data.message) {formData.append('message', data.message);}
      if (resumeFile) {formData.append('resume', resumeFile);}

      await axios.put(`/api/applications/${application._id}`, formData);

      notifications.show({
        title: 'Success',
        message: 'Application updated successfully',
        color: 'green',
      });

      if (onSuccess) {onSuccess();}
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update application',
        color: 'red',
      });
    } finally {
      onClose();
      setIsLoading(false);
    }
  };

  if (!application) {return null;}

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Application" size="lg" zIndex={1000}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p="lg">
          <Text c="dimmed" fz="xs">*If the employer already reviewed your application, they may not see your changes.</Text>
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
            description="Upload a new resume to replace the current one"
            accept="application/pdf"
            value={resumeFile}
            onChange={handleResumeChange}
            error={resumeError}
            clearable
          />
          {application.resumeUrl && (
            <Anchor href={application.resumeUrl} target="_blank" size="sm">
              View Current Resume
            </Anchor>
          )}

          <Textarea label="Message" {...register('message')} error={errors.message?.message} />
          <Button type="submit" mx="auto" w={200} disabled={!isValid || !!resumeError} loading={isLoading}>
            Update Application
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
