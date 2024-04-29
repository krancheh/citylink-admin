import PageWrapper from '../components/containers/PageWrapper';
import { Box, IconButton, Typography } from '@mui/material';
import { Update } from '@mui/icons-material';
import UsersTable from '../components/specific/UsersTable';
import { useState } from 'react';
import { useAppDispatch } from '../store';
import { setUsers } from '../store/dataSlice';
import UserService from '../api/services/UserService';
import { User } from '../types';
import getFormattedUser from '../utils/getFormattedUser';



const UsersPage = () => {
    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const dispatch = useAppDispatch();

    const getUsers = async () => {
        setIsUsersLoading(true);

        try {
            const response = await UserService.getUsers();
            const formattedUsers: User[] = response.data.users.map(user => getFormattedUser(user));

            dispatch(setUsers({ users: formattedUsers }));
        } catch (e) {
            console.log(e);
        } finally {
            setIsUsersLoading(false);
        }
    }

    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица пользователей</Typography>
                <IconButton onClick={() => getUsers()}><Update /></IconButton>
            </Box>
            <UsersTable getUsers={getUsers} isLoading={isUsersLoading} />
        </PageWrapper>
    )
}

export default UsersPage