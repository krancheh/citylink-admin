import { MoreHorizOutlined, Update } from '@mui/icons-material';
import { Alert, AlertProps, Box, Button, Card, IconButton, Snackbar, TextField, Typography } from '@mui/material';
import { DataGrid, GridApi, GridCellEditStopParams, GridCellEditStopReasons, GridColDef, GridRowModel, MuiEvent, gridClasses } from '@mui/x-data-grid';
import { ChangeEventHandler, FormEventHandler, MouseEventHandler, useRef, useState } from 'react';
import RoutesService from '../api/services/RoutesService';
import CustomDataGridFooter from '../components/common/CustomDataGridFooter';
import CustomModal from '../components/common/CustomModal';
import PageWrapper from '../components/containers/PageWrapper';
import useGetCities from '../hooks/useGetCities';
import createDebounce from '../utils/createDebounce';
import { City } from '../types';



const CitiesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cityName, setCityName] = useState("");

    const { cities, setCities, isLoading } = useGetCities({ cityName });

    const newCityInputRef = useRef<HTMLInputElement | null>(null);
    const [newCityInputError, setNewCityInputError] = useState("");

    const [snackbar, setSnackbar] = useState<Pick<AlertProps, 'children' | 'severity'> | null>(null);

    const cityNameValidation = /^[а-яА-Я]+(?:-[а-яА-Я]+)*$/; // регулярное выражение для названия города

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "cityName", headerName: "Город", flex: 1, editable: true },
        {
            field: "action",
            headerName: "",
            hideSortIcons: true,
            disableColumnMenu: true,
            sortable: false,
            align: "right",
            renderCell: (params) => {
                const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
                    e.stopPropagation(); // don't select this row after clicking
                    console.log(params);

                };

                return (
                    <IconButton onClick={onClick}><MoreHorizOutlined /></IconButton>
                )
            }
        }
    ]

    const handleCloseModal = () => {
        setIsModalOpen(false);
    }

    const handleCreateCity: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        const cityName = newCityInputRef.current?.value;
        if (!cityName) {
            return setNewCityInputError("Введите название города");
        }

        try {
            const response = await RoutesService.addCity(cityName);
            console.log(response);
            const newCity = response.data.city;

            setCities([...cities, newCity]);
            handleCloseModal();
        } catch (e: any) {
            setNewCityInputError(e.message);
        }
    }

    const handleNewCityInputChange: ChangeEventHandler<HTMLInputElement> = (e) => {
        setNewCityInputError("");

        if (e.target.value && !cityNameValidation.test(e.target.value)) {
            setNewCityInputError("Некорректное название города");
        }
    }

    const handleUpdateCity = async (newCity: City, originalCity: City) => {
        console.log(newCity.cityName);
        if (newCity.cityName === originalCity.cityName) {
            return originalCity;
        }

        if (cityNameValidation.test(newCity.cityName)) {
            const response = await RoutesService.updateCity(newCity);
            console.log(response);
            if (response.data.city.cityName) {
                return response.data.city;
            }

        } else {
            throw new Error("Некорректное название города");
        }

        throw new Error("Что то пошло не так");
    }

    const handleUpdateCityError = (error: Error) => {
        setSnackbar({ severity: "error", children: error.message })
    }

    const handleCloseSnackbar = () => setSnackbar(null);

    const debouncedSetCityName = createDebounce((cityName: string) => setCityName(cityName), 300);


    const handleDeleteCity = async () => {
        // try {
        //     const response = await RoutesService.deleteCity()
        // }
    }


    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица городов</Typography>
                <IconButton onClick={() => setCityName("")}><Update /></IconButton>
            </Box>
            <TextField
                variant='outlined'
                label='Поиск'
                size='small'
                onChange={(e) => { debouncedSetCityName(e.target.value) }}
            />
            <Box display="flex" flexDirection="row">
                <Card style={{ width: "100%", marginTop: "20px" }}>
                    <DataGrid
                        columns={columns}
                        rows={cities || []}
                        checkboxSelection={false}
                        loading={isLoading}
                        slots={{
                            footer: () => (
                                <CustomDataGridFooter>
                                    <Button variant='outlined' size='small' sx={{ lineHeight: { sm: "25px", xs: "13px" } }} onClick={() => setIsModalOpen(true)}>Добавить город</Button>
                                </CustomDataGridFooter>
                            )
                        }}
                        onCellEditStop={(params, event) => {
                            if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                                event.defaultMuiPrevented = true;
                            }
                        }}
                        processRowUpdate={handleUpdateCity}
                        onProcessRowUpdateError={handleUpdateCityError}
                        sx={{
                            p: "0px 15px",
                            [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                                outline: 'none',
                            },
                            [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                            {
                                outline: 'none',
                            },
                            '--DataGrid-overlayHeight': '300px'
                        }}
                    />
                </Card>
            </Box>
            <CustomModal
                id="cities-modal"
                title='Добавить город'
                description='Введите название города'
                open={isModalOpen}
                closeHandler={handleCloseModal}
            >
                <form onSubmit={handleCreateCity}>
                    <TextField
                        label="Город"
                        size='small'
                        fullWidth sx={{ mb: "15px" }}
                        inputRef={newCityInputRef}
                        autoFocus
                        required
                        onChange={handleNewCityInputChange}
                        helperText={newCityInputError}
                        error={!!newCityInputError}
                    />
                    <Button sx={{ float: "right", ml: "20px" }} variant='contained' disabled={!!newCityInputError} type='submit'>Добавить</Button>
                    <Button sx={{ float: "right" }} color='error' onClick={handleCloseModal}>Отмена</Button>
                </form>
            </CustomModal>
            {!!snackbar && (
                <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={5000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            )}
        </PageWrapper>
    )
}

export default CitiesPage;
