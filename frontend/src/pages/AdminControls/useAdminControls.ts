import { useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useDisclosure } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import { useGetAllUsers } from '@/hooks/UseGetAllUser';
import { removeUser } from '@/store/userSlice';
import { TUsers } from '@/Types';

export const useAdminControls = () => {
  // set up hooks
  const dispatch = useDispatch();
  const jumpTo = useNavigate();
  const [opened, { open, close }] = useDisclosure(false);
  const { allUsers, isLoading } = useGetAllUsers();
  const [sortOption, setSortOption] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  // delete user
  const deleteUser = async (id?: string) => {
    if (!id) {
      return notifications.show({
        title: 'Error',
        message: 'User ID not found.',
        color: 'red',
      });
    }
    try {
      const response = await axios.delete(`/api/users/${id}`);
      if (response.status === 200) {
        notifications.show({
          title: 'Warning',
          message: 'Account Deleted.',
          color: 'orange',
        });
        dispatch(removeUser(id));
      }
    } catch (error: any) {
      notifications.show({
        title: 'Error',
        message: error.response.data.message,
        color: 'red',
      });
    }
  };

  // get account type for filter
  const getAccountType = (user: TUsers) => {
    return user.isAdmin ? 'Admin' : user.profileType === 'business' ? 'Business' : 'Jobseeker';
  };

  // filter users
  const sortedUsers = allUsers
    ? [...allUsers].sort((a, b) => {
        if (sortOption === 'last-name-asc') {
          const aName =
            a.profileType === 'jobseeker'
              ? a.jobseekerProfile?.lastName
              : a.businessProfile?.companyName;
          const bName =
            b.profileType === 'jobseeker'
              ? b.jobseekerProfile?.lastName
              : b.businessProfile?.companyName;
          return (aName || '').localeCompare(bName || '');
        } else if (sortOption === 'last-name-desc') {
          const aName =
            a.profileType === 'jobseeker'
              ? a.jobseekerProfile?.lastName
              : a.businessProfile?.companyName;
          const bName =
            b.profileType === 'jobseeker'
              ? b.jobseekerProfile?.lastName
              : b.businessProfile?.companyName;
          return (bName || '').localeCompare(aName || '');
        } else if (sortOption === 'account-type') {
          return getAccountType(a).localeCompare(getAccountType(b));
        } else if (sortOption === 'date-created-old') {
          return a.createdAt.localeCompare(b.createdAt);
        } else if (sortOption === 'date-created-new') {
          return b.createdAt.localeCompare(a.createdAt);
        }
        return 0;
      })
    : [];

  // search on filtered users
  const filteredUsers = sortedUsers
    ? sortedUsers.filter((user) => {
        const accountType = getAccountType(user);
        const userName =
          user.profileType === 'jobseeker'
            ? `${user.jobseekerProfile?.firstName} ${user.jobseekerProfile?.lastName}`
            : user.businessProfile?.companyName;
        const userSearchFields = `${userName} ${user.email} ${accountType}`;
        return userSearchFields.toLowerCase().includes(searchTerm.toLowerCase());
      })
    : [];

  // pagination
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 30;
  const paginatedUsers = filteredUsers
    ? filteredUsers.slice((currentPage - 1) * usersPerPage, currentPage * usersPerPage)
    : [];

  //return
  return {
    opened,
    open,
    close,
    dispatch,
    allUsers,
    isLoading,
    deleteUser,
    getAccountType,
    sortedUsers,
    filteredUsers,
    paginatedUsers,
    currentPage,
    setCurrentPage,
    usersPerPage,
    sortOption,
    setSortOption,
    searchTerm,
    setSearchTerm,
    jumpTo,
  };
};
