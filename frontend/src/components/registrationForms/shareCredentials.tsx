import { useState } from 'react';
import { IconPhone } from '@tabler/icons-react';
import { Control, FieldErrors, UseFormRegister, useWatch } from 'react-hook-form';
import { Fieldset, PasswordInput, TextInput } from '@mantine/core';
import { TUsers } from '@/Types';

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
      <Fieldset legend="Credentials">
        <TextInput
          label="Email"
          {...register('email')}
          withAsterisk
          error={errors.email?.message}
        />
        <PasswordInput
          label="Password"
          {...register('password')}
          withAsterisk
          error={errors.password?.message}
        />
        <PasswordInput
          label="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          error={confirmPasswordError}
        />
      </Fieldset>

      <Fieldset legend="Contact">
        <TextInput
          rightSection={<IconPhone />}
          label="Phone"
          required
          {...register('phone', {
            onChange: (e) => {
              e.target.value = e.target.value.replace(/[^\d-]/g, '');
            },
          })}
          error={errors.phone?.message}
        />
      </Fieldset>
    </>
  );
}
