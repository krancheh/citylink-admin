import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import renderCell from "../../utils/checkDataGridCell";
import { formatPhoneNumber } from "../../utils/getFormattedPhoneNumber";
import dayjs from "dayjs";
import { Button, Card } from "@mui/material";
import CustomDataGridFooter from "../common/CustomDataGridFooter";
import { Dispatch, SetStateAction } from "react";
import { Employee } from "../../types";
import CustomNoRowsMessage from "../common/CustomNoRowsMessage";

interface IProps {
    staff: Employee[];
    isLoading: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const StaffTable = (props: IProps) => {
    const { staff, isLoading, setIsModalOpen } = props;

    const columns: GridColDef[] = [
        {
            field: "id",
            headerName: "ID",
            width: 60,
            renderCell
        },
        {
            field: "lastName",
            headerName: "Фамилия",
            flex: 0.1,
            minWidth: 120,
            renderCell
        },
        {
            field: "firstName",
            headerName: "Имя",
            flex: 0.1,
            minWidth: 120,
            renderCell
        },
        {
            field: "middleName",
            headerName: "Отчество",
            flex: 0.1,
            minWidth: 120,
            renderCell
        },
        {
            field: "phoneNumber",
            headerName: "Номер телефона",
            flex: 0.1,
            minWidth: 120,
            renderCell: (params: GridRenderCellParams) => {
                return formatPhoneNumber(params.value);
            }
        },
        {
            field: "documentNumber",
            headerName: "Паспорт",
            flex: 0.1,
            minWidth: 120,
            renderCell: (params: GridRenderCellParams) => {
                if (!params.value) {
                    return "н/д"
                }

                return <i>Данные скрыты</i>;
            }
        },
        {
            field: "email",
            headerName: "Эл. почта",
            flex: 0.1,
            minWidth: 90,
            renderCell
        },
        {
            field: "gender",
            headerName: "Пол",
            width: 60,
            renderCell: (params: GridRenderCellParams) => {
                if (params.value === undefined || null) {
                    return "–"
                }

                return params.value ? "м" : "ж"
            }
        },
        {
            field: "birthDate",
            headerName: "Дата рождения",
            width: 120,
            renderCell: (params: GridRenderCellParams) => {
                return params.value ? dayjs(params.value).format("DD.MM.YYYY") : "–"
            }
        },
        {
            field: "position",
            headerName: "Должность",
            width: 120,
            renderCell
        },
        {
            field: "createdAt",
            headerName: "Дата регистрации",
            headerAlign: "right",
            align: "right",
            flex: 0.1,
            minWidth: 200,
            renderCell: (params: GridRenderCellParams) => {
                return params.value ? dayjs(params.value).format("DD.MM.YYYY HH:mm") : "–"
            }
        },
    ]

    return (
        <Card>
            <DataGrid
                autoHeight
                columns={columns}
                rows={staff || []}
                loading={isLoading}
                slots={{
                    noRowsOverlay: isLoading ? () => null : CustomNoRowsMessage,
                    footer: () => (
                        <CustomDataGridFooter>
                            <Button variant='outlined' size='small' sx={{ lineHeight: { sm: "25px", xs: "13px" } }} onClick={() => setIsModalOpen(true)}>Добавить сотрудника</Button>
                        </CustomDataGridFooter>
                    )
                }}
                sx={{ p: "0 15px", '--DataGrid-overlayHeight': '400px' }}
            />
        </Card>
    )
}
export default StaffTable