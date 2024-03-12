import { DataGrid, DataGridProps } from '@mui/x-data-grid'
import React from 'react'
import CustomNoRowsMessage from './CustomNoRowsMessage'


const CustomDataGrid = (props: DataGridProps) => {
    const { loading } = props;

    return (
        <DataGrid
            {...props}
            checkboxSelection
            pageSizeOptions={[15, 25]}
            paginationMode='server'
            slots={{ noRowsOverlay: loading ? () => <p>Загрузка</p> : CustomNoRowsMessage, ...props.slots }}
            sx={{ p: "0 15px" }}
        />
    )
}

export default CustomDataGrid