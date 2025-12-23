import { useEffect, useRef, useState } from 'react';
import { IconAlertCircle } from '@tabler/icons-react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import {
  Alert,
  Anchor,
  Button,
  Checkbox,
  FileInput,
  List,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { RootState } from '@/store/store';
import { TApplication } from '@/Types';
import { announceToScreenReader, autocompleteValues } from '@/utils/accessibility';
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

  // ACCESSIBILITY: Refs for focus management
  const firstFieldRef = useRef<HTMLInputElement>(null);
  const errorSummaryRef = useRef<HTMLDivElement>(null);

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

  // ACCESSIBILITY: Focus management when modal opens
  useEffect(() => {
    if (opened) {
      // Focus error summary if there are errors, otherwise focus first field
      const targetRef = Object.keys(errors).length > 0 ? errorSummaryRef : firstFieldRef;
      setTimeout(() => {
        targetRef.current?.focus();
      }, 100);
    }
  }, [opened, errors]);

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
      // ACCESSIBILITY: Announce form submission to screen readers
      announceToScreenReader('Submitting your application, please wait', 'polite');

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

      // ACCESSIBILITY: Announce success to screen readers
      announceToScreenReader('Application submitted successfully', 'assertive');

      notifications.show({
        title: 'Application',
        message: 'Application submitted successfully',
        color: 'green',
      });
    } catch (error) {
      console.error(error);

      // ACCESSIBILITY: Announce error to screen readers
      announceToScreenReader('Application failed to submit. Please try again.', 'assertive');

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
      <form onSubmit={handleSubmit(onSubmit)} aria-label="Job application form">
        <Stack w={{ base: '100%', md: '95%' }} mx="auto">
          {/* ACCESSIBILITY: Error summary - WCAG 3.3.1 */}
          {Object.keys(errors).length > 0 && (
            <Alert
              icon={<IconAlertCircle />}
              title="Please fix the following errors:"
              color="red"
              variant="light"
              ref={errorSummaryRef}
              tabIndex={-1}
              role="alert"
              aria-live="assertive"
            >
              <List size="sm">
                {errors.firstName && <List.Item>First name: {errors.firstName.message}</List.Item>}
                {errors.lastName && <List.Item>Last name: {errors.lastName.message}</List.Item>}
                {errors.email && <List.Item>Email: {errors.email.message}</List.Item>}
                {errors.phone && <List.Item>Phone: {errors.phone.message}</List.Item>}
                {errors.message && <List.Item>Message: {errors.message.message}</List.Item>}
                {errors.applicationDataConsent && (
                  <List.Item>Consent: {errors.applicationDataConsent.message}</List.Item>
                )}
                {resumeError && <List.Item>Resume: {resumeError}</List.Item>}
              </List>
            </Alert>
          )}

          <TextInput
            label="First Name"
            required
            {...register('firstName')}
            ref={firstFieldRef}
            error={errors.firstName?.message}
            aria-required="true"
            aria-invalid={!!errors.firstName}
            aria-describedby={errors.firstName ? 'firstName-error' : undefined}
            autoComplete={autocompleteValues.firstName}
            id="application-firstName"
          />
          {errors.firstName && (
            <Text id="firstName-error" size="xs" c="red" role="alert">
              {errors.firstName.message}
            </Text>
          )}

          <TextInput
            label="Last Name"
            required
            {...register('lastName')}
            error={errors.lastName?.message}
            aria-required="true"
            aria-invalid={!!errors.lastName}
            aria-describedby={errors.lastName ? 'lastName-error' : undefined}
            autoComplete={autocompleteValues.lastName}
            id="application-lastName"
          />
          {errors.lastName && (
            <Text id="lastName-error" size="xs" c="red" role="alert">
              {errors.lastName.message}
            </Text>
          )}

          <TextInput
            label="Email"
            required
            {...register('email')}
            error={errors.email?.message}
            aria-required="true"
            aria-invalid={!!errors.email}
            aria-describedby={errors.email ? 'email-error' : undefined}
            autoComplete={autocompleteValues.email}
            type="email"
            id="application-email"
          />
          {errors.email && (
            <Text id="email-error" size="xs" c="red" role="alert">
              {errors.email.message}
            </Text>
          )}

          <TextInput
            label="Phone"
            {...register('phone')}
            error={errors.phone?.message}
            aria-invalid={!!errors.phone}
            aria-describedby={errors.phone ? 'phone-error' : undefined}
            autoComplete={autocompleteValues.phone}
            type="tel"
            id="application-phone"
          />
          {errors.phone && (
            <Text id="phone-error" size="xs" c="red" role="alert">
              {errors.phone.message}
            </Text>
          )}

          <FileInput
            label="Resume/CV"
            accept="application/pdf"
            required
            onChange={handleResumeChange}
            error={resumeError}
            aria-required="true"
            aria-invalid={!!resumeError}
            aria-describedby={resumeError ? 'resume-error' : undefined}
            id="application-resume"
          />
          {resumeError && (
            <Text id="resume-error" size="xs" c="red" role="alert">
              {resumeError}
            </Text>
          )}

          <Textarea
            label="Message"
            {...register('message')}
            error={errors.message?.message}
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? 'message-error' : undefined}
            id="application-message"
            placeholder="Optional: Add a message to the employer"
          />
          {errors.message && (
            <Text id="message-error" size="xs" c="red" role="alert">
              {errors.message.message}
            </Text>
          )}

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
                error={errors.applicationDataConsent?.message}
                aria-required="true"
                aria-invalid={!!errors.applicationDataConsent}
                aria-describedby={errors.applicationDataConsent ? 'consent-error' : undefined}
                id="application-consent"
              />
            )}
          />
          {errors.applicationDataConsent && (
            <Text id="consent-error" size="xs" c="red" role="alert">
              {errors.applicationDataConsent.message}
            </Text>
          )}

          <Button
            type="submit"
            mx="auto"
            w={200}
            disabled={!isValid || !resumeFile || !!resumeError}
            loading={isLoading}
            aria-label={isLoading ? 'Submitting application...' : 'Submit application'}
          >
            {isLoading ? 'Submitting...' : 'Submit'}
          </Button>
        </Stack>
      </form>
    </Modal>
  );
};
