import { Update } from '@mui/icons-material';
import { Box, Card, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import React, { useEffect, useState } from 'react'
import { City } from '../types';
import RoutesService from '../api/RoutesService';


const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "cityName", headerName: "Город", flex: 1 },
]

const CitiesPage = () => {
    const [cities, setCities] = useState<City[]>([]);
    const [isCitiesLoading, setIsCitiesLoading] = useState(false);

    const getCities = async () => {
        setIsCitiesLoading(true);

        const response = await RoutesService.getCities("");
        setCities(response.data.cities);

        setIsCitiesLoading(false);
    }

    useEffect(() => {
        getCities();
    }, []);

    return (
        <Box m={"0 auto"} maxWidth={"1200px"}>
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
        </Box>
    )
}

export default CitiesPage;
