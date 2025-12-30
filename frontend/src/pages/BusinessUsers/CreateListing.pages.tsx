import { useEffect, useMemo, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Fieldset,
  Flex,
  Paper,
  Radio,
  Select,
  Stack,
  Switch,
  TagsInput,
  Text,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { DurationPresetSelect } from '@/components/DurationPresetSelect';
import { getCitiesByRegion, REGIONS } from '@/data/israelCities.ts';
import WORK_ARRANGEMENTS from '@/data/workArr.ts';
import { PageMeta } from '@/SEO/PageMeta';
import { RootState } from '@/store/store';
import { trackListingCreated } from '@/utils/analytics';
import { addDays, toLocalMidnight } from '@/utils/dateUtils';
import { formatRegionForDisplay } from '@/utils/formatters';
import { listingSchema } from '@/validationRules/listing.joi';

type ListingFormValues = {
  companyName: string;
  jobTitle: string;
  jobDescription: string;
  requirements: string[];
  advantages: string[];
  apply: {
    method: {
      jobRocketSystem: boolean;
      companySystem: boolean;
      email: boolean;
    };
    contact: {
      email?: string;
      link?: string;
    };
  };
  location: {
    region: string;
    city: string;
  };
  workArrangement: string;
  isActive: boolean;
  expiresAt: number; // Duration in days (7, 14, 30, 60, 90)
};

export function CreateListing() {
  const jumpTo = useNavigate();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.userSlice.user);

  const {
    reset,
    register,
    handleSubmit,
    control,
    setValue,
    formState: { errors, isValid },
  } = useForm<ListingFormValues>({
    mode: 'all',
    resolver: joiResolver(listingSchema),
    defaultValues: {
      companyName: '',
      requirements: [],
      advantages: [],
      apply: {
        method: {
          jobRocketSystem: false,
          companySystem: false,
          email: false,
        },
        contact: {
          email: '',
          link: '',
        },
      },
      location: { region: '', city: '' },
      workArrangement: '',
      isActive: true,
      expiresAt: 30, // Default: 30 days
    },
  });

  useEffect(() => {
    if (user) {
      reset({
        companyName: user.businessProfile?.companyName,
        location: {
          region: user.businessProfile?.location.region,
          city: user.businessProfile?.location.city,
        },
      });
    }
  }, [user, reset]);

  const selectedRegion = useWatch({
    control,
    name: 'location.region',
  });

  const selectedMethod = useWatch({
    control,
    name: 'apply.method',
  });

  const availableCities = useMemo(() => {
    if (!selectedRegion) {
      return [];
    }
    return getCitiesByRegion(selectedRegion).map((city: string) => ({
      value: city,
      label: city,
    }));
  }, [selectedRegion]);

  const onSubmit = async (data: ListingFormValues) => {
    // Calculate expiration date from duration (in days)
    const expirationDate = addDays(toLocalMidnight(new Date()), data.expiresAt);

    const payload = {
      ...data,
      expiresAt: expirationDate.toISOString(),
    };

    setIsLoading(true);
    try {
      const response = await axios.post('/api/listings/', payload);

      if (response.status === 201) {
        // Track successful listing creation in Google Analytics
        trackListingCreated(response.data._id, data.jobTitle);

        notifications.show({
          title: 'Success',
          message: 'Listing created!',
          color: 'green',
        });
        jumpTo('/dashboard');
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: `Listing creation failed! ${error?.response?.data || error.message}`,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageMeta
        title="Create Listing | JobRocket"
        description="Create a new job listing and reach English-speaking candidates in Israel"
        keywords="post job, create listing, hire employees, job posting"
      />

      <Paper>
        <Title ta="center" my={10}>
          Create A Listing
        </Title>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex
            direction="column"
            gap={10}
            py={10}
            mx="auto"
            style={{ width: isMobile ? '90%' : '50%' }}
          >
            <Fieldset legend="Job Info">
              <TextInput
                label="Company Name"
                required
                {...register('companyName')}
                error={errors.companyName?.message}
              />

              <TextInput
                label="Job Title"
                required
                {...register('jobTitle')}
                error={errors.jobTitle?.message}
              />

              <Textarea
                label="Job Description"
                minRows={4}
                required
                {...register('jobDescription')}
                error={errors.jobDescription?.message}
              />

              <Controller
                name="requirements"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    label="Requirements"
                    placeholder="Type a requirement and press Enter"
                    description="Add job requirements (max 20)"
                    maxTags={20}
                    {...field}
                    error={errors.requirements?.message as string}
                  />
                )}
              />

              <Controller
                name="advantages"
                control={control}
                render={({ field }) => (
                  <TagsInput
                    label="Nice to Have"
                    placeholder="Type an advantage and press Enter"
                    description="Add nice-to-have qualifications (max 20)"
                    maxTags={20}
                    {...field}
                    error={errors.advantages?.message as string}
                  />
                )}
              />
            </Fieldset>

            <Fieldset legend="Application">
              <Text size="sm" c="dimmed" mb="xs">
                Choose how candidates can apply to this position.
              </Text>

              <Radio.Group
                label="Application Method"
                description="Select one method for receiving applications"
                required
              >
                <Stack mt="xs">
                  <Controller
                    name="apply.method.jobRocketSystem"
                    control={control}
                    render={({ field }) => (
                      <Radio
                        label="JobRocket Internal System"
                        description="Candidates apply through JobRocket and you manage applications in your dashboard"
                        value="jobRocketSystem"
                        checked={field.value}
                        onChange={() => {
                          setValue('apply.method.jobRocketSystem', true);
                          setValue('apply.method.companySystem', false);
                          setValue('apply.method.email', false);
                          setValue('apply.contact.email', '');
                          setValue('apply.contact.link', '');
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="apply.method.email"
                    control={control}
                    render={({ field }) => (
                      <Radio
                        label="Email Applications"
                        description="Candidates send applications to a specified email address"
                        value="email"
                        checked={field.value}
                        onChange={() => {
                          setValue('apply.method.jobRocketSystem', false);
                          setValue('apply.method.companySystem', false);
                          setValue('apply.method.email', true);
                          setValue('apply.contact.link', '');
                        }}
                      />
                    )}
                  />

                  <Controller
                    name="apply.method.companySystem"
                    control={control}
                    render={({ field }) => (
                      <Radio
                        label="External Company System"
                        description="Candidates are redirected to your company's application system"
                        value="companySystem"
                        checked={field.value}
                        onChange={() => {
                          setValue('apply.method.jobRocketSystem', false);
                          setValue('apply.method.companySystem', true);
                          setValue('apply.method.email', false);
                          setValue('apply.contact.email', '');
                        }}
                      />
                    )}
                  />
                </Stack>
              </Radio.Group>

              {selectedMethod?.email && (
                <TextInput
                  label="Email for Applications"
                  placeholder="careers@company.com"
                  required
                  mt="md"
                  {...register('apply.contact.email')}
                  error={errors.apply?.contact?.email?.message}
                />
              )}

              {selectedMethod?.companySystem && (
                <TextInput
                  label="External Application Link"
                  placeholder="https://company.com/careers/apply"
                  required
                  mt="md"
                  {...register('apply.contact.link')}
                  error={errors.apply?.contact?.link?.message}
                />
              )}
            </Fieldset>

            <Fieldset legend="Location">
              <Controller
                name="location.region"
                control={control}
                render={({ field }) => (
                  <Select
                    label="Region"
                    required
                    searchable
                    data={REGIONS.map((region: string) => ({
                      value: region,
                      label: formatRegionForDisplay(region),
                    }))}
                    {...field}
                    error={errors.location?.region?.message}
                  />
                )}
              />

              <Controller
                name="location.city"
                control={control}
                render={({ field }) => (
                  <Select
                    label="City"
                    required
                    searchable
                    disabled={!selectedRegion}
                    data={availableCities}
                    {...field}
                    error={errors.location?.city?.message}
                  />
                )}
              />
            </Fieldset>

            <Fieldset legend="Job Details">
              <Stack gap="md">
                <Controller
                  name="workArrangement"
                  control={control}
                  render={({ field }) => (
                    <Select
                      label="Work Arrangement"
                      required
                      searchable
                      data={WORK_ARRANGEMENTS.map((option: string) => ({
                        value: option,
                        label: option,
                      }))}
                      {...field}
                      error={errors.workArrangement?.message}
                    />
                  )}
                />

                <Controller
                  name="isActive"
                  control={control}
                  render={({ field }) => (
                    <Switch
                      label="Listing is active"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.currentTarget.checked)}
                    />
                  )}
                />

                <Controller
                  name="expiresAt"
                  control={control}
                  render={({ field }) => (
                    <DurationPresetSelect
                      value={field.value}
                      onChange={field.onChange}
                      label="Listing Duration"
                      error={errors.expiresAt?.message as string}
                      required
                      showCalculatedDate
                    />
                  )}
                />
              </Stack>
            </Fieldset>
          </Flex>

          <Flex justify="center" my={10}>
            <Button type="submit" size="lg" disabled={!isValid} loading={isLoading}>
              Create
            </Button>
          </Flex>
        </form>
      </Paper>
    </>
  );
}
