import { Alert, Autocomplete, Box, Button, Collapse, TextField } from "@mui/material";
import CustomModal from "../common/CustomModal";
import { OptionType } from "../common/ServerSideAutocomplete";
import { ChangeEventHandler, Dispatch, FormEventHandler, SetStateAction, useEffect, useState } from "react";
import useGetCities from "../../hooks/useGetCities";
import RoutesService from "../../api/services/RoutesService";
import { useAppDispatch, useAppSelector } from "../../store";
import { selectRoutes, setRoutes } from "../../store/dataSlice";
import { EditParams } from "./RouteTable";

interface IProps {
    isModalOpen: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
    editParams?: EditParams;
}

const RouteForm = (props: IProps) => {
    const { isModalOpen, setIsModalOpen, editParams } = props;
    const { cities } = useGetCities("");
    const routes = useAppSelector(selectRoutes);

    const [departureCity, setDepartureCity] = useState<OptionType | null>(editParams?.departureCity || null);
    const [destinationCity, setDestinationCity] = useState<OptionType | null>(editParams?.destinationCity || null);
    const [duration, setDuration] = useState<number>(editParams?.duration || 1);
    const [routeId, setRouteId] = useState<number>(editParams?.routeId || 1);

    const [citiesOptions, setCitiesOptions] = useState<readonly OptionType[] | readonly []>([])

    const [newRouteSuccess, setNewRouteSuccess] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");

    const durationRegExp = /^[1-9]\d*$/;
    const [error, setError] = useState("");

    const dispatch = useAppDispatch();

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
        setSuccessMessage(`${departureCity?.value} - ${destinationCity?.value}`);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [newRouteSuccess])

    useEffect(() => {
        if (editParams) {
            setDepartureCity(editParams.departureCity);
            setDestinationCity(editParams.destinationCity);
            setDuration(editParams.duration);
            setRouteId(editParams.routeId);
        }
    }, [editParams])


    const handleCreateRoute: FormEventHandler<HTMLFormElement> = async (e) => {
        e.preventDefault();

        if (!departureCity || !destinationCity) {
            return setError("Укажите города");
        }

        if (!duration) {
            return setError("Не указана длительность поездки")
        }
        try {

            const response = editParams ? await updateRoute() : await createRoute();
            if (response) {
                setNewRouteSuccess(true);

                setTimeout(() => {
                    setNewRouteSuccess(false);
                }, 5000)
            }
        } catch (e: any) {
            setError(e.message);
        }
    }

    const handleChangeDuration: ChangeEventHandler<HTMLInputElement> = (e) => {
        const value = e.target.value;

        if (durationRegExp.test(value)) {
            return setDuration(+value);
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

    const updateRoute = async () => {
        try {
            if (editParams?.routeId) {
                const response = await RoutesService.updateRoute({ routeId, departureCityId: Number(departureCity?.id), destinationCityId: Number(destinationCity?.id), duration });
                const { route } = response.data;
                dispatch(setRoutes({ routes: [...routes.filter(route => route.id !== editParams.routeId), route] }));


                return route;
            }

            throw new Error("Что-то пошло не так, перезагрузите страницу")
        } catch (e: any) {
            setError(e.message);
        }
    }

    const handleCloseModal = () => {
        setDepartureCity(null);
        setDestinationCity(null);
        setDuration(1);
        setIsModalOpen(false);
    }

    return (
        <CustomModal
            id='routes-modal'
            open={isModalOpen}
            title={editParams ? "Обновить существующий маршрут" : "Добавить новый маршрут"}
            description='Выберите город отправления и прибытия'
            closeHandler={handleCloseModal}
        >
            <form onSubmit={handleCreateRoute}>
                <Box display={'flex'} flexDirection={"column"} gap={"20px"}>
                    <Autocomplete
                        value={departureCity}
                        options={citiesOptions}
                        getOptionLabel={option => option.value}
                        onChange={(_, value: OptionType | null) => setDepartureCity(value)}
                        isOptionEqualToValue={(option, value) => option.id === value.id}

                        renderInput={(params) => (
                            <TextField {...params} label="Город отправления" name='departureCity' size='small' />
                        )}
                    />
                    <Autocomplete
                        value={destinationCity}
                        options={citiesOptions}
                        getOptionLabel={option => option.value}
                        onChange={(_, value: OptionType | null) => setDestinationCity(value)}
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
                        <Alert severity='success'>Маршрут <b>{successMessage}</b> {editParams ? "обновлен" : "создан"}</Alert>
                    </Collapse>
                    <Box>
                        <Button sx={{ float: "right", ml: "20px" }} variant='contained' disabled={!!error} type='submit'>{editParams ? "Обновить" : "Добавить"}</Button>
                        <Button sx={{ float: "right" }} color='error' onClick={handleCloseModal}>Отмена</Button>
                    </Box>
                </Box>
            </form>
        </CustomModal>
    )
}
export default RouteForm