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
                      <Text fz="sm">
                        Your account will be deactivated for 30 days. Contact support to restore
                        it during this period. After 30 days, all data will be permanently deleted.
                      </Text>
                      <Button color="red" onClick={open}>
                        Delete Account
                      </Button>
                    </Flex>
                  </Fieldset>
                )}
              </Flex>

              {userData?.isAdmin === false && isAdminView === false && (
                <Fieldset legend="Download My Data" mt={10}>
                  <Flex direction="column" gap={5}>
                    <Text fz="sm">
                      Download all your personal data in JSON format. This includes your profile
                      information, applications, and consent records.
                    </Text>
                    <Button
                      variant="outline"
                      onClick={async () => {
                        try {
                          const response = await fetch('/api/users/export/data', {
                            method: 'GET',
                            credentials: 'include',
                          });

                          if (!response.ok) throw new Error('Failed to export data');

                          const blob = await response.blob();
                          const url = window.URL.createObjectURL(blob);
                          const a = document.createElement('a');
                          a.href = url;
                          a.download = `jobrocket-data-export-${Date.now()}.json`;
                          document.body.appendChild(a);
                          a.click();
                          window.URL.revokeObjectURL(url);
                          document.body.removeChild(a);
                        } catch (error) {
                          console.error('Failed to download data:', error);
                        }
                      }}
                    >
                      Download My Data
                    </Button>
                  </Flex>
                </Fieldset>
              )}

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
