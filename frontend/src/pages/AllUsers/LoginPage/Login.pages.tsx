import { useEffect, useRef, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { IconAlertCircle, IconBrandGoogle } from '@tabler/icons-react';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Alert,
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
} from '@mantine/core';
import { notifications } from '@mantine/notifications';
import { PageMeta } from '@/SEO/PageMeta';
import { AppDispatch } from '@/store/store';
import { setUser } from '@/store/userSlice';
import styles from '@/styles/gradients.module.css';
import { announceToScreenReader, autocompleteValues } from '@/utils/accessibility';
import { loginSchema } from '@/validationRules/login.joi';
import classes from './Login.module.css';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

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
    const success = searchParams.get('success');

    if (error === 'account_exists') {
      notifications.show({
        title: 'Account Already Exists',
        message: 'You already have an account. Please log in instead.',
        color: 'blue',
      });
    }

    if (success === 'registration_complete') {
      notifications.show({
        title: 'Registration Complete!',
        message: 'Please log in with your credentials.',
        color: 'green',
      });
    }
  }, [searchParams]);

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

      // ACCESSIBILITY: Announce success to screen readers
      announceToScreenReader('Logged in successfully', 'assertive');

      notifications.show({
        title: 'Success',
        message: 'Logged In!',
        color: 'green',
      });

      jumpTo('/search');
    } catch (error: any) {
      // ACCESSIBILITY: Announce error to screen readers
      announceToScreenReader(`Login failed: ${error.response?.data?.message || 'Please try again'}`, 'assertive');

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

      <Container size={420} my={100}>
        {message && (
          <Title order={3} ta="center" c="red" mb={10}>
            {message}
          </Title>
        )}
        {!message && (
          <Title ta="center" className={classes.title}>
            Welcome back!
          </Title>
        )}

        <Paper
          withBorder
          p={30}
          mt={30}
          radius="md"
          shadow="lg"
          className={styles.cardGradientSubtle}
        >
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
              fz="md"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
              }}
              mb="md"
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

            <Group justify="center">
              <Text c="dimmed" size="sm" ta="center" my="lg">
                Don't have an account yet?
              </Text>
              <Button p={0} variant="transparent" component={Link} to="/register">
                Create account
              </Button>
            </Group>

            <Button
              type="submit"
              fullWidth
              loading={isLoading}
              disabled={!isValid}
              aria-label={isLoading ? 'Signing in...' : 'Sign in'}
            >
              {isLoading ? 'Signing in...' : 'Sign in'}
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
