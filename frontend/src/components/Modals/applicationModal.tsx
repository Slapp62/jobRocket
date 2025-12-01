import { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { Button, FileInput, Modal, Stack, Textarea, TextInput } from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RootState } from '@/store/store';
import { TApplication } from '@/Types';
import { applicationSchema } from '@/validationRules/application.joi';

interface ApplicationModalProps {
  opened: boolean;
  onClose: () => void;
  listingID: string;
}

export const ApplicationModal = ({ opened, onClose, listingID }: ApplicationModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);

  const {
    reset,
    register,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TApplication>({
    mode: 'all',
    resolver: joiResolver(applicationSchema),
    shouldUnregister: false,
    criteriaMode: 'all',
  });

  const onSubmit = async (data: TApplication) => {
    try {
      setIsLoading(true);

      const formData = new FormData();
      formData.append('firstName', data.firstName);
      formData.append('lastName', data.lastName);
      formData.append('email', data.email);
      if (data.phone) formData.append('phone', data.phone);
      if (data.message) formData.append('message', data.message);
      if (resumeFile) formData.append('resume', resumeFile);
            
      const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';
      await axios.post(`${API_BASE_URL}/api/applications/${listingID}`, formData, {
        headers: {
          'x-auth-token': localStorage.getItem('token') || null,
        },
      });
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

  const user = useSelector((state: RootState) => state.userSlice.user);

  return (
    <Modal opened={opened} onClose={onClose} title="Application" size="lg" zIndex={1000}>
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
          <Button type="submit" mx="auto" w={200} disabled={!isValid || !resumeFile} loading={isLoading}>
            Submit
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
