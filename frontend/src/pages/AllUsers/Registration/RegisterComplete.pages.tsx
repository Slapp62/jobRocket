import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Container, LoadingOverlay, Paper, Text, Title } from '@mantine/core';
import { setUser } from '@/store/userSlice';
import { googleProfile, TUsers } from '@/Types';
import { registrationSchema } from '@/validationRules/register.joi';
import { BusinessFields } from './registrationForms/businessFields';
import { JobseekerFields } from './registrationForms/jobseekerFields';
import { SharedCredentials } from './registrationForms/shareCredentials';

export default function RegisterCompletePage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [googleProfile, setGoogleProfile] = useState<googleProfile>();
  const [loading, setLoading] = useState(false);

  const method = searchParams.get('method');
  const type = searchParams.get('type');

  // Validate parameters
  useEffect(() => {
    if (!method || !['google', 'email'].includes(method)) {
      navigate('/register');
      return;
    }

    if (!type || !['jobseeker', 'business'].includes(type)) {
      navigate(`/register/account-type?method=${method}`);
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
  }, [method, type, navigate]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<TUsers>({
    resolver: joiResolver(registrationSchema),
    defaultValues: {
      profileType: type as 'jobseeker' | 'business',
      email: googleProfile?.email || '',
      phone: '',
      ...(type === 'jobseeker' && {
        jobseekerProfile: {
          firstName: googleProfile?.firstName || '',
          lastName: googleProfile?.lastName || '',
        },
      }),
    },
  });

  const onSubmit = async (data: Partial<TUsers>) => {
    try {
      setLoading(true);

      if (method === 'google') {
        // Google registration
        const response = await axios.post('/api/auth/google/register/complete', {
          ...data,
          profileType: type,
        });

        dispatch(setUser(response.data.user));
        navigate(response.data.redirectPath);
      } else {
        // Email registration (existing endpoint)
        const response = await axios.post('/api/users', {
          ...data,
          profileType: type,
        });

        dispatch(setUser(response.data.user));
        navigate('/login?success=registration_complete');
      }
    } catch (error) {
      setLoading(false);
      // Handle errors with notifications
    }
  };

  return (
    <Container size="md" py="xl">
      <Paper shadow="md" p="xl" radius="md" pos="relative">
        <LoadingOverlay visible={loading} />

        <Title order={1} ta="center" mb="sm">
          Complete Your Profile
        </Title>
        {method === 'google' && googleProfile && (
          <Text ta="center" c="dimmed" mb="md">
            Signing up with: {googleProfile.email}
          </Text>
        )}
        <Text ta="center" c="dimmed" mb="xl">
          {type === 'jobseeker' ? 'Job Seeker' : 'Business'} Account
        </Text>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Shared fields (email, password if email method, phone) */}
          {method === 'email' && (
            <SharedCredentials control={control} register={register} errors={errors} />
          )}

          {/* Profile-specific fields */}
          {type === 'jobseeker' ? (
            <JobseekerFields
              control={control}
              register={register}
              errors={errors}
              defaultFirstName={googleProfile?.firstName}
              defaultLastName={googleProfile?.lastName}
            />
          ) : (
            <BusinessFields control={control} register={register} errors={errors} />
          )}

          <Button type="submit" fullWidth size="lg" mt="xl" loading={loading}>
            Complete Registration
          </Button>

          <Button
            variant="rocketSubtle"
            fullWidth
            mt="md"
            onClick={() => navigate(`/register/account-type?method=${method}`)}
          >
            ← Back
          </Button>
        </form>
      </Paper>
    </Container>
  );
}
