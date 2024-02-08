import { Update } from '@mui/icons-material';
import { Box, Card, IconButton, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ChangeEventHandler, FormEventHandler, useEffect, useRef, useState } from 'react';
import RoutesService from '../api/RoutesService';
import { useAppDispatch, useAppSelector } from '../store';
import { selectCities, setCities } from '../store/dataSlice';
import PageWrapper from '../components/PageWrapper';
import CustomDataGridFooter from '../components/CustomDataGridFooter';
import { Button } from '@mui/material';
import CustomModal from '../components/CustomModal';


const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "cityName", headerName: "Город", flex: 1 },
]

const CitiesPage = () => {
    const [isCitiesLoading, setIsCitiesLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const dispatch = useAppDispatch();
    const cities = useAppSelector(selectCities);
    const newCityInputRef = useRef<HTMLInputElement | null>(null);
    const [newCityInputError, setNewCityInputError] = useState("");

    const getCities = async () => {
        setIsCitiesLoading(true);

        try {
            const response = await RoutesService.getCities("");
            const { cities } = response.data;

            dispatch(setCities({ cities }));
        } catch (e) {
            console.log(e);
        } finally {
            setIsCitiesLoading(false);
        }
    }

    useEffect(() => {
        if (!cities.length) getCities();
    }, []);


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
            const newCity = response.data.result;
            dispatch(setCities({ cities: [...cities, newCity] }));
            handleCloseModal();
        } catch (e: any) {
            setNewCityInputError(e.message);
        }
    }

    const handleNewCityInputChange: ChangeEventHandler<HTMLInputElement> = () => {
        setNewCityInputError("");
    }

    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица городов</Typography>
                <IconButton onClick={() => getCities()}><Update /></IconButton>
            </Box>
            <Box display="flex" flexDirection="row">
                <Card>
                    <DataGrid
                        columns={columns}
                        rows={cities || []}
                        checkboxSelection
                        loading={isCitiesLoading}
                        slots={{
                            footer: () => <CustomDataGridFooter>
                                <Button variant='outlined' size='small' onClick={() => setIsModalOpen(true)}>Добавить город</Button>
                            </CustomDataGridFooter>
                        }}
                    />
                </Card>
            </Box>
            <CustomModal
                id="cities-modal"
                title='Добавить город'
                description='Введите название города'
                open={isModalOpen}
                onClose={handleCloseModal}
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
        </PageWrapper>
    )
}

export default CitiesPage;
