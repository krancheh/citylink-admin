import { Update } from '@mui/icons-material';
import { Box, IconButton, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import PageWrapper from '../components/containers/PageWrapper';
import useGetCities from '../hooks/useGetCities';
import createDebounce from '../utils/createDebounce';
import { City } from '../types';
import CityForm from '../components/specific/CityForm';
import CityTable from '../components/specific/CityTable';



const CitiesPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [cityName, setCityName] = useState("");

    const { cities, setCities, isLoading } = useGetCities(cityName);

    const handleAddCity = (city: City) => {
        setCities(prev => [...prev, city]);
    }

    const debouncedSetCityName = createDebounce((cityName: string) => setCityName(cityName), 300);

    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица городов</Typography>
                <IconButton onClick={() => setCityName("")}><Update /></IconButton>
            </Box>
            <TextField
                variant='outlined'
                label='Поиск'
                size='small'
                onChange={(e) => { debouncedSetCityName(e.target.value) }}
            />
            <CityTable cities={cities} isLoading={isLoading} setIsModalOpen={setIsModalOpen} />
            <CityForm isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} handleAddCity={handleAddCity} />
        </PageWrapper>
    )
}

export default CitiesPage;
