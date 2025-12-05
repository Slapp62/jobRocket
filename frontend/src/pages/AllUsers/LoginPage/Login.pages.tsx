import { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Container,
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
import { loginSchema } from '@/validationRules/login.joi';
import classes from './Login.module.css';
import styles from '@/styles/gradients.module.css';
import { useAuthInit } from '@/hooks/UseAuthInit';

export function LoginPage() {
  const jumpTo = useNavigate();
  const location = useLocation();
  const message = location.state?.message;

  const dispatch = useDispatch<AppDispatch>();
  const [rememberMe, setRemember] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const {
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

      jumpTo('/');
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response.data.message,
        color: 'red',
      });
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

            <Group justify="space-between" mt="lg">
              <Checkbox
                label="Remember me"
                checked={rememberMe}
                onChange={(event) => setRemember(event.currentTarget.checked)}
              />
            </Group>

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
