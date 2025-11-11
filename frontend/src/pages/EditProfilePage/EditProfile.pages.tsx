import { IconPhone } from '@tabler/icons-react';
import { Button, Fieldset, Flex, Text, TextInput, Title } from '@mantine/core';
import { DeleteUserModal } from '@/components/Modals/DeleteUserModal';
import { BusinessFields } from '@/components/registrationForms/businessFields';
import { JobseekerFields } from '@/components/registrationForms/jobseekerFields';
import { PageMeta } from '@/SEO/PageMeta';
import { useEditProfile } from './useEditProfile';

export function EditProfile() {
  const {
    isSubmitting,
    isAdminView,
    userData,
    register,
    handleSubmit,
    onSubmit,
    trigger,
    errors,
    isDirty,
    isValid,
    isDisabled,
    setDisabled,
    updateBusinessStatus,
    isMobile,
    opened,
    open,
    close,
    deleteUser,
    control,
  } = useEditProfile();

  const isJobseeker = userData?.profileType === 'jobseeker';
  const isBusiness = userData?.profileType === 'business';
  const accountLabel = userData?.isAdmin ? 'Admin' : isBusiness ? 'Business' : 'Jobseeker';

  return (
    <>
      <PageMeta
        title="My Profile | JobRocket"
        description="Manage your JobRocket profile and job search preferences"
        keywords="job seeker profile, manage account, profile settings"
      />

      <Flex mt={20} direction="column" align="center" gap={20}>
        <Title>Edit Profile</Title>

        <Flex justify="center" direction="column" style={{ width: isMobile ? '90%' : '50%' }}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex gap={10} direction="column" m="auto">
              <Fieldset legend="Contact">
                <TextInput
                  rightSection={<IconPhone />}
                  label="Phone"
                  disabled={isDisabled}
                  required
                  {...register('phone', {
                    onChange: (e) => {
                      e.target.value = e.target.value.replace(/[^\d-]/g, '');
                    },
                  })}
                  error={errors.phone?.message}
                />
              </Fieldset>

              {isJobseeker && (
                <Fieldset legend="Jobseeker Details">
                  <JobseekerFields
                    register={register}
                    errors={errors}
                    control={control}
                    disabled={isDisabled}
                  />
                </Fieldset>
              )}

              {isBusiness && (
                <Fieldset legend="Business Details">
                  <BusinessFields
                    register={register}
                    errors={errors}
                    control={control}
                    disabled={isDisabled}
                  />
                </Fieldset>
              )}

              <Fieldset legend="Change Account Type">
                <Flex align="center" direction="column" justify="center" gap={10}>
                  <Text>
                    Account Type: <strong>{accountLabel} User</strong>
                  </Text>

                  {!userData?.isAdmin && (
                    <Button
                      size="xs"
                      disabled={isDisabled}
                      loading={isSubmitting}
                      onClick={() => updateBusinessStatus()}
                    >
                      <Text fz="sm">Toggle Jobseeker / Business</Text>
                    </Button>
                  )}

                  {userData?.isAdmin && (
                    <Text size="xs" c="red">
                      Cannot change or delete an admin user
                    </Text>
                  )}
                </Flex>
              </Fieldset>

              {userData?.isAdmin === false && isAdminView === false && (
                <Fieldset legend="Delete Account">
                  <Flex align="center" direction="column" gap={5}>
                    <Text fw="bold" c="red">
                      All data will be lost and you will be logged out.
                    </Text>
                    <Button color="red" disabled={isDisabled} onClick={open}>
                      Delete Account
                    </Button>
                  </Flex>
                </Fieldset>
              )}

              <Flex direction="column" gap={5} w="50%" mx="auto">
                {isDisabled && (
                  <Button
                    type="button"
                    onClick={() => {
                      setDisabled(false);
                      trigger();
                    }}
                  >
                    {' '}
                    Edit Profile
                  </Button>
                )}

                <Button disabled={isDisabled || !isValid || !isDirty} type="submit">
                  {' '}
                  Update Info
                </Button>
              </Flex>
            </Flex>
          </form>
        </Flex>
      </Flex>

      <DeleteUserModal opened={opened} close={close} deleteUser={deleteUser} />
    </>
  );
}
