import { useEffect, useState } from 'react';
import { joiResolver } from '@hookform/resolvers/joi';
import axios from 'axios';
import { FieldValues, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import { useDisclosure, useMediaQuery } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { RootState } from '@/store/store';
import { clearUser, setUser, updateUser } from '@/store/userSlice';
import { TUsers } from '@/Types';
import { cleanedUserData } from '@/pages/BusinessUsers/Dashboard/utils/getCleanedListingData';
import { editProfileSchema } from '@/validationRules/editProfile.joi';

export const useEditProfile = () => {
  const jumpTo = useNavigate();
  const { id } = useParams();
  const isMobile = useMediaQuery('(max-width: 700px)');
  const dispatch = useDispatch();
  const [isSubmitting, setSubmitting] = useState(false);
  const [opened, { open, close }] = useDisclosure(false);

  const isAdminView = useSelector((state: RootState) => state.userSlice.isAdminView);
  const currentUser = useSelector((state: RootState) => state.userSlice.user);
  const allUsers = useSelector((state: RootState) => state.userSlice.allUsers);
  const paramsUser = allUsers?.find((account) => account._id === id);

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

  const onSubmit = async (data: FieldValues) => {
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
      const response = await axios.put(`/api/users/${userData?._id}`, payload);

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
        notifications.show({
          title: 'Success',
          message: 'Profile Updated Successfully!',
          color: 'green',
        });
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: `Update Failed! ${error?.response?.data || error.message}`,
        color: 'red',
      });
    }
  };

  const updateBusinessStatus = async () => {
    try {
      const response = await axios.patch(`/api/users/${userData?._id}`);
      if (response.status === 200) {
        const updatedUser = response.data;
        setSubmitting(true);
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
          setSubmitting(false);
        }, 1000);
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response.data.message,
        color: 'red',
      });
    }
  };

  const deleteUser = async () => {
    try {
      const response = await axios.delete(`/api/users/${userData?._id}`);
      if (response.status === 200) {
        !isAdminView ? dispatch(clearUser()) : jumpTo('/admin');
        notifications.show({
          title: 'Warning',
          message: 'Account Deleted.',
          color: 'orange',
        });
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response.data.message,
        color: 'red',
      });
    }
  };

  return {
    isSubmitting,
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
  };
};
