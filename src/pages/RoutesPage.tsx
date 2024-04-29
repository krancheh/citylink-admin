import { Box, IconButton, Typography } from '@mui/material';
import { useState } from 'react';
import { Update } from '@mui/icons-material';
import PageWrapper from '../components/containers/PageWrapper';
import RouteForm from '../components/specific/RouteForm';
import RouteTable from '../components/specific/RouteTable';
import { setRoutes } from '../store/dataSlice';
import { useAppDispatch } from '../store';
import RoutesService from '../api/services/RoutesService';
import useSetSnackbar from '../hooks/useSetSnackbar';


const RoutesPage = () => {
    const [isRoutesFetching, setIsRoutesFetching] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const setSnackbar = useSetSnackbar();

    const dispatch = useAppDispatch();

    const getRoutes = async () => {
        setIsRoutesFetching(true);

        try {
            const response = await RoutesService.getRoutes();
            const { routes } = response.data;
            dispatch(setRoutes({ routes }));
        } catch (e: any) {
            setSnackbar({ children: e.message, severity: "error" });
        } finally {
            setIsRoutesFetching(false);
        }
    }

    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица маршрутов</Typography>
                <IconButton onClick={() => getRoutes()}><Update /></IconButton>
            </Box>
            <RouteTable getRoutes={getRoutes} isRoutesFetching={isRoutesFetching} setIsModalOpen={setIsModalOpen} />
            <RouteForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
        </PageWrapper>
    )
}

export default RoutesPage;