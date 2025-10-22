import { listingSchema } from "@/validationRules/listing.joi";
import {
  Paper,
  Title,
  Flex,
  Fieldset,
  TextInput,
  Textarea,
  Button,
  Select,
  Switch,
} from "@mantine/core";
import { joiResolver } from "@hookform/resolvers/joi";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useMediaQuery } from "@mantine/hooks";
import { useDispatch, useSelector } from "react-redux";
import { editListing } from "@/store/listingSlice";
import { cleanedListingData } from "@/utils/getCleanedListingData";
import { RootState } from "@/store/store";
import { TListing } from "@/Types";
// @ts-ignore
import WORK_ARRANGEMENTS from "@/data/workArr";
// @ts-ignore
import INDUSTRIES from "@/data/industries";
// @ts-ignore
import { REGIONS, getCitiesByRegion } from "@/data/israelCities";

type ListingFormValues = {
  jobTitle: string;
  jobDescription: string;
  requirements: string[];
  advantages: string[];
  apply: {
    method: "email" | "link";
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

export function EditListing() {
  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8181";
  const { id } = useParams();
  const isMobile = useMediaQuery("(max-width: 700px)");
  const [isDisabled, setDisabled] = useState(true);
  const dispatch = useDispatch();

  const allListings = useSelector((state: RootState) => state.listingSlice.listings);
  const listingData = allListings?.find((listing) => listing._id === id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid, isDirty },
    control,
    trigger,
  } = useForm<ListingFormValues>({
    mode: "all",
    resolver: joiResolver(listingSchema),
    defaultValues: listingData
      ? (cleanedListingData(listingData) as ListingFormValues)
      : {
          jobTitle: "",
          jobDescription: "",
          requirements: [],
          advantages: [],
          apply: { method: "email", contact: "" },
          location: { region: "", city: "" },
          workArrangement: "",
          industry: "",
          isActive: true,
          expiresAt: "",
        },
  });

  useEffect(() => {
    if (listingData) {
      const defaults = cleanedListingData(listingData) as ListingFormValues;
      reset(defaults);
    }
  }, [reset, listingData]);

  const selectedRegion = useWatch({
    control,
    name: "location.region",
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
      const response = await axios.put(`${API_BASE_URL}/api/listings/${id}`, {
        ...data,
        expiresAt: data.expiresAt ? new Date(data.expiresAt).toISOString() : null,
      });
      if (response.status === 200) {
        dispatch(editListing({ listing: response.data as TListing }));
        toast.success("Listing updated successfully!", {
          position: "bottom-right",
        });
        setDisabled(true);
      }
    } catch (error: any) {
      toast.error(
        `Update failed! ${error?.response?.data?.message || error.message}`,
        { position: "bottom-right" },
      );
    }
  };

  return (
    <Paper>
      <Title ta="center" my={10}>
        Edit Listing
      </Title>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Flex
          direction="column"
          gap={10}
          py={10}
          mx="auto"
          style={{ width: isMobile ? "90%" : "40%" }}
        >
          <Fieldset legend="Job Info">
            <TextInput
              label="Job Title"
              required
              disabled={isDisabled}
              {...register("jobTitle")}
              error={errors.jobTitle?.message}
            />

            <Textarea
              label="Job Description"
              required
              disabled={isDisabled}
              minRows={4}
              {...register("jobDescription")}
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
                  value={(field.value || []).join("\n")}
                  onChange={(event) => {
                    const next = event.currentTarget.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean);
                    field.onChange(next);
                  }}
                  error={errors.requirements?.message as string}
                  disabled={isDisabled}
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
                  value={(field.value || []).join("\n")}
                  onChange={(event) => {
                    const next = event.currentTarget.value
                      .split("\n")
                      .map((line) => line.trim())
                      .filter(Boolean);
                    field.onChange(next);
                  }}
                  error={errors.advantages?.message as string}
                  disabled={isDisabled}
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
                    { value: "email", label: "Email" },
                    { value: "link", label: "External Link" },
                  ]}
                  {...field}
                  error={errors.apply?.method?.message}
                  disabled={isDisabled}
                />
              )}
            />

            <TextInput
              label="Application Contact / URL"
              required
              disabled={isDisabled}
              {...register("apply.contact")}
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
                  disabled={isDisabled}
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
                  disabled={!selectedRegion || isDisabled}
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
                  disabled={isDisabled}
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
                  disabled={isDisabled}
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
                  onChange={(event) =>
                    field.onChange(event.currentTarget.checked)
                  }
                  disabled={isDisabled}
                />
              )}
            />

            <TextInput
              label="Expiration Date"
              type="date"
              disabled={isDisabled}
              {...register("expiresAt")}
              error={errors.expiresAt?.message as string}
            />
          </Fieldset>
        </Flex>

        <Flex justify="center" my={10} gap={10}>
          <Button
            size="md"
            onClick={() => {
              setDisabled(false);
              trigger();
            }}
          >
            Edit
          </Button>

          <Button
            size="md"
            type="reset"
            onClick={() => {
              reset();
              setDisabled(false);
            }}
          >
            Reset
          </Button>

          <Button type="submit" size="md" disabled={!isValid || !isDirty}>
            Update
          </Button>
        </Flex>
      </form>
    </Paper>
  );
}
