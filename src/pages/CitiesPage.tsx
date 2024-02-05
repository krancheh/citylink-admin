import { Update } from '@mui/icons-material';
import { Box, Card, IconButton, Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useEffect, useState } from 'react';
import RoutesService from '../api/RoutesService';
import { useAppDispatch, useAppSelector } from '../store';
import { selectCities, setCities } from '../store/dataSlice';
import PageWrapper from '../components/PageWrapper';


const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "cityName", headerName: "Город", flex: 1 },
]

const CitiesPage = () => {
    const [isCitiesLoading, setIsCitiesLoading] = useState(false);
    const dispatch = useAppDispatch();
    const cities = useAppSelector(selectCities);

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
                    />
                </Card>
            </Box>
        </PageWrapper>
    )
}

export default CitiesPage;
