import { Alert, Autocomplete, Box, Button, Card, Collapse, IconButton, TextField, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { ChangeEventHandler, FormEventHandler, useEffect, useState } from 'react';
import RoutesService from '../api/services/RoutesService';
import { Update } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store';
import { selectCities, selectRoutes, setCities, setRoutes } from '../store/dataSlice';
import PageWrapper from '../components/containers/PageWrapper';
import CustomDataGridFooter from '../components/common/CustomDataGridFooter';
import CustomModal from '../components/common/CustomModal';
import { OptionType } from '../components/common/CustomAutocomplete';


const RoutesPage = () => {
    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", hideSortIcons: true, width: 65 },
        { field: "departureCity", headerName: "Город отправления", flex: 0.4, minWidth: 200 },
        { field: "destinationCity", headerName: "Город прибытия", flex: 0.4, minWidth: 200 },
        { field: "duration", headerName: "Время в пути", flex: 0.2, minWidth: 120 },
    ]

    const durationRegExp = /^[1-9]\d*$/;

    const [departureCity, setDepartureCity] = useState<OptionType | null>(null);
    const [destinationCity, setDestinationCity] = useState<OptionType | null>(null);
    const [newRouteSuccess, setNewRouteSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [duration, setDuration] = useState<number>(1);
    const [error, setError] = useState("");
    const [isRoutesFetching, setIsRoutesFetching] = useState(false);
    const [openModal, setOpenModal] = useState(false);
    const [citiesOptions, setCitiesOptions] = useState<readonly OptionType[] | readonly []>([])

    const dispatch = useAppDispatch();
    const routes = useAppSelector(selectRoutes);
    const cities = useAppSelector(selectCities);

    const getCities = async () => {
        try {
            const response = await RoutesService.getCities("");
            const { cities } = response.data;
            dispatch(setCities({ cities }));
        } catch (e) {
            console.log(e);
        }
    }

    const getRoutes = async () => {
        setIsRoutesFetching(true);

        try {
            const response = await RoutesService.getRoutes();
            const { routes } = response.data;
            dispatch(setRoutes({ routes }));
        } catch (e) {
            console.log(e);
        } finally {
            setIsRoutesFetching(false);
        }
    }

    const createRoute = async () => {
        try {
            if (departureCity && destinationCity && duration) {
                const response = await RoutesService.addRoute({ departureCityId: +departureCity.id, destinationCityId: +destinationCity.id, duration: duration.toString() });
                const { route } = response.data;
                dispatch(setRoutes({ routes: [...routes, route] }));


                return route;
            }
        } catch (e: any) {
            setError(e.message);
        }
    }

    const handleOpenModal = async () => {
        if (!cities.length) await getCities();
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setDepartureCity(null);
        setDestinationCity(null);
        setOpenModal(false);
    }

    const handleCreateRoute: FormEventHandler<HTMLFormElement> = (e) => {
        e.preventDefault();

        if (!departureCity || !destinationCity) {
            return setError("Укажите города");
        }

        if (!duration) {
            return setError("Не указана длительность поездки")
        }

        createRoute()
            .then((result) => {
                if (result) {
                    setNewRouteSuccess(true);

                    setTimeout(() => {
                        setNewRouteSuccess(false);
                    }, 5000)
                }
            })
            .catch(e => {
                setError(e.message);
            })
    }

    const handleChangeDuration: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;

        if (durationRegExp.test(value)) {
            return setDuration(+value);
        }
    }

    useEffect(() => {
        setCitiesOptions(cities.map(city => (
            { id: city.id, value: city.cityName }
        )));
    }, [cities]);


    useEffect(() => {
        if (departureCity && destinationCity && departureCity.id === destinationCity.id) {
            return setError("Город отправления и город прибытия не могут быть одинаковыми");
        }

        return setError("");
    }, [departureCity, destinationCity])


    useEffect(() => {
        if (!routes.length) getRoutes();
    }, [])

    useEffect(() => {
        setSuccessMessage(`${departureCity?.value} - ${destinationCity?.value}`);
    }, [newRouteSuccess])


    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица маршрутов</Typography>
                <IconButton onClick={() => getRoutes()}><Update /></IconButton>
            </Box>
            <Box display="flex" flexDirection="row">
                <Card
                    sx={{ maxWidth: "800px", width: "100%" }}
                >
                    <DataGrid
                        autoHeight
                        columns={columns}
                        rows={routes || []}
                        checkboxSelection
                        loading={isRoutesFetching}
                        slots={{
                            footer: () => (
                                <CustomDataGridFooter>
                                    <Button variant='outlined' size='small' sx={{ lineHeight: { sm: "25px", xs: "13px" } }} onClick={handleOpenModal}>Добавить маршрут</Button>
                                </CustomDataGridFooter>
                            )
                        }}
                        sx={{ p: "0 15px", '--DataGrid-overlayHeight': '400px' }}
                    />
                </Card>
            </Box>
            <CustomModal
                id='routes-modal'
                open={openModal}
                title='Добавить новый маршрут'
                description='Выберите город отправления и прибытия'
                closeHandler={handleCloseModal}
            >
                <form onSubmit={handleCreateRoute}>
                    <Box display={'flex'} flexDirection={"column"} gap={"20px"}>
                        <Autocomplete
                            value={departureCity}
                            options={citiesOptions}
                            getOptionLabel={option => option.value}
                            onChange={(event, value: OptionType | null) => setDepartureCity(value)}
                            isOptionEqualToValue={(option, value) => option.id === value.id}

                            renderInput={(params) => (
                                <TextField {...params} label="Город отправления" name='departureCity' size='small' />
                            )}
                        />
                        <Autocomplete
                            value={destinationCity}
                            options={citiesOptions}
                            getOptionLabel={option => option.value}
                            onChange={(event, value: OptionType | null) => setDestinationCity(value)}
                            isOptionEqualToValue={(option, value) => option.id === value.id}

                            renderInput={(params) => (
                                <TextField {...params} label="Город прибытия" name='destinationCity' size='small' />
                            )}
                        />
                        <TextField
                            value={duration}
                            type='number'
                            label='Длительность'
                            size="small"
                            onChange={handleChangeDuration}
                        />
                        <Collapse in={!!error}>
                            <Alert severity='error'>{error}</Alert>
                        </Collapse>
                        <Collapse in={!error && newRouteSuccess && !!departureCity?.value && !!destinationCity?.value}>
                            <Alert severity='success'>Маршрут <b>{successMessage}</b> создан</Alert>
                        </Collapse>
                        <Box>
                            <Button sx={{ float: "right", ml: "20px" }} variant='contained' disabled={!!error} type='submit'>Добавить</Button>
                            <Button sx={{ float: "right" }} color='error' onClick={handleCloseModal}>Отмена</Button>
                        </Box>
                    </Box>
                </form>
            </CustomModal>
        </PageWrapper>
    )
}

export default RoutesPage;