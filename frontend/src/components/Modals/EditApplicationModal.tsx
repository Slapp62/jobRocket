import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Button, FileInput, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { TApplication } from '@/Types';
import { applicationSchema } from '@/validationRules/application.joi';

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
  // Populate form with existing application data when modal opens
  useEffect(() => {
    if (application && opened) {
      reset({
        firstName: application.firstName,
        lastName: application.lastName,
        email: application.email,
        phone: application.phone || '',
        resumeUrl: application.resumeUrl,
        message: application.message || '',
      });
    }
  }, [application, opened, reset]);

  const onSubmit = async (data: TApplication) => {
    if (!application) {return;}

    try {
      setIsLoading(true);

      await axios.put(`/api/applications/${application._id}`, data);

      notifications.show({
        title: 'Success',
        message: 'Application updated successfully',
        color: 'green',
      });

      onClose();
      if (onSuccess) {onSuccess();}
    } catch (error: any) {
      console.error(error);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || 'Failed to update application',
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!application) {return null;}

  return (
    <Modal opened={opened} onClose={onClose} title="Edit Application" size="lg" zIndex={1000}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack p="lg">
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
            onChange={setResumeFile} // Capture file directly
            error={errors.resumeUrl?.message}
          />
          <Textarea label="Message" {...register('message')} error={errors.message?.message} />
          <Button type="submit" mx="auto" w={200} disabled={!isValid} loading={isLoading}>
            Update Application
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
