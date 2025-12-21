import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { IconBrandGoogle } from '@tabler/icons-react';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import {
  Button,
  Container,
  Divider,
  Group,
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
import { loginSchema } from '@/validationRules/login.joi';
import classes from './Login.module.css';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const dispatch = useDispatch<AppDispatch>();
  const [isLoading, setIsLoading] = useState(false);

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

  const onSubmit = async (data: FieldValues) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`/api/users/login`, {
        email: data.email,
        password: data.password,
      });
      const userData = response.data; // Note: wrapped in .data.data because of backend handleSuccess format
      dispatch(setUser(userData));

      notifications.show({
        title: 'Success',
        message: 'Logged In!',
        color: 'green',
      });

      jumpTo('/search');
    } catch (error: any) {
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
        title="Log In | JobRocket"
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
          <form onSubmit={handleSubmit(onSubmit)}>
            <Button
              fullWidth
              variant="filled"
              fz="md"
              onClick={() => {
                window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
              }}
              mb="md"
              leftSection={<IconBrandGoogle size={20} />}
            >
              Sign in with Google
            </Button>

            <Divider label="Or continue with email" my="md" />

            <TextInput
              label="Email"
              placeholder="you@email.com"
              {...register('email')}
              error={errors.email?.message}
            />
            <PasswordInput
              mt={10}
              label="Password"
              placeholder="Your password"
              {...register('password')}
              error={errors.password?.message}
            />

            <Group justify="center">
              <Text c="dimmed" size="sm" ta="center" my="lg">
                Don't have an account yet?
              </Text>
              <Button p={0} variant="transparent" component={Link} to="/register">
                Create account
              </Button>
            </Group>

            <Button type="submit" fullWidth loading={isLoading} disabled={!isValid}>
              Sign in
            </Button>
          </form>
        </Paper>
      </Container>
    </>
  );
}
