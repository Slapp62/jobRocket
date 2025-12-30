import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { cleanedUserData } from '@/pages/BusinessUsers/Dashboard/utils/getCleanedListingData';
import { RootState } from '@/store/store';
import { clearUser, setUser, updateUser } from '@/store/userSlice';
import { TUsers } from '@/Types';
import { validatePdfFile } from '@/utils/fileValidation';
import { editProfileSchema } from '@/validationRules/editProfile.joi';

export const useEditProfile = () => {
  const jumpTo = useNavigate();
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const isAdminView = useSelector((state: RootState) => state.userSlice.isAdminView);
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const allUsers = useSelector((state: RootState) => state.userSlice.allUsers);
  const paramsUser = allUsers?.find((account) => account._id === id);

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeError, setResumeError] = useState<string | null>(null);

  const userData = isAdminView ? paramsUser : currentUser;

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors, isValid, isDirty },
    trigger,
  } = useForm<TUsers>({
    mode: 'all',
    resolver: joiResolver(editProfileSchema),
    defaultValues: userData ? cleanedUserData(userData) : {},
  });

  useEffect(() => {
    if (userData) {
      const defaultUserValues = cleanedUserData(userData);
      reset(defaultUserValues);
    }
  }, [reset, userData]);

  /**
   * Handle resume file change with validation
   * Validates the file and updates error state
   */
  const handleResumeChange = (file: File | null) => {
    const error = validatePdfFile(file);
    setResumeError(error);
    setResumeFile(error ? null : file);
  };

  const onSubmit = async (data: FieldValues) => {
    // Prevent submission if there's a file validation error
    if (resumeError) {
      notifications.show({
        title: 'Validation Error',
        message: resumeError,
        color: 'red',
      });
      return;
    }
    const payload: Partial<TUsers> = {
      phone: data.phone,
      profileType: data.profileType,
    };

    if (data.profileType === 'jobseeker') {
      payload.jobseekerProfile = data.jobseekerProfile;
    }

    if (data.profileType === 'business') {
      payload.businessProfile = data.businessProfile;
    }

    try {
      setSubmitting(true);
      let response;

      // If there's a resume file, use FormData
      if (resumeFile) {
        const formData = new FormData();

        // Add all the regular data as JSON string
        formData.append('phone', payload.phone || '');
        formData.append('profileType', payload.profileType || '');

        if (payload.jobseekerProfile) {
          // Flatten jobseekerProfile fields
          Object.keys(payload.jobseekerProfile).forEach((key) => {
            const value = payload.jobseekerProfile![key as keyof typeof payload.jobseekerProfile];
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
            const value = payload.businessProfile![key as keyof typeof payload.businessProfile];
            if (value !== undefined && value !== null) {
              formData.append(`businessProfile[${key}]`, String(value));
            }
          });
        }

        // Add the resume file
        formData.append('resume', resumeFile);

        response = await axios.put(`/api/users/${userData?._id}`, formData);
      } else {
        // No file, use regular JSON
        response = await axios.put(`/api/users/${userData?._id}`, payload);
      }

      if (response.status === 200) {
        const updatedUser = response.data;

        // if not admin view, update the current user information
        if (!isAdminView) {
          dispatch(setUser(updatedUser));
        }

        // if it is admin view, update the selected user information
        if (isAdminView) {
          dispatch(updateUser(updatedUser));
        }
        reset(cleanedUserData(updatedUser));
        setResumeFile(null);

        notifications.show({
          title: 'Success',
          message: 'Profile Updated Successfully!',
          color: 'green',
        });
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        error.message ||
        'An unexpected error occurred';
      notifications.show({
        title: 'Error',
        message: errorMessage,
        color: 'red',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const updateBusinessStatus = async () => {
    try {
      setSubmitting(true);
      const response = await axios.patch(`/api/users/${userData?._id}`);
      if (response.status === 200) {
        const updatedUser = response.data;

        setTimeout(() => {
          // if not admin view, update the current user information
          if (!isAdminView) {
            dispatch(setUser(updatedUser));
          }
          // if it is admin view, update the selected user information
          if (isAdminView) {
            dispatch(updateUser(updatedUser));
          }
          reset(cleanedUserData(updatedUser));
          notifications.show({
            title: 'Success',
            message: 'Account Status Updated',
            color: 'green',
          });
        }, 1000);
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response.data.message,
        color: 'red',
      });
    } finally {
      setSubmitting(false);
    }
  };

  const deleteUser = async () => {
    try {
      setIsDeleting(true);
      const response = await axios.delete(`/api/users/${userData?._id}`);
      if (response.status === 200) {
        !isAdminView ? dispatch(clearUser()) : jumpTo('/admin');
        notifications.show({
          title: 'Account Deactivated',
          message: 'Your account has been deactivated. You have 30 days to restore it by contacting support@jobrocket.work. After 30 days, all data will be permanently deleted.',
          color: 'orange',
          autoClose: 10000, // Longer duration for important message
        });
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response.data.message,
        color: 'red',
      });
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    isSubmitting,
    isDeleting,
    isAdminView,
    userData,
    register,
    handleSubmit,
    onSubmit,
    trigger,
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
    resumeError,
    handleResumeChange,
  };
};
