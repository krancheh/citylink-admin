import { Box, Button, Card, IconButton, Typography } from "@mui/material"
import PageWrapper from "../components/containers/PageWrapper"
import { Update } from "@mui/icons-material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import useGetStaff from "../hooks/useGetStaff"
import renderCell from "../utils/checkDataGridCell"
import CustomNoRowsMessage from "../components/common/CustomNoRowsMessage"
import CustomDataGridFooter from "../components/common/CustomDataGridFooter"
import CustomModal from "../components/common/CustomModal"
import { useState } from "react"
import EmployeeForm from "../components/specific/EmployeeForm"
import dayjs from "dayjs"
import { formatPhoneNumber } from "../utils/getFormattedPhoneNumber"


const StaffPage = () => {
    const { staff, setStaff, isLoading } = useGetStaff();
    const [isModalOpen, setIsModalOpen] = useState(false);

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


    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица сотрудников</Typography>
                <IconButton onClick={() => null}><Update /></IconButton>
            </Box>
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

            <CustomModal
                id="cities-modal"
                title='Добавить сотрудника'
                description='Заполните данные о сотруднике.'
                open={isModalOpen}
                closeHandler={handleCloseModal}
            >
                <EmployeeForm handleCloseModal={handleCloseModal} setStaff={setStaff} />
            </CustomModal>
        </PageWrapper>
    )
}
export default StaffPage