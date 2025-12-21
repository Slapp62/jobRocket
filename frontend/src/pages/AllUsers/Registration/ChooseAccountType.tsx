import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { IconBriefcase, IconUser } from '@tabler/icons-react';
import axios from 'axios';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Anchor,
  Button,
  Card,
  Checkbox,
  Container,
  Fieldset,
  LoadingOverlay,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { setUser } from '@/store/userSlice';
import { googleProfile, TUsers } from '@/Types';
import { googleRegistrationSchema, registrationSchema } from '@/validationRules/register.joi';
import { BusinessFields } from './registrationForms/businessFields';
import { JobseekerFields } from './registrationForms/jobseekerFields';

export default function RegisterAccountTypePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const method = searchParams.get('method');

  const [selectedType, setSelectedType] = useState<'jobseeker' | 'business' | null>(null);
  const [googleProfile, setGoogleProfile] = useState<googleProfile | null>(null);
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  // Validate method parameter
  useEffect(() => {
    if (!method || !['google', 'email'].includes(method)) {
      navigate('/register');
      return;
    }

    // Fetch Google profile if Google method
    if (method === 'google') {
      setLoading(true);
      axios
        .get('/api/auth/google/profile-temp')
        .then((res) => {
          setGoogleProfile(res.data);
          setLoading(false);
        })
        .catch(() => {
          navigate('/register?error=session_expired');
        });
    }
  }, [method, navigate]);

  // Get stored email/password from sessionStorage (for email method)
  const storedEmail = method === 'email' ? sessionStorage.getItem('registrationEmail') : null;
  const storedPassword = method === 'email' ? sessionStorage.getItem('registrationPassword') : null;

  const {
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors },
  } = useForm<TUsers>({
    mode: 'all',
    resolver: joiResolver(method === 'google' ? googleRegistrationSchema : registrationSchema),
    shouldUnregister: false,
    criteriaMode: 'all',
    defaultValues: {
      profileType: selectedType || 'jobseeker',
      email: method === 'google' ? googleProfile?.email || '' : storedEmail || '',
      password: method === 'google' ? undefined : storedPassword || '',
      phone: '',
      terms: false,
      ...(selectedType === 'jobseeker' &&
        method === 'google' && {
          jobseekerProfile: {
            firstName: googleProfile?.firstName || '',
            lastName: googleProfile?.lastName || '',
          },
        }),
    },
  });

  // Update profileType when account type is selected
  useEffect(() => {
    if (selectedType) {
      setValue('profileType', selectedType);
    }
  }, [selectedType, setValue]);

  // Update email when Google profile is fetched
  useEffect(() => {
    if (method === 'google' && googleProfile?.email) {
      setValue('email', googleProfile.email);
    }
  }, [googleProfile, method, setValue]);

  // Debug: Log validation errors
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      console.log('❌ VALIDATION ERRORS:', errors);
    }
  }, [errors]);

  const handleTypeSelect = (type: 'jobseeker' | 'business') => {
    setSelectedType(type);
    setValue('profileType', type);
  };

  const onSubmit = async (data: TUsers) => {
    console.log('🔍 FORM SUBMISSION');
    console.log('📋 Data:', JSON.stringify(data, null, 2));
    console.log('📋 Method:', method);
    console.log('📋 Selected Type:', selectedType);
    console.log('❌ Form Errors:', errors);

    if (resumeError) {
      notifications.show({
        title: 'Error',
        message: resumeError,
        color: 'red',
      });
      return;
    }

    setLoading(true);
    try {
      let response;

      if (method === 'google') {
        // Google registration - send to Google complete endpoint
        response = await axios.post('/api/auth/google/register/complete', {
          ...data,
          profileType: selectedType,
        });

        dispatch(setUser(response.data.user));
        navigate(response.data.redirectPath);
      } else {
        // Email registration
        const payload: any = {
          email: data.email,
          password: data.password,
          phone: data.phone,
          profileType: data.profileType,
        };

        // Add ONLY the appropriate profile based on type
        if (data.profileType === 'jobseeker') {
          payload.jobseekerProfile = data.jobseekerProfile;
        } else {
          payload.businessProfile = data.businessProfile;
        }

        // If there's a resume file, use FormData
        if (resumeFile) {
          const formData = new FormData();

          // Add all the regular data
          formData.append('email', payload.email);
          formData.append('password', payload.password);
          formData.append('phone', payload.phone || '');
          formData.append('profileType', payload.profileType);

          if (payload.jobseekerProfile) {
            // Flatten jobseekerProfile fields
            Object.keys(payload.jobseekerProfile).forEach((key) => {
              const value = payload.jobseekerProfile[key];
              if (value !== undefined && value !== null) {
                if (Array.isArray(value)) {
                  formData.append(`jobseekerProfile[${key}]`, JSON.stringify(value));
                } else {
                  formData.append(`jobseekerProfile[${key}]`, String(value));
                }
              }
            });
          }

          if (payload.businessProfile) {
            Object.keys(payload.businessProfile).forEach((key) => {
              const value = payload.businessProfile[key];
              if (value !== undefined && value !== null) {
                if (typeof value === 'object' && !Array.isArray(value)) {
                  // Handle nested objects like location
                  formData.append(`businessProfile[${key}]`, JSON.stringify(value));
                } else {
                  formData.append(`businessProfile[${key}]`, String(value));
                }
              }
            });
          }

          // Add the resume file
          formData.append('resume', resumeFile);

          response = await axios.post('/api/users/', formData);
        } else {
          // No file, use regular JSON
          response = await axios.post('/api/users/', payload);
        }

        if (response.status === 201) {
          // Clear session storage
          sessionStorage.removeItem('registrationEmail');
          sessionStorage.removeItem('registrationPassword');

          // Navigate to login - success notification will be shown by Login page
          navigate('/login?success=registration_complete');
        }
      }
    } catch (error: any) {
      setLoading(false);
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || error.message || 'Registration failed',
        color: 'red',
      });
    }
  };

  return (
    <Container size="md" py="xl">
      <Paper shadow="md" p="xl" radius="md" pos="relative">
        <LoadingOverlay visible={loading} />

        <Title order={1} ta="center" mb="md">
          {selectedType ? 'Complete Your Profile' : 'Select Account Type'}
        </Title>

        {method === 'google' && googleProfile && (
          <Text ta="center" c="dimmed" mb="md">
            Signing up with: {googleProfile.email}
          </Text>
        )}

        {!selectedType ? (
          <>
            <Text ta="center" c="dimmed" mb="xl">
              What type of account would you like to create?
            </Text>

            <SimpleGrid cols={2} spacing="lg">
              {/* Job Seeker Card */}
              <Card
                shadow="sm"
                padding="xl"
                radius="md"
                withBorder
                style={{ cursor: 'pointer' }}
                onClick={() => handleTypeSelect('jobseeker')}
              >
                <Card.Section p="xl" ta="center">
                  <IconUser size={64} stroke={1.5} />
                  <Title order={3} mt="md">
                    Job Seeker
                  </Title>
                  <Text size="sm" c="dimmed" mt="sm">
                    Looking for job opportunities
                  </Text>
                </Card.Section>
              </Card>

              {/* Business Card */}
              <Card
                shadow="sm"
                padding="xl"
                radius="md"
                withBorder
                style={{ cursor: 'pointer' }}
                onClick={() => handleTypeSelect('business')}
              >
                <Card.Section p="xl" ta="center">
                  <IconBriefcase size={64} stroke={1.5} />
                  <Title order={3} mt="md">
                    Business
                  </Title>
                  <Text size="sm" c="dimmed" mt="sm">
                    Posting job listings
                  </Text>
                </Card.Section>
              </Card>
            </SimpleGrid>

            <Button variant="subtle" fullWidth mt="xl" onClick={() => navigate('/register')}>
              ← Back to sign up options
            </Button>
          </>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <Text ta="center" c="dimmed" mb="md">
                {selectedType === 'jobseeker' ? 'Job Seeker' : 'Business'} Account
              </Text>

              {/* Profile-specific fields */}
              {selectedType === 'jobseeker' ? (
                <JobseekerFields
                  control={control}
                  register={register}
                  errors={errors}
                  resumeFile={resumeFile}
                  setResumeFile={setResumeFile}
                  resumeError={resumeError}
                  setResumeError={setResumeError}
                  defaultFirstName={method === 'google' ? googleProfile?.firstName : undefined}
                  defaultLastName={method === 'google' ? googleProfile?.lastName : undefined}
                />
              ) : (
                <BusinessFields control={control} register={register} errors={errors} />
              )}

              <Button type="submit" fullWidth size="lg" mt="xl" loading={loading}>
                Complete Registration
              </Button>

              <Button variant="subtle" fullWidth onClick={() => setSelectedType(null)}>
                ← Change account type
              </Button>
            </Stack>
          </form>
        )}
      </Paper>
    </Container>
  );
}
