import { Box, Card, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import React, { useEffect, useState } from 'react'
import RoutesService from '../api/RoutesService';
import { Route } from '../types';
import { Update } from '@mui/icons-material';

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", hideSortIcons: true, width: 65 },
    { field: "departureCity", headerName: "Город отправления", flex: 0.4, minWidth: 200 },
    { field: "destinationCity", headerName: "Город прибытия", flex: 0.4, minWidth: 200 },
    { field: "duration", headerName: "Время в пути", flex: 0.2, minWidth: 120 },
]

const RoutesPage = () => {
    const [routes, setRoutes] = useState<Route[]>([]);
    const [isRoutesFetching, setIsRoutesFetching] = useState(false);

    const getRoutes = async () => {
        setIsRoutesFetching(true);
        const response = await RoutesService.getRoutes();

        setRoutes(response.data.routes);
        setIsRoutesFetching(false);
    }

    useEffect(() => {
        getRoutes();
    }, [])


    return (
        <Box maxWidth="1200px" m="0 auto">
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица маршрутов</Typography>
                <IconButton onClick={() => getRoutes()}><Update /></IconButton>
            </Box>
            <Box display="flex" flexDirection="row">
                <Card>
                    <DataGrid
                        columns={columns}
                        rows={routes || []}
                        checkboxSelection
                        loading={isRoutesFetching}
                    />
                </Card>
            </Box>
        </Box>
    )
}

export default RoutesPage;