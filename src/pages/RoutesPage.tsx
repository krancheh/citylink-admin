import { Box, Card, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import RoutesService from '../api/RoutesService';
import { Update } from '@mui/icons-material';
import { useAppDispatch, useAppSelector } from '../store';
import { selectRoutes, setRoutes } from '../store/dataSlice';
import PageWrapper from '../components/PageWrapper';

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", hideSortIcons: true, width: 65 },
    { field: "departureCity", headerName: "Город отправления", flex: 0.4, minWidth: 200 },
    { field: "destinationCity", headerName: "Город прибытия", flex: 0.4, minWidth: 200 },
    { field: "duration", headerName: "Время в пути", flex: 0.2, minWidth: 120 },
]

const RoutesPage = () => {
    const [isRoutesFetching, setIsRoutesFetching] = useState(false);
    const dispatch = useAppDispatch();
    const routes = useAppSelector(selectRoutes);

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

    useEffect(() => {
        if (!routes.length) getRoutes();
    }, [])


    return (
        <PageWrapper>
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
        </PageWrapper>
    )
}

export default RoutesPage;