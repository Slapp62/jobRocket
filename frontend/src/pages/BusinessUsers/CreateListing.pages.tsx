import { useEffect, useMemo, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Checkbox,
  Fieldset,
  Flex,
  Group,
  Paper,
  Select,
  Stack,
  Switch,
  TagsInput,
  Textarea,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { getCitiesByRegion, REGIONS } from '@/data/israelCities.ts';
import WORK_ARRANGEMENTS from '@/data/workArr.ts';
import { PageMeta } from '@/SEO/PageMeta';
import { listingSchema } from '@/validationRules/listing.joi';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/store';

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
  expiresAt?: string | null;
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
          email: false 
        }, 
        contact: { 
          email: '', 
          link: '' 
        } 
      },
      location: { region: '', city: '' },
      workArrangement: '',
      isActive: true,
      expiresAt: '',
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
    const payload = {
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
    };

    setIsLoading(true);
    try {
      const response = await axios.post('/api/listings/', payload);

      if (response.status === 201) {
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
        title="Post a Job | JobRocket"
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
              <Text size="sm" c='dimmed'>Choose how to manage applications.</Text>
              <Text size="sm" c='red'>At least one option must be selected.</Text>
              <Stack p={10}>
                <Controller
                  name="apply.method.jobRocketSystem"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      radius={0}
                      label="Use JobRocket's internal system"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.currentTarget.checked)}
                    />
                  )}
                />

                <Controller
                  name="apply.method.companySystem"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      radius={0}
                      label="External company system"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.currentTarget.checked)}
                    />
                  )}
                />
                
                <Controller
                  name="apply.method.email"
                  control={control}
                  render={({ field }) => (
                    <Checkbox
                      radius={0}
                      label="Email"
                      checked={field.value}
                      onChange={(event) => field.onChange(event.currentTarget.checked)}
                    />
                  )}
                />
              </Stack>

              <TextInput
                label="Link to external application"
                {...register('apply.contact.link')}
                error={errors.apply?.contact?.link?.message}
              />
              <TextInput
                label="Email for applications"
                {...register('apply.contact.email')}
                error={errors.apply?.contact?.email?.message}
              />
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
                      label: region,
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

              <TextInput
                label="Expiration Date"
                type="date"
                {...register('expiresAt')}
                error={errors.expiresAt?.message as string}
              />
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
