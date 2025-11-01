import { useMemo } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  Button,
  Fieldset,
  Flex,
  Paper,
  Select,
  Switch,
  Textarea,
  TextInput,
  Title,
} from '@mantine/core';
import { useMediaQuery } from '@mantine/hooks';
import { addListing } from '@/store/listingSlice';
import { listingSchema } from '@/validationRules/listing.joi';
import INDUSTRIES from '../data/industries.ts';
import { getCitiesByRegion, REGIONS } from '../data/israelCities.ts';
import WORK_ARRANGEMENTS from '../data/workArr.ts';

type ListingFormValues = {
  jobTitle: string;
  jobDescription: string;
  requirements: string[];
  advantages: string[];
  apply: {
    method: 'email' | 'link';
    contact: string;
  };
  location: {
    region: string;
    city: string;
  };
  workArrangement: string;
  industry: string;
  isActive: boolean;
  expiresAt?: string | null;
};

export function CreateListing() {
  const jumpTo = useNavigate();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const dispatch = useDispatch();
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isValid },
  } = useForm<ListingFormValues>({
    mode: 'all',
    resolver: joiResolver(listingSchema),
    defaultValues: {
      requirements: [],
      advantages: [],
      apply: { method: 'email', contact: '' },
      location: { region: '', city: '' },
      workArrangement: '',
      industry: '',
      isActive: true,
      expiresAt: '',
    },
  });

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
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    axios.defaults.headers.common['x-auth-token'] = token;
    const url = `${API_BASE_URL}/api/listings`;
    const payload = {
      ...data,
      expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
    };

    try {
      const response = await axios.post(url, payload);

      if (response.status === 201) {
        dispatch(addListing(response.data));
        toast.success('Listing created!', { position: 'bottom-right' });
        jumpTo('/my-listings');
      }
    } catch (error: any) {
      toast.error(`Listing creation failed! ${error?.response?.data || error.message}`, {
        position: 'bottom-right',
      });
    }
  };

  return (
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
                <Textarea
                  label="Requirements"
                  placeholder="Add one requirement per line"
                  minRows={3}
                  value={(field.value || []).join('\n')}
                  onChange={(event) => {
                    const next = event.currentTarget.value
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean);
                    field.onChange(next);
                  }}
                  error={errors.requirements?.message as string}
                />
              )}
            />

            <Controller
              name="advantages"
              control={control}
              render={({ field }) => (
                <Textarea
                  label="Nice to Have"
                  placeholder="Add one advantage per line"
                  minRows={3}
                  value={(field.value || []).join('\n')}
                  onChange={(event) => {
                    const next = event.currentTarget.value
                      .split('\n')
                      .map((line) => line.trim())
                      .filter(Boolean);
                    field.onChange(next);
                  }}
                  error={errors.advantages?.message as string}
                />
              )}
            />
          </Fieldset>

          <Fieldset legend="Application">
            <Controller
              name="apply.method"
              control={control}
              render={({ field }) => (
                <Select
                  label="Application Method"
                  required
                  data={[
                    { value: 'email', label: 'Email' },
                    { value: 'link', label: 'External Link' },
                  ]}
                  {...field}
                  error={errors.apply?.method?.message}
                />
              )}
            />

            <TextInput
              label="Application Contact / URL"
              required
              {...register('apply.contact')}
              error={errors.apply?.contact?.message}
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
              name="industry"
              control={control}
              render={({ field }) => (
                <Select
                  label="Industry"
                  required
                  searchable
                  data={INDUSTRIES.map((industry: string) => ({
                    value: industry,
                    label: industry,
                  }))}
                  {...field}
                  error={errors.industry?.message}
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
          <Button type="submit" size="lg" disabled={!isValid}>
            Create
          </Button>
        </Flex>
      </form>
    </Paper>
  );
}
