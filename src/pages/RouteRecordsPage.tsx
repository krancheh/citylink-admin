import React, { ReactNode, useCallback, useEffect, useState } from 'react';
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { RouteRecord, RouteRecordSearchData } from "../types";
import RoutesService from "../api/RoutesService";
import { useParams } from "react-router-dom";
import { DatePicker } from "@mui/x-date-pickers";
import { getFormattedRoute } from "../utils/getFormattedRoute";
import { useAppDispatch, useAppSelector } from "../store";
import { selectRouteRecords, setRouteRecords } from "../store/dataSlice";
import CustomAutocomplete, { OptionType } from "../components/CustomAutocomplete";
import { SwapHorizOutlined, Update } from '@mui/icons-material';
import PageWrapper from '../components/PageWrapper';
import CustomNoRowsMessage from '../components/CustomNoRowsMessage';




export const getCities = async (cityName: string) => {
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



const RouteRecordsPage = () => {
    const [isRoutesLoading, setIsRoutesLoading] = useState(false);
    const [paginationModel, setPaginationModel] = useState({
        pageSize: 15,
        page: 0,
    })
    const [rowCount, setRowCount] = useState(0);
    const [startDate, setStartDate] = useState<number | null>(null);
    const [endDate, setEndDate] = useState(null);
    const [departureCity, setDepartureCity] = useState<OptionType | null>(null);
    const [destinationCity, setDestinationCity] = useState<OptionType | null>(null);
    const [searchParams, setSearchParams] = useState<RouteRecordSearchData>(
        Object.assign(
            useParams(),
            { numberEntries: paginationModel.pageSize, pageNumber: paginationModel.page }
        )
    );

    const dispatch = useAppDispatch();
    const routeRecords = useAppSelector(selectRouteRecords);


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
            const { countRecords } = routeRecordsData;
            console.log(countRecords);

            setRowCount(countRecords);

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
            getRouteRecords(searchParams);
        }
    }, [])

    useEffect(() => {
        setRowCount((prevRowCountState) =>
            rowCount !== undefined ? rowCount : prevRowCountState,
        );
    }, [rowCount, setRowCount]);

    useEffect(() => {
        setSearchParams({
            departureCity: departureCity?.value,
            destinationCity: destinationCity?.value,
            departureDate: startDate ? new Date(startDate).getTime() : undefined,
            pageNumber: paginationModel.page,
            numberEntries: paginationModel.pageSize
        })
        getRouteRecords(searchParams);
    }, [paginationModel])


    const memoGetCities = useCallback(getCities, []);


    const handleSearch = () => {
        setPaginationModel((prevState) => ({
            pageSize: prevState.pageSize,
            page: 0,
        }))

        getRouteRecords(searchParams);
    }


    const InputWrapper: React.FC<{ children: ReactNode | ReactNode[] }> = ({ children }) => {
        return (
            <Box sx={{ maxWidth: { sm: "220px", xs: "auto" }, width: "100%" }}>{children}</Box>
        )
    }

    return (
        <PageWrapper>
            <Box display="flex">
                <Typography variant={"h4"}>Таблица рейсов</Typography>
                <IconButton onClick={() => handleSearch()}><Update /></IconButton>
            </Box>
            <Box display="flex" gap="10px" p="20px" flexWrap="wrap" sx={{ flexDirection: { xs: "column", sm: "row" } }}>
                <InputWrapper>
                    <CustomAutocomplete id="departureCity" fetchNewOptions={memoGetCities} label="Город отправления" value={departureCity} setValue={setDepartureCity} />
                </InputWrapper>
                <IconButton onClick={() => {
                    const temp = departureCity;
                    setDepartureCity(destinationCity);
                    setDestinationCity(temp);
                }}>
                    <SwapHorizOutlined />
                </IconButton>
                <InputWrapper>
                    <CustomAutocomplete id="destinationCity" fetchNewOptions={memoGetCities} label="Город отправления" value={destinationCity} setValue={setDestinationCity} />
                </InputWrapper>
                <InputWrapper>
                    <DatePicker label="От" slotProps={{ textField: { size: 'small', fullWidth: true } }} value={startDate} onChange={(value) => setStartDate(value)} />
                </InputWrapper>
                <InputWrapper>
                    <DatePicker label="До" slotProps={{ textField: { size: 'small', fullWidth: true } }} value={endDate} onChange={(value) => setEndDate(value)} />
                </InputWrapper>
                <Button variant={"contained"} onClick={handleSearch}>Применить</Button>
            </Box>
            <Card sx={{ height: "500px" }}>
                <DataGrid
                    columns={columns}
                    rows={routeRecords || []}
                    checkboxSelection
                    loading={isRoutesLoading}
                    pagination
                    paginationModel={paginationModel}
                    onPaginationModelChange={setPaginationModel}
                    pageSizeOptions={[15, 25]}
                    paginationMode='server'
                    rowCount={rowCount}
                    slots={{ noRowsOverlay: isRoutesLoading ? () => <p>Загрузка</p> : CustomNoRowsMessage }}
                />
            </Card>
        </PageWrapper>
    );
};

export default RouteRecordsPage;