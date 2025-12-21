import { IconPhone } from '@tabler/icons-react';
import { Button, Fieldset, Flex, Text, TextInput, Title } from '@mantine/core';
import { DeleteUserModal } from '@/components/Modals/DeleteUserModal';
import { PageMeta } from '@/SEO/PageMeta';
import { BusinessFields } from '../AllUsers/Registration/registrationForms/businessFields';
import { JobseekerFields } from '../AllUsers/Registration/registrationForms/jobseekerFields';
import { useEditProfile } from './useEditProfile';

export function EditProfile() {
  const {
    isSubmitting,
    isAdminView,
    userData,
    register,
    handleSubmit,
    onSubmit,
    errors,
    isDirty,
    isValid,
    updateBusinessStatus,
    isMobile,
    opened,
    open,
    close,
    deleteUser,
    control,
    resumeFile,
    setResumeFile,
    isDeleting,
    resumeError,
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

        <Flex my={10} justify="center" direction="column" w={isMobile ? '90%' : '50%'}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Flex gap={10} direction="column" m="auto">
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

              {isJobseeker && (
                <Fieldset legend="Jobseeker Details">
                  <JobseekerFields
                    register={register}
                    errors={errors}
                    control={control}
                    resumeFile={resumeFile}
                    setResumeFile={setResumeFile}
                    currentResumeUrl={userData.jobseekerProfile?.resume}
                    resumeError={resumeError}
                    setResumeError={undefined}
                    showConsentCheckboxes={false}
                  />
                </Fieldset>
              )}

              {isBusiness && (
                <Fieldset legend="Business Details">
                  <BusinessFields
                    register={register}
                    errors={errors}
                    control={control}
                    showConsentCheckboxes={false}
                  />
                </Fieldset>
              )}

              <Flex direction={isMobile ? 'column' : 'row'} gap={10}>
                {!userData?.isAdmin && (
                  <Fieldset legend="Change Account Type" w={isMobile ? '100%' : '50%'}>
                    <Flex direction="column" h="100%" justify="space-between">
                      <Text>
                        Account Type: <strong>{accountLabel} User</strong>
                      </Text>

                      <Button onClick={() => updateBusinessStatus()} variant="outline">
                        Toggle Jobseeker / Business
                      </Button>
                    </Flex>
                  </Fieldset>
                )}

                {userData?.isAdmin === false && isAdminView === false && (
                  <Fieldset legend="Delete Account" w={isMobile ? '100%' : '50%'}>
                    <Flex h="100%" justify="space-between" direction="column" gap={5}>
                      <Text fw="bold" c="red" fz="sm">
                        All data will be lost and you will be logged out.
                      </Text>
                      <Button color="red" onClick={open}>
                        Delete Account
                      </Button>
                    </Flex>
                  </Fieldset>
                )}
              </Flex>

              <Button
                disabled={!isValid || (!isDirty && !resumeFile) || !!resumeError}
                type="submit"
                loading={isSubmitting}
                fullWidth
                size="lg"
                mt={10}
              >
                Update Info
              </Button>
            </Flex>
          </form>
        </Flex>
      </Flex>

      <DeleteUserModal
        opened={opened}
        close={close}
        deleteUser={deleteUser}
        isDeleting={isDeleting}
      />
    </>
  );
}
