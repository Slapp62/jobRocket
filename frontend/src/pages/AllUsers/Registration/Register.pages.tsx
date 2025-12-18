import { useRef, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Controller, FieldValues, useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { Anchor, Box, Button, Checkbox, Fieldset, Flex, FloatingIndicator, Group, Stack, Tabs, Text } from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { BusinessFields } from '@/components/registrationForms/businessFields';
import { JobseekerFields } from '@/components/registrationForms/jobseekerFields';
import { SharedCredentials } from '@/components/registrationForms/shareCredentials';
import { PageMeta } from '@/SEO/PageMeta';
import { TUsers } from '@/Types';
import { registrationSchema } from '@/validationRules/register.joi';
import classes from './formTabs.module.css';
import styles from '@/styles/gradients.module.css';

export function RegisterForm() {
  const [rootRef, setRootRef] = useState<HTMLDivElement | null>(null);
  const [tabValue, setTabValue] = useState<string | null>('jobseeker');
  const [controlsRefs, setControlsRefs] = useState<Record<string, HTMLButtonElement | null>>({});
  const [isLoading, setIsLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);
  
  const setControlRef = (val: string) => (node: HTMLButtonElement) => {
    controlsRefs[val] = node;
    setControlsRefs(controlsRefs);
  };

  const jumpTo = useNavigate();
  const registerRef = useRef<HTMLDivElement>(null);
  const isMobile = useMediaQuery('(max-width: 700px)');

  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid, isDirty },
  } = useForm<TUsers>({
    mode: 'all',
    resolver: joiResolver(registrationSchema),
    shouldUnregister: false, // Keep data when switching tabs
    defaultValues: {
      profileType: 'jobseeker', // Default to jobseeker
      terms: false,
      dataProcessingConsent: false,
    },
    criteriaMode: 'all', // Show all errors
  });

  const onSubmit = async (data: FieldValues) => {
    if (resumeError){
      notifications.show({
        title: 'Error',
        message: resumeError,
        color: 'red',
      })
      return;
    }
    // Build the request payload - profileType is already set by tab change
    const payload: any = {
      email: data.email,
      password: data.password,
      phone: data.phone,
      profileType: data.profileType,
    };

    // Add ONLY the appropriate profile based on type
    // This ensures we don't send the forbidden profile to backend
    if (data.profileType === 'jobseeker') {
      payload.jobseekerProfile = data.jobseekerProfile;
      // Don't include businessProfile
    } else {
      payload.businessProfile = data.businessProfile;
      // Don't include jobseekerProfile
    }

    setIsLoading(true);
    try {
      let response;
      // If there's a resume file, use FormData
      if (resumeFile) {
        const formData = new FormData();
        
        // Add all the regular data
        formData.append('email', payload.email);
        formData.append('password', payload.password);
        formData.append('phone', payload.phone || '');
        formData.append('profileType', payload.profileType);
        
        if (payload.jobseekerProfile) {
          // Flatten jobseekerProfile fields
          Object.keys(payload.jobseekerProfile).forEach((key) => {
            const value = payload.jobseekerProfile[key];
            if (value !== undefined && value !== null) {
              if (Array.isArray(value)) {
                formData.append(`jobseekerProfile[${key}]`, JSON.stringify(value));
              } else {
                formData.append(`jobseekerProfile[${key}]`, String(value));
              }
            }
          });
        }
        
        if (payload.businessProfile) {
          Object.keys(payload.businessProfile).forEach((key) => {
            const value = payload.businessProfile[key];
            if (value !== undefined && value !== null) {
              formData.append(`businessProfile[${key}]`, String(value));
            }
          });
        }
        
        // Add the resume file
        formData.append('resume', resumeFile);
        
        response = await axios.post('/api/users/', formData);
      } else {
        // No file, use regular JSON
        response = await axios.post('/api/users/', payload);
      }

      if (response.status === 201) {
        jumpTo('/login');
        notifications.show({
          title: 'Success',
          message: 'Registration successful!',
          color: 'green',
        });
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response?.data?.message || error.message,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Sign Up | JobRocket"
        description="Create your JobRocket account to start finding English-speaking jobs in Israel"
        keywords="register, sign up, create account, job seeker registration"
      />

      <Flex style={{ width: isMobile ? '95%' : '70%' }} mx="auto" direction="column">
        <Box ref={registerRef} ta="center">
          <h1>Registration Form</h1>
        </Box>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            mx="auto"
            direction="column"
            w={isMobile ? '95%' : '60%'}
            justify="space-between"
            gap={5}
          >
            <SharedCredentials register={register} errors={errors} control={control} />

            <Fieldset
              legend="Choose An Account Type"
              className={styles.cardGradientSubtle}
              style={{ borderRadius: '8px' }}
            >
              <Tabs
                variant="none"
                value={tabValue}
                onChange={(newValue) => {
                  setTabValue(newValue);
                  // Update profileType in form when tab changes
                  setValue('profileType', newValue as 'jobseeker' | 'business');
                }}
              >
                <Tabs.List ref={setRootRef} className={classes.list}>
                  <Tabs.Tab
                    value="jobseeker"
                    ref={setControlRef('jobseeker')}
                    className={classes.tab}
                  >
                    Job Seeker
                  </Tabs.Tab>
                  <Tabs.Tab
                    value="business"
                    ref={setControlRef('business')}
                    className={classes.tab}
                  >
                    Business
                  </Tabs.Tab>

                  <FloatingIndicator
                    target={tabValue ? controlsRefs[tabValue] : null}
                    parent={rootRef}
                    className={classes.indicator}
                  />
                </Tabs.List>

                <Tabs.Panel value="jobseeker">
                  <JobseekerFields 
                    register={register} 
                    errors={errors} 
                    control={control}
                    resumeFile={resumeFile}
                    setResumeFile={setResumeFile}
                    resumeError={resumeError}
                    setResumeError={setResumeError}
                  />
                </Tabs.Panel>
                <Tabs.Panel value="business">
                  <BusinessFields 
                    register={register} 
                    errors={errors} 
                    control={control} 
                  />
                </Tabs.Panel>
              </Tabs>
            </Fieldset>

            <Fieldset legend="Terms and Conditions">
              <Controller
                name="terms"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    label="I agree to the terms and conditions"
                    checked={field.value}
                    onChange={(event) => field.onChange(event.currentTarget.checked)}
                  />
                )}
              />
            </Fieldset>
            <Stack my="md" gap="md">
              <Button
                variant="outline"
                type="reset"
                fullWidth
                disabled={!isDirty}
                onClick={() => {
                  reset();
                  registerRef.current?.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Reset Form
              </Button>

              <Button 
                type="submit" 
                mx="auto" 
                fullWidth 
                disabled={!isValid || (!isDirty && !resumeFile) || !!resumeError} 
                loading={isLoading}
              >
                Submit
              </Button>

              <Group justify="center" align="center">
                <Text c="dimmed" size="md">
                  Already have an account?
                </Text>

                <Anchor
                  size="md"
                  component="button"
                  onClick={() => jumpTo('/login')}
                  underline="hover"
                >
                  Login
                </Anchor>
              </Group>
            </Stack>
          </Flex>

        </form>
      </Flex>
    </>
  );
}
