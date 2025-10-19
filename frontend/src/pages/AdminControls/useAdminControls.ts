import { useGetAllUsers } from "@/hooks/UseGetAllUser";
import { removeUser } from "@/store/userSlice";
import { TUsers } from "@/Types";
import { useDisclosure } from "@mantine/hooks";
import axios from "axios";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const useAdminControls = () => {

    // set up hooks
    const dispatch = useDispatch();
    const jumpTo = useNavigate();
    const [opened, { open, close }] = useDisclosure(false);
    const {allUsers, isLoading} = useGetAllUsers();
    const [sortOption, setSortOption] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const API_BASE_URL = import.meta.env.VITE_API_URL;

    // delete user
    const deleteUser = async (id?: string) => {
        if (!id) {return toast.error('User ID not found.', {position: 'bottom-right'})};
        const token  = localStorage.getItem('token') || sessionStorage.getItem('token');
        axios.defaults.headers.common['x-auth-token'] = token;
        try {
            const response = await axios.delete(`${API_BASE_URL}/api/users/${id}`);
            if (response.status === 200){
                toast.warning('Account Deleted.', {position: 'bottom-right'})
                dispatch(removeUser(id));
            }
        } catch (error : any) {
            toast.error(error.response.data.message, {position: `bottom-right`});
        } 
    }

    // get account type for filter
    const getAccountType = (user : TUsers) => {
        return user.isAdmin ? 'Admin' : user.isBusiness ? 'Business' : 'Regular';
    }

    // filter users
    const sortedUsers = allUsers ? [...allUsers].sort((a,b) => {
        if (sortOption === 'last-name-asc'){
            return a.name.last.localeCompare(b.name.last);
        } else if (sortOption === 'last-name-desc') {
            return b.name.last.localeCompare(a.name.last);
        } else if (sortOption === "account-type"){
            return getAccountType(a).localeCompare(getAccountType(b));
        } else if (sortOption === 'date-created-old'){
            return a.createdAt.localeCompare(b.createdAt)
        } else if (sortOption === 'date-created-new'){
            return b.createdAt.localeCompare(a.createdAt)
        }
    return 0
    }) : [];

    // search on filtered users
    const filteredUsers = sortedUsers ? sortedUsers.filter((user) => {
        const accountType = getAccountType(user);
        const userSearchFields = `${user.name.first} ${user.name.last} ${user.email} ${accountType}`;
        return userSearchFields.toLowerCase().includes(searchTerm.toLowerCase());
    }) : [];

    // pagination
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 30;
    const paginatedUsers = filteredUsers ? filteredUsers.slice(
    (currentPage - 1) * usersPerPage, currentPage * usersPerPage) : [];

    //return
    return {opened, open, close, dispatch, allUsers, isLoading, deleteUser, getAccountType, sortedUsers, filteredUsers, paginatedUsers, currentPage, setCurrentPage, usersPerPage, sortOption, setSortOption, searchTerm, setSearchTerm, jumpTo};

}