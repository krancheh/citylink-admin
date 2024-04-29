import { DataGrid, GridColDef } from "@mui/x-data-grid";
import renderCell from "../../utils/checkDataGridCell";
import { useEffect } from "react";
import { useAppSelector } from "../../store";
import { selectUsers } from "../../store/dataSlice";
import { Card } from "@mui/material";
import CustomNoRowsMessage from "../common/CustomNoRowsMessage";

interface IProps {
    isLoading: boolean;
    getUsers: () => void;
}

const UsersTable = (props: IProps) => {
    const { getUsers, isLoading } = props;
    const users = useAppSelector(selectUsers);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 60, renderCell },
        { field: "lastName", headerName: "Фамилия", flex: 0.1, minWidth: 120, renderCell },
        { field: "firstName", headerName: "Имя", flex: 0.1, minWidth: 120, renderCell },
        { field: "middleName", headerName: "Отчество", flex: 0.1, minWidth: 120, renderCell },
        { field: "phoneNumber", headerName: "Номер телефона", flex: 0.1, minWidth: 120, renderCell },
        {
            field: "email", headerName: "Эл. почта", flex: 0.1, minWidth: 90, renderCell,
        },
        { field: "gender", headerName: "Пол", width: 60, renderCell },
        { field: "role", headerName: "Роль", width: 90, renderCell },
        { field: "createdAt", headerName: "Дата регистрации", headerAlign: "right", align: "right", flex: 0.1, minWidth: 200, renderCell },
    ]


    useEffect(() => {
        if (!users.length) getUsers();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <Card>
            <DataGrid
                autoHeight
                columns={columns}
                rows={users || []}
                loading={isLoading}
                slots={{ noRowsOverlay: isLoading ? () => null : CustomNoRowsMessage }}
                sx={{ p: "0 15px", '--DataGrid-overlayHeight': '400px' }}
            />
        </Card>
    )
}
export default UsersTable