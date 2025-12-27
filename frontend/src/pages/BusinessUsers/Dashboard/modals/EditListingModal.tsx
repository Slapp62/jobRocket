import { useEffect, useMemo, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import { IconDeviceFloppy } from '@tabler/icons-react';
import axios from 'axios';
import { Controller, useForm, useWatch } from 'react-hook-form';
import {
  Button,
  Fieldset,
  Flex,
  Group,
  Modal,
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
import { notifications } from '@mantine/notifications';
import { getCitiesByRegion, REGIONS } from '@/data/israelCities.ts';
import WORK_ARRANGEMENTS from '@/data/workArr';
import { cleanedListingData } from '@/pages/BusinessUsers/Dashboard/utils/getCleanedListingData';
import { TListing } from '@/Types';
import { listingSchema } from '@/validationRules/listing.joi';
import { formatDate, addDays, toLocalMidnight } from '@/utils/dateUtils';
import { DurationPresetSelect } from '@/components/DurationPresetSelect';
import { formatRegionForDisplay } from '@/utils/formatters';

interface EditListingModalProps {
  opened: boolean;
  onClose: () => void;
  listing: TListing | undefined;
  setListings: React.Dispatch<React.SetStateAction<TListing[]>>;
}

type ListingFormValues = {
  companyName: string | undefined;
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

export const EditListingModal = ({
  opened,
  onClose,
  listing,
  setListings,
}: EditListingModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  // Calculate current expiration info for description
  const currentExpirationInfo = useMemo(() => {
    if (!listing?.expiresAt) return null;

    const expiresDate = new Date(listing.expiresAt);
    const today = new Date();
    const diffTime = expiresDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return {
      date: formatDate(listing.expiresAt), // DD/MM/YYYY format
      daysRemaining: diffDays
    };
  }, [listing?.expiresAt]);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
    control,
    setValue,
  } = useForm<ListingFormValues>({
    mode: 'all',
    resolver: joiResolver(listingSchema),
  });

  useEffect(() => {
    if (opened && listing) {
      // need to clean the default listing data before setting it to the form to avoid validation errors
      const cleanedListing = cleanedListingData(listing);
      reset(cleanedListing);
    }
  }, [opened]);

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
    try {
      setIsLoading(true);

      // Calculate expiration date from duration (in days)
      const expirationDate = addDays(toLocalMidnight(new Date()), data.expiresAt);

      const updatedListing = await axios.put(`/api/listings/${listing?._id}`, {
        ...data,
        expiresAt: expirationDate.toISOString(),
      });

      // set the updated listing in the listings state so its seen in UI immediatley
      setListings((prevListings: TListing[]) =>
        prevListings.map((listing: TListing) =>
          listing._id === updatedListing.data._id ? updatedListing.data : listing
        )
      );

      notifications.show({
        title: 'Success',
        message: 'Listing updated successfully!',
        color: 'green',
      });
      onClose();
      //onUpdate();
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: `Update failed! ${error?.response?.data?.message || error.message}`,
        color: 'red',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      opened={opened}
      onClose={onClose}
      title="Delete application"
      centered
      size="xl"
      zIndex={100}
    >
      <Stack gap="md" p="md">
        <Flex justify="space-between" align="center">
          <Title order={2}>Edit Listing</Title>
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
              </Stack>
            </Fieldset>

            <Fieldset legend="Application">
              <Stack gap="sm">
                <Text size="sm" c="dimmed">
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
                          description="Candidates apply through JobRocket"
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
                          description="Candidates send applications via email"
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
                          description="Candidates apply through external link"
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
                    {...register('apply.contact.email')}
                    error={errors.apply?.contact?.email?.message}
                  />
                )}

                {selectedMethod?.companySystem && (
                  <TextInput
                    label="External Application Link"
                    placeholder="https://company.com/careers/apply"
                    required
                    {...register('apply.contact.link')}
                    error={errors.apply?.contact?.link?.message}
                  />
                )}
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

            <Group justify="space-between" mt="md">
              <Button
                type="submit"
                variant="filled"
                color="green"
                leftSection={<IconDeviceFloppy size={16} />}
                disabled={!isValid || !isDirty}
                loading={isLoading}
              >
                Save Changes
              </Button>
            </Group>
          </Stack>
        </form>
      </Stack>
    </Modal>
  );
};
