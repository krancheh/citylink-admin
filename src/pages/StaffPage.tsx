import { Alert, Box, Button, Card, Collapse, FormControl, IconButton, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import PageWrapper from "../components/containers/PageWrapper"
import { Update } from "@mui/icons-material"
import { DataGrid, GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import useGetStaff from "../hooks/useGetStaff"
import renderCell from "../utils/checkDataGridCell"
import CustomNoRowsMessage from "../components/common/CustomNoRowsMessage"
import CustomDataGridFooter from "../components/common/CustomDataGridFooter"
import CustomModal from "../components/common/CustomModal"
import { ChangeEventHandler, Dispatch, SetStateAction, useState } from "react"
import { Dayjs } from "dayjs"


type InputHandler = ChangeEventHandler<HTMLInputElement>;

const StaffPage = () => {
    const { staff, setStaff, isLoading } = useGetStaff();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [middleName, setMiddleName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState<number | null>(null);
    const [birthDate, setBirthDate] = useState<Dayjs>();
    const [docNumber, setDocNumber] = useState<number>();
    const [email, setEmail] = useState("");
    const [position, setPosition] = useState("");
    const [gender, setGender] = useState<boolean | null>(null);

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 60, renderCell },
        { field: "lastName", headerName: "Фамилия", flex: 0.1, minWidth: 120, renderCell },
        { field: "firstName", headerName: "Имя", flex: 0.1, minWidth: 120, renderCell },
        { field: "middleName", headerName: "Отчество", flex: 0.1, minWidth: 120, renderCell },
        { field: "phoneNumber", headerName: "Номер телефона", flex: 0.1, minWidth: 120, renderCell },
        {
            field: "documentNumber", headerName: "Паспорт", flex: 0.1, minWidth: 120, renderCell: (params: GridRenderCellParams) => {
                if (!params.value) {
                    return "н/д"
                }

                const docNumber = String(params.value)
                return "#### ##" + docNumber.slice(7);
            }
        },
        { field: "email", headerName: "Эл. почта", flex: 0.1, minWidth: 90, renderCell, },
        {
            field: "gender", headerName: "Пол", width: 60, renderCell: (params: GridRenderCellParams) => {
                if (params.value === undefined || null) {
                    return "н/д"
                }

                return params.value ? "м" : "ж"
            }
        },
        { field: "birthDate", headerName: "Дата рождения", width: 120, renderCell },
        { field: "position", headerName: "Должность", width: 120, renderCell },
        { field: "createdAt", headerName: "Дата регистрации", headerAlign: "right", align: "right", flex: 0.1, minWidth: 200, renderCell },
    ]


    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const validateName = (setState: Dispatch<SetStateAction<string>>) => {
        return ((e) => {
            setState(e.target.value);
        }) as InputHandler
    }

    const handlePhNumberChange: InputHandler = (e) => {

    }

    const handleCreateEmployee = () => {
        // НАППИСАТЬ
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
                <form
                    onSubmit={handleCreateEmployee}
                    style={{
                        display: "grid",
                        gap: "20px",
                        gridTemplateColumns: "1fr 1fr",
                        gridTemplateAreas: `
                        "alert alert"
                        "lname fname"
                        "mname mname"
                        "phnum phnum"
                        "email email"
                        "docnum gender"
                        "pos pos"
                        "cancel done"
                        `
                    }}
                >
                    <Collapse in sx={{ gridArea: "alert" }}>
                        <Alert severity="warning">Поля, отмеченные * являются обязательными</Alert>
                    </Collapse>
                    <TextField
                        label="Фамилия"
                        size='small'
                        fullWidth sx={{ gridArea: "lname" }}
                        value={lastName}
                        autoFocus
                        required
                        onChange={validateName(setLastName)}
                    // helperText={newCityInputError}
                    // error={!!newCityInputError}
                    />
                    <TextField
                        label="Имя"
                        size='small'
                        fullWidth sx={{ gridArea: "fname" }}
                        value={firstName}
                        required
                        onChange={validateName(setFirstName)}
                    // helperText={newCityInputError}
                    // error={!!newCityInputError}
                    />
                    <TextField
                        label="Отчество"
                        size='small'
                        fullWidth sx={{ gridArea: "mname" }}
                        value={middleName}
                        onChange={validateName(setMiddleName)}
                    // helperText={newCityInputError}
                    // error={!!newCityInputError}
                    />
                    <TextField
                        label="Номер телефона"
                        size='small'
                        type="tel"
                        required
                        fullWidth sx={{ gridArea: "phnum" }}
                        value={phoneNumber}
                    // onChange={handleNameChange}
                    // helperText={newCityInputError}
                    // error={!!newCityInputError}
                    />
                    <TextField
                        label="Email"
                        size='small'
                        type="email"
                        fullWidth sx={{ gridArea: "email" }}
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    // helperText={newCityInputError}
                    // error={!!newCityInputError}
                    />
                    <TextField
                        label="Паспортные данные"
                        size='small'
                        fullWidth sx={{ gridArea: "docnum" }}
                        value={docNumber}
                    // onChange={handleNameChange}
                    // helperText={newCityInputError}
                    // error={!!newCityInputError}
                    />
                    <FormControl sx={{ gridArea: "gender" }} size="small">
                        <InputLabel id="gender-label">Пол:</InputLabel>
                        <Select
                            labelId="gender-label"
                            size="small"
                            value={gender}
                            label="Пол:"
                            onChange={(e) => {
                                if (e.target.value === "не указ") {
                                    setGender(null);
                                    return;
                                }

                                setGender(e.target.value as boolean);
                            }}
                        >
                            <MenuItem value={1}>Мужской</MenuItem>
                            <MenuItem value={0}>Женский</MenuItem>
                            <MenuItem value={"не указ"}>Не указывать</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        label="Должность"
                        size='small'
                        required
                        fullWidth sx={{ gridArea: "pos" }}
                        value={position}
                        onChange={validateName(setPosition)}
                    // helperText={newCityInputError}
                    // error={!!newCityInputError}
                    />
                    <Button sx={{ mt: 2, gridArea: "cancel" }} variant="outlined" color='error' onClick={handleCloseModal}>Отмена</Button>
                    <Button sx={{ mt: 2, gridArea: "done" }} variant='contained' disabled={false} type='submit'>Добавить</Button>
                </form>
            </CustomModal>
        </PageWrapper>
    )
}
export default StaffPage