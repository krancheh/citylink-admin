import { useEffect, useState } from 'react';
import UserService from '../api/UserService';
import PageWrapper from '../components/PageWrapper';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { Update } from '@mui/icons-material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useAppDispatch, useAppSelector } from '../store';
import { selectUsers, setUsers } from '../store/dataSlice';
import getFormattedUser from '../utils/getFormattedUser';
import { User } from '../types';



const UsersPage = () => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "lastName", headerName: "Фамилия", flex: 0.1, minWidth: 120 },
        { field: "firstName", headerName: "Имя", flex: 0.1, minWidth: 120 },
        { field: "middleName", headerName: "Отчество", flex: 0.1, minWidth: 120 },
        { field: "phoneNumber", headerName: "Номер телефона", flex: 0.1, minWidth: 120 },
        { field: "email", headerName: "Эл. почта", flex: 0.1, minWidth: 90 },
        { field: "gender", headerName: "Пол", width: 60 },
        { field: "role", headerName: "Роль", width: 90 },
        { field: "createdAt", headerName: "Дата регистрации", headerAlign: "right", align: "right", flex: 0.1, minWidth: 200 },
    ]

    const [isUsersLoading, setIsUsersLoading] = useState(false);
    const users = useAppSelector(selectUsers);
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


    useEffect(() => {
        if (!users.length) getUsers();
    }, []);

    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица пользователей</Typography>
                <IconButton onClick={() => getUsers()}><Update /></IconButton>
            </Box>
            <Card>
                <DataGrid
                    columns={columns}
                    rows={users || []}
                    checkboxSelection
                    loading={isUsersLoading}
                    sx={{ p: "0 15px" }}
                />
            </Card>
        </PageWrapper>
    )
}

export default UsersPage