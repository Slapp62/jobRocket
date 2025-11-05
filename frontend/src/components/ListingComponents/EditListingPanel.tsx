import { useEffect, useMemo, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { Controller, useForm, useWatch } from 'react-hook-form';
import { toast } from 'react-toastify';
import {
  Button,
  Fieldset,
  Flex,
  Select,
  Stack,
  Switch,
  Textarea,
  TextInput,
  Title,
  Loader,
  Center,
  Group,
} from '@mantine/core';
import { IconTrash, IconDeviceFloppy, IconX } from '@tabler/icons-react';
import { TListing } from '@/Types';
import { cleanedListingData } from '@/utils/getCleanedListingData';
import { listingSchema } from '@/validationRules/listing.joi';
import INDUSTRIES from '../../data/industries.ts';
import { getCitiesByRegion, REGIONS } from '../../data/israelCities.ts';
import WORK_ARRANGEMENTS from '../../data/workArr.ts';

type ListingFormValues = {
  companyName: string;
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

interface EditListingPanelProps {
  listingId: string;
  onDelete: (listingId: string) => Promise<void>;
  onCancel: () => void;
  onUpdate: () => void;
}

export function EditListingPanel({ listingId, onDelete, onCancel, onUpdate }: EditListingPanelProps) {
  const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8181';
  const [listingData, setListingData] = useState<TListing | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
    control,
  } = useForm<ListingFormValues>({
    mode: 'all',
    resolver: joiResolver(listingSchema),
  });

  useEffect(() => {
    const fetchListing = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(`${API_BASE_URL}/api/listings/${listingId}`);
        setListingData(response.data);
        const defaults = cleanedListingData(response.data) as ListingFormValues;
        reset(defaults);
      } catch (error: any) {
        toast.error('Failed to load listing data');
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchListing();
  }, [listingId, reset, API_BASE_URL]);

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
    try {
      setIsSaving(true);
      const token = localStorage.getItem('token') || sessionStorage.getItem('token');
      await axios.put(
        `${API_BASE_URL}/api/listings/${listingId}`,
        {
          ...data,
          expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
        },
        {
          headers: { 'x-auth-token': token },
        }
      );
      toast.success('Listing updated successfully!');
      onUpdate();
    } catch (error: any) {
      toast.error(`Update failed! ${error?.response?.data?.message || error.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      await onDelete(listingId);
    }
  };

  if (isLoading) {
    return (
      <Center h="100%">
        <Loader color="cyan" size="xl" />
      </Center>
    );
  }

  return (
    <Stack gap="md" p="md">
      <Flex justify="space-between" align="center">
        <Title order={2}>Edit Listing</Title>
        <Button
          variant="subtle"
          color="gray"
          onClick={onCancel}
          leftSection={<IconX size={16} />}
        >
          Cancel
        </Button>
      </Flex>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack gap="md">
          <Fieldset legend="Job Info">
            <Stack gap="sm">
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
                required
                minRows={4}
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
            </Stack>
          </Fieldset>

          <Fieldset legend="Application">
            <Stack gap="sm">
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
            </Stack>
          </Fieldset>

          <Fieldset legend="Location">
            <Stack gap="sm">
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
            </Stack>
          </Fieldset>

          <Fieldset legend="Job Details">
            <Stack gap="sm">
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
            </Stack>
          </Fieldset>

          <Group justify="space-between" mt="md">
            <Button
              variant="filled"
              color="red"
              leftSection={<IconTrash size={16} />}
              onClick={handleDelete}
            >
              Delete Listing
            </Button>

            <Button
              type="submit"
              variant="filled"
              color="green"
              leftSection={<IconDeviceFloppy size={16} />}
              disabled={!isValid || !isDirty}
              loading={isSaving}
            >
              Save Changes
            </Button>
          </Group>
        </Stack>
      </form>
    </Stack>
  );
}
