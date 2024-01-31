import React, { ReactNode, useEffect, useRef, useState } from 'react';
import { Autocomplete, Box, Button, Card, TextField, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RouteRecord, RouteRecordSearchData } from "../types";
import RoutesService from "../api/RoutesService";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { getFormattedRoute } from "../utils/getFormattedRoute";
import { useAppDispatch, useAppSelector } from "../store";
import { selectRouteRecords, setRouteRecords } from "../store/routesSlice";
import CustomAutocomplete, { OptionType } from "../components/CustomAutocomplete";




const RouteRecordsPage = () => {
    const [isRoutesLoading, setIsRoutesLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 15,
        page: 0,
    })
    const [startDate, setStartDate] = useState<number | null>(null);
    const [endDate, setEndDate] = useState(null);
    const departureCityRef = useRef<OptionType | null>(null);
    const destinationCityRef = useRef<OptionType | null>(null);

    const dispatch = useAppDispatch();
    const routeRecords = useAppSelector(selectRouteRecords);

    const params: RouteRecordSearchData = useParams();


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", hideSortIcons: true, width: 65 },
        { field: "departureCity", headerName: "Город отправления", flex: 1, minWidth: 200 },
        { field: "destinationCity", headerName: "Город прибытия", flex: 1, minWidth: 200 },
        { field: "departureTime", headerName: "Время отправления", flex: 0.5, minWidth: 100 },
        { field: "arrivalTime", headerName: "Время прибытия", flex: 0.5, minWidth: 100 },
        { field: "duration", headerName: "Время в пути", hideSortIcons: true, maxWidth: 200, minWidth: 120 },
        { field: "departureDate", headerName: "Дата", flex: 0.5, maxWidth: 150, minWidth: 100 },
        { field: "price", headerName: "Цена", flex: 0.5, maxWidth: 150, minWidth: 70 },
    ]

    const getRouteRecords = async (searchData: RouteRecordSearchData) => {
        try {
            setIsRoutesLoading(true);

            const { data: routeRecordsData } = await RoutesService.getRouteRecords(searchData);
            const formattedRouteRecords: RouteRecord[] = routeRecordsData.routes.map((routeRecordData) => getFormattedRoute(routeRecordData));

            dispatch(setRouteRecords({ routeRecords: formattedRouteRecords }));
        } catch (e) {
            console.log(e);
        } finally {
            setIsRoutesLoading(false);
        }
    }


    // --- onMount effect
    useEffect(() => {
        if (routeRecords.length === 0) {
            getRouteRecords(params);
        }
    }, [])



    const getCities = async (cityName: string) => {
        try {
            const response = await RoutesService.getCities(cityName);
            const { cities } = response.data;

            return new Promise<OptionType[] | []>((resolve) => {
                const options = cities.map(city => {
                    const option: OptionType = { id: city.id, value: city.cityName };
                    return option;
                });
                resolve(options);
            });
        } catch (e) {
            console.log(e);
            throw e;
        }
    }



    const handleSearch = () => {
        getRouteRecords({
            departureCity: departureCityRef.current?.value,
            destinationCity: destinationCityRef.current?.value,
            departureDate: startDate ? new Date(startDate).getTime() : undefined
        });
    }


    const InputWrapper: React.FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
        return (
            <Box sx={{ maxWidth: { sm: "220px", xs: "auto" }, width: "100%" }}>{children}</Box>
        )
    }

    return (
        <Box m={"0 auto"} maxWidth={"1200px"}>
            <Typography variant={"h4"}>Таблица рейсов</Typography>
            <Box display="flex" gap="10px" p="20px" flexWrap="wrap" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
                <InputWrapper>
                    <CustomAutocomplete id="departureCity" fetchNewOptions={getCities} label="Город отправления" valueRef={departureCityRef} />
                </InputWrapper>
                <InputWrapper>
                    <CustomAutocomplete id="destinationCity" fetchNewOptions={getCities} label="Город отправления" valueRef={destinationCityRef} />
                </InputWrapper>
                <InputWrapper>
                    <DatePicker label="От" slotProps={{ textField: { size: 'small', fullWidth: true } }} value={startDate} onChange={(value) => setStartDate(value)} />
                </InputWrapper>
                <InputWrapper>
                    <DatePicker label="До" slotProps={{ textField: { size: 'small', fullWidth: true } }} value={endDate} onChange={(value) => setEndDate(value)} />
                </InputWrapper>
                <Button variant={"contained"} onClick={handleSearch}>Применить</Button>
            </Box>
            <Card sx={{ maxWidth: "1200px" }}>
                <DataGrid
                    columns={columns}
                    rows={routeRecords || []}
                    sx={{ maxWidth: "1200px" }}
                    checkboxSelection
                    loading={isRoutesLoading}
                    pagination
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[15, 25]}
                />
            </Card>
        </Box>
    );
};

export default RouteRecordsPage;