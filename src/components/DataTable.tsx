import React from 'react';
import {DataGrid, GridColDef, GridRowsProp} from "@mui/x-data-grid";

interface IProps {
    columns: GridColDef[];
    rows: GridRowsProp;
}

const DataTable = (props: IProps) => {
    const {columns, rows} = props;

    return (
        <DataGrid
            columns={columns}
            rows={rows}
        />
    );
};

export default DataTable;