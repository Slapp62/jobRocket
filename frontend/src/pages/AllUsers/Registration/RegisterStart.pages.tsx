import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { IconBrandGoogle } from '@tabler/icons-react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {
  Anchor,
  Button,
  Container,
  Divider,
  Paper,
  PasswordInput,
  Stack,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import styles from '@/styles/gradients.module.css';

// Simple validation schema for email/password only
const credentialsSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .messages({
      'string.email': 'Please enter a valid email',
      'string.empty': 'Email is required',
      'any.required': 'Email is required',
    }),
  password: Joi.string()
    .required()
    .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*-]).{8,20}$/)
    .messages({
      'string.pattern.base':
        'Password must be between 8 and 20 characters and contain at least 1 uppercase, 1 number, and 1 special character',
      'string.empty': 'Password is required',
      'any.required': 'Password is required',
    }),
});

type Credentials = {
  email: string;
  password: string;
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);
  const [redirectCountdown, setRedirectCountdown] = useState<number | null>(null);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: joiResolver(credentialsSchema),
    mode: 'onBlur',
  });

  // Handle OAuth error redirects
  useEffect(() => {
    const error = searchParams.get('error');
    const message = searchParams.get('message');

    if (error) {
      let notificationMessage = message || 'Registration failed';
      let shouldRedirect = false;

      if (error.includes('account_exists')) {
        notificationMessage = decodeURIComponent(message || 'An account with this email already exists.');
        shouldRedirect = true;

        // Show notification with countdown
        notifications.show({
          title: 'Account Already Exists',
          message: `${notificationMessage} Redirecting to login in 5 seconds...`,
          color: 'orange',
          autoClose: 5000,
        });

        // Start countdown
        setRedirectCountdown(5);
      } else {
        // Generic error
        notifications.show({
          title: 'Registration Failed',
          message: notificationMessage,
          color: 'red',
          autoClose: 5000,
        });
      }

      // Clean up URL
      searchParams.delete('error');
      searchParams.delete('message');
      navigate({ search: searchParams.toString() }, { replace: true });

      // Handle redirect countdown
      if (shouldRedirect) {
        const interval = setInterval(() => {
          setRedirectCountdown((prev) => {
            if (prev === null || prev <= 1) {
              clearInterval(interval);
              navigate('/login');
              return null;
            }
            return prev - 1;
          });
        }, 1000);

        return () => clearInterval(interval);
      }
    }
  }, [searchParams, navigate]);

  const onSubmit = (data: Credentials) => {
    setLoading(true);
    // Store credentials in session storage temporarily
    sessionStorage.setItem('registrationEmail', data.email);
    sessionStorage.setItem('registrationPassword', data.password);
    navigate('/register/account-type?method=email');
  };

  return (
    <Container size="xs" py="xl">
      <Paper withBorder shadow="lg" p="xl" radius="md" className={styles.cardGradientSubtle}>
        <Title order={1} ta="center" mb="md">
          Create Your Account
        </Title>
        <Text ta="center" c="dimmed" mb="xl">
          Choose how you'd like to sign up
        </Text>

        <Stack gap="md">
          {/* Google Sign Up */}
          <Button
            fullWidth
            size={isMobile ? 'md' : 'lg'}
            variant="filled"
            fz="md"
            leftSection={<IconBrandGoogle size={20} aria-hidden="true" />}
            onClick={() => {
              const apiUrl = import.meta.env.VITE_API_URL || (import.meta.env.DEV ? 'http://localhost:3000' : '');
              window.location.href = `${apiUrl}/api/auth/google/register`;
            }}
            aria-label="Sign up with Google"
          >
            Sign up with Google
          </Button>

          <Divider label="Or continue with email" labelPosition="center" />

          {/* Email/Password Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="Enter your email"
                type="email"
                size={isMobile ? 'md' : 'lg'}
                withAsterisk
                {...register('email')}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                size={isMobile ? 'md' : 'lg'}
                withAsterisk
                {...register('password')}
                error={errors.password?.message}
                description="8-20 characters, 1 uppercase, 1 number, 1 special character"
              />

              <Button
                type="submit"
                color="rocketDark.4"
                fullWidth
                size={isMobile ? 'md' : 'lg'}
                loading={loading}
                aria-label="Continue">
                Continue
              </Button>
            </Stack>
          </form>
        </Stack>

        <Text ta="center" size="sm" mt="xl">
          Already have an account?{' '}
          <Anchor href="/login" fw={500}>
            Log in
          </Anchor>
        </Text>
      </Paper>
    </Container>
  );
}
