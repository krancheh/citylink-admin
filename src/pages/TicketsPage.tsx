import { Update } from '@mui/icons-material'
import { Box, Card, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { selectTickets, setTickets } from '../store/dataSlice'
import { getFormattedRoute } from '../utils/getFormattedRoute'
import { TicketData } from '../types'
import PageWrapper from '../components/PageWrapper'
import TicketsService from '../api/TicketsService'

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "passengerId", headerName: "Пассажир", width: 60 },
    { field: "departureCity", headerName: "Город отправления", flex: 0.2 },
    { field: "destinationCity", headerName: "Город прибытия", flex: 0.2 },
    { field: "departureTime", headerName: "Время отправления", flex: 0.1 },
    { field: "arrivalTime", headerName: "Время прибытия", flex: 0.1 },
    { field: "duration", headerName: "Время в пути", flex: 0.1 },
    { field: "departureDate", headerName: "Дата", flex: 0.1 },
    { field: "price", headerName: "Цена", flex: 0.1 },
    { field: "seatNo", headerName: "Место", flex: 0.1 },
    { field: "purchaseDate", headerName: "Дата покупки", flex: 0.1 },
]


const TicketsPage = () => {
    // const [paginationModel, setPaginationModel] = useState<GridPaginationModel | undefined>(undefined);
    const [isTicketsLoading, setIsTicketsLoading] = useState(false);

    const tickets = useAppSelector(selectTickets);
    const dispatch = useAppDispatch();

    const getTickets = async () => {
        setIsTicketsLoading(true);

        try {
            const response = await TicketsService.getTickets();
            const { tickets } = response.data;

            const formattedTickets = tickets.map(ticket => getFormattedRoute<TicketData>(ticket));
            dispatch(setTickets({ tickets: formattedTickets }));
        } catch (e) {
            console.log(e);
        } finally {
            setIsTicketsLoading(false);
        }
    }

    useEffect(() => {
        if (!tickets.length) getTickets();
    }, []);

    return (
        <PageWrapper>
            <Box display="flex">
                <Typography variant={"h4"}>Таблица билетов</Typography>
                <IconButton onClick={() => null}><Update /></IconButton>
            </Box>
            <Card>
                <DataGrid
                    columns={columns}
                    rows={tickets || []}
                    checkboxSelection
                    loading={isTicketsLoading}
                // pagination
                // paginationModel={paginationModel}
                // onPaginationModelChange={setPaginationModel}
                // pageSizeOptions={[15, 25]}
                />
            </Card>
        </PageWrapper>
    )
}

export default TicketsPage