import { Box, Card, IconButton, Typography } from "@mui/material"
import PageWrapper from "../components/containers/PageWrapper"
import { Update } from "@mui/icons-material"
import { DataGrid, GridColDef } from "@mui/x-data-grid"
import CustomNoRowsMessage from "../components/common/CustomNoRowsMessage"
import useGetBuses from "../hooks/useGetBuses"
import renderCell from "../utils/checkDataGridCell"

const BusesPage = () => {
    const { buses, isLoading } = useGetBuses();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 60, renderCell },
        { field: "model", headerName: "Модель", flex: 0.1, minWidth: 120, renderCell },
        { field: "regNumber", headerName: "Номерной знак", flex: 0.1, minWidth: 120, renderCell },
        { field: "region", headerName: "Регион", flex: 0.1, minWidth: 60, renderCell },
        { field: "seatsAmount", headerName: "Кол-во мест", flex: 0.1, minWidth: 100, renderCell },
    ]

    return (
        <PageWrapper>
            <Box display="flex" mb="20px">
                <Typography variant={"h4"}>Таблица автобусов</Typography>
                <IconButton onClick={() => null}><Update /></IconButton>
            </Box>
            <Card>
                <DataGrid
                    autoHeight
                    columns={columns}
                    rows={buses || []}
                    loading={isLoading}
                    slots={{ noRowsOverlay: isLoading ? () => null : CustomNoRowsMessage }}
                    sx={{ p: "0 15px", '--DataGrid-overlayHeight': '400px' }}
                />
            </Card>
        </PageWrapper>
    )
}
export default BusesPage