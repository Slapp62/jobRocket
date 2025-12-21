import { useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { IconBrandGoogle } from '@tabler/icons-react';
import Joi from 'joi';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
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
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Credentials>({
    resolver: joiResolver(credentialsSchema),
    mode: 'onBlur',
  });

  const onSubmit = (data: Credentials) => {
    setLoading(true);
    // Store credentials in session storage temporarily
    sessionStorage.setItem('registrationEmail', data.email);
    sessionStorage.setItem('registrationPassword', data.password);
    navigate('/register/account-type?method=email');
  };

  return (
    <Container size="xs" py="xl">
      <Paper shadow="md" p="xl" radius="md">
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
            size="lg"
            variant="outline"
            leftSection={<IconBrandGoogle size={24} />}
            onClick={() => {
              window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google/register`;
            }}
          >
            Sign up with Google
          </Button>

          <Divider label="OR" labelPosition="center" />

          {/* Email/Password Sign Up Form */}
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack gap="md">
              <TextInput
                label="Email"
                placeholder="Enter your email"
                type="email"
                withAsterisk
                {...register('email')}
                error={errors.email?.message}
              />

              <PasswordInput
                label="Password"
                placeholder="Enter your password"
                withAsterisk
                {...register('password')}
                error={errors.password?.message}
                description="8-20 characters, 1 uppercase, 1 number, 1 special character"
              />

              <Button type="submit" fullWidth size="lg" variant="filled" loading={loading}>
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
