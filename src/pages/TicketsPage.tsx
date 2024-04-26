import { Update } from '@mui/icons-material'
import { Box, Card, IconButton, Typography } from '@mui/material'
import { DataGrid, GridColDef } from '@mui/x-data-grid'
import { useEffect, useState } from 'react'
import { useAppDispatch, useAppSelector } from '../store'
import { selectTickets, setTickets } from '../store/dataSlice'
import { getFormattedRoute } from '../utils/getFormattedRoute'
import { TicketData } from '../types'
import TicketsService from '../api/services/TicketsService'
import { getFormattedDate } from '../utils/getFormattedDate'
import CustomNoRowsMessage from '../components/common/CustomNoRowsMessage'

const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 60 },
    { field: "passengerId", headerName: "Пассажир", width: 100 },
    { field: "departureCity", headerName: "Город отправления", flex: 0.2, minWidth: 180 },
    { field: "destinationCity", headerName: "Город прибытия", flex: 0.2, minWidth: 180 },
    { field: "departureTime", headerName: "Время отправления", flex: 0.1, minWidth: 150 },
    { field: "arrivalTime", headerName: "Время прибытия", flex: 0.1, minWidth: 150 },
    { field: "duration", headerName: "Время в пути", flex: 0.1, minWidth: 130 },
    { field: "departureDate", headerName: "Дата", flex: 0.1, minWidth: 150 },
    { field: "price", headerName: "Цена", flex: 0.1, minWidth: 150 },
    { field: "seatNo", headerName: "Место", flex: 0.1, minWidth: 150 },
    { field: "purchaseDate", headerName: "Дата покупки", headerAlign: "right", align: "right", flex: 0.1, minWidth: 180 },
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

            const formattedTickets = tickets.map(ticket => ({ ...getFormattedRoute<TicketData>(ticket), purchaseDate: getFormattedDate(ticket.purchaseDate) }));
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
        <Box>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица билетов</Typography>
                <IconButton onClick={() => null}><Update /></IconButton>
            </Box>
            <Card >
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={tickets || []}
                    loading={isTicketsLoading}
                    // pagination
                    // paginationModel={paginationModel}
                    // onPaginationModelChange={setPaginationModel}
                    // pageSizeOptions={[15, 25]}
                    sx={{ p: "0 15px", '--DataGrid-overlayHeight': '400px' }}
                    slots={{ noRowsOverlay: isTicketsLoading ? () => null : CustomNoRowsMessage }}
                />
            </Card>
        </Box>
    )
}

export default TicketsPage