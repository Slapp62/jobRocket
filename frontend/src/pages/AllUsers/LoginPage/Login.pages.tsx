import { useEffect, useRef, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { IconAlertCircle, IconBrandGoogle } from '@tabler/icons-react';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
  Anchor,
  Button,
  Container,
  Divider,
  Group,
  List,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
  useComputedColorScheme,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { PageMeta } from '@/SEO/PageMeta';
import { AppDispatch, persistor } from '@/store/store';
import { setUser } from '@/store/userSlice';
import { announceToScreenReader, autocompleteValues } from '@/utils/accessibility';
import { trackLogin } from '@/utils/analytics';
import { loginSchema } from '@/validationRules/login.joi';
import classes from './Login.module.css';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const message = location.state?.message;
  const isMobile = useMediaQuery('(max-width: 768px)');
  const computedColorScheme = useComputedColorScheme('light');

  // Theme-aware colors
  const cardBg = computedColorScheme === 'light' ? 'rocketGray.2' : 'rocketBlack.9';
  const textColor = computedColorScheme === 'light' ? 'rocketGray.9' : 'rocketBlack.1';

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

  // ACCESSIBILITY: Ref for error summary focus management
  const errorSummaryRef = useRef<HTMLDivElement>(null);

  const [searchParams] = useSearchParams();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onChange',
    criteriaMode: 'firstError',
    resolver: joiResolver(loginSchema),
  });

  useEffect(() => {
    const error = searchParams.get('error');
    const errorMessage = searchParams.get('message');
    const success = searchParams.get('success');
    const prefilledEmail = searchParams.get('email');

    // Handle OAuth errors
    if (error) {
      if (error === 'no_account') {
        notifications.show({
          title: 'No Account Found',
          message: 'No account found with this email. Please register first.',
          color: 'orange',
          autoClose: 7000,
        });
      } else if (error === 'wrong_auth_method') {
        notifications.show({
          title: 'Wrong Login Method',
          message: decodeURIComponent(
            errorMessage ||
              'This email is registered with password. Please use email/password login.'
          ),
          color: 'orange',
          autoClose: 7000,
        });
      } else if (error === 'account_exists') {
        notifications.show({
          title: 'Account Already Exists',
          message: 'You already have an account. Please log in instead.',
          color: 'blue',
        });
      } else if (error === 'session_failed') {
        notifications.show({
          title: 'Session Error',
          message: 'Failed to create session. Please try again.',
          color: 'red',
        });
      } else if (errorMessage) {
        notifications.show({
          title: 'Login Failed',
          message: decodeURIComponent(errorMessage),
          color: 'red',
        });
      }
    }

    if (success === 'registration_complete') {
      notifications.show({
        title: 'Registration Complete!',
        message: 'Please log in with your credentials.',
        color: 'green',
      });
    }

    // Pre-fill email if provided
    if (prefilledEmail) {
      reset({ email: decodeURIComponent(prefilledEmail), password: '' });
    }
  }, [searchParams, reset]);

  // ACCESSIBILITY: Focus error summary when validation errors appear
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      errorSummaryRef.current?.focus();
    }
  }, [errors]);

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    // ACCESSIBILITY: Announce form submission to screen readers
    announceToScreenReader('Signing in, please wait', 'polite');

    try {
      const response = await axios.post(`/api/users/login`, {
        email: data.email,
        password: data.password,
      });
      const userData = response.data; // Note: wrapped in .data.data because of backend handleSuccess format
      dispatch(setUser(userData));

      // Track successful login in Google Analytics
      trackLogin();

      // ACCESSIBILITY: Announce success to screen readers
      announceToScreenReader('Logged in successfully', 'assertive');

      notifications.show({
        title: 'Welcome back!',
        message: `Successfully logged in as ${userData.profileType === 'business' ? 'a business' : 'a job seeker'}. Let's get started!`,
        color: 'green',
        autoClose: 5000,
      });

      // Navigate to appropriate page based on user type
      const redirectPath = userData.profileType === 'business' ? '/dashboard' : '/search';

      // Wait for Redux Persist to flush state to localStorage before navigating
      // This prevents race condition where old user data could briefly appear on mobile
      await persistor.flush();

      // Small additional delay for session cookie propagation on slower mobile networks
      setTimeout(() => {
        jumpTo(redirectPath);
      }, 100);
    } catch (error: any) {
      // ACCESSIBILITY: Announce error to screen readers
      announceToScreenReader(
        `Login failed: ${error.response?.data?.message || 'Please try again'}`,
        'assertive'
      );

      notifications.show({
        title: 'Error',
        message: error.response.data.message,
        color: 'red',
      });
      reset();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Login | JobRocket"
        description="Log in to your JobRocket account"
        keywords="login, sign in, account access"
      />

      <Container size="xs" py="xl">
        <Paper
          p={30}
          mt={30}
          radius="md"
          bg={cardBg}
          style={{
            border:
              computedColorScheme === 'light'
                ? '1px solid lightgray'
                : '2px solid var(--mantine-color-rocketBlack-9)',
            borderRadius: '10px',
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
          }}
        >
          {message && (
            <Title order={3} ta="center" c="red" mb={10}>
              {message}
            </Title>
          )}
          {!message && (
            <Title ta="center" c={textColor}>
              Welcome back!
            </Title>
          )}

          <form onSubmit={handleSubmit(onSubmit)} aria-label="Login form">
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
                mb="md"
              >
                <List size="sm">
                  {errors.email && <List.Item>{errors.email.message}</List.Item>}
                  {errors.password && <List.Item>{errors.password.message}</List.Item>}
                </List>
              </Alert>
            )}

            <Button
              fullWidth
              variant="filled"
              size="md"
              fz="md"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
              }}
              my="md"
              leftSection={<IconBrandGoogle size={20} aria-hidden="true" />}
              aria-label="Sign in with Google"
            >
              Sign in with Google
            </Button>

            <Divider label="Or continue with email" my="md" />

            <TextInput
              label="Email"
              placeholder="you@email.com"
              {...register('email')}
              error={errors.email?.message}
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete={autocompleteValues.email}
              type="email"
              id="login-email"
            />

            <PasswordInput
              mt={10}
              label="Password"
              placeholder="Your password"
              {...register('password')}
              error={errors.password?.message}
              aria-required="true"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? 'password-error' : undefined}
              autoComplete={autocompleteValues.currentPassword}
              id="login-password"
            />

            <Button
              type="submit"
              variant="filled"
              mt="md"
              size="md"
              fullWidth
              loading={isLoading}
              aria-label={isLoading ? 'Signing in...' : 'Sign in'}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>

            <Divider my="md" />
            {/* Registration link */}
            <Text ta="center" mt="md" size="sm">
              Don't have an account?{' '}
              <Anchor href="/register" c="rocketOrange">
                Create one now
              </Anchor>
            </Text>
          </form>
        </Paper>
      </Container>
    </>
  );
}
