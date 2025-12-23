import { useState } from 'react';
import { IconPhone } from '@tabler/icons-react';
import { Control, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { Fieldset, PasswordInput, Text, TextInput } from '@mantine/core';
import { TUsers } from '@/Types';
import { autocompleteValues } from '@/utils/accessibility';

type JobseekerFieldsProps = {
  register: UseFormRegister<TUsers>;
  errors: FieldErrors<TUsers>;
  control: Control<TUsers>;
};

export function SharedCredentials({ register, errors, control }: JobseekerFieldsProps) {
  const [confirmPassword, setConfirmPassword] = useState('');
  const password = useWatch({
    control,
    name: 'password',
  });

  const passwordsMatch = !confirmPassword || confirmPassword === password;
  const confirmPasswordError = !passwordsMatch ? 'Passwords do not match' : undefined;

  return (
    <>
      <Fieldset legend="Credentials" p="sm" mb="md" bg="rocketOrange.1">
        <TextInput
          label="Email"
          {...register('email')}
          withAsterisk
          error={errors.email?.message}
          aria-required="true"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? 'register-email-error' : undefined}
          autoComplete={autocompleteValues.email}
          type="email"
          id="register-email"
        />
        {errors.email && (
          <Text id="register-email-error" size="xs" c="red" role="alert" mt={4}>
            {errors.email.message}
          </Text>
        )}

        <PasswordInput
          label="Password"
          {...register('password')}
          withAsterisk
          error={errors.password?.message}
          aria-required="true"
          aria-invalid={!!errors.password}
          aria-describedby={errors.password ? 'register-password-error' : undefined}
          autoComplete={autocompleteValues.newPassword}
          id="register-password"
        />
        {errors.password && (
          <Text id="register-password-error" size="xs" c="red" role="alert" mt={4}>
            {errors.password.message}
          </Text>
        )}

        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
          aria-required="true"
          aria-invalid={!passwordsMatch}
          aria-describedby={!passwordsMatch ? 'confirm-password-error' : undefined}
          autoComplete={autocompleteValues.newPassword}
          id="register-confirm-password"
        />
        {confirmPasswordError && (
          <Text id="confirm-password-error" size="xs" c="red" role="alert" mt={4}>
            {confirmPasswordError}
          </Text>
        )}
      </Fieldset>
    </>
  );
}
