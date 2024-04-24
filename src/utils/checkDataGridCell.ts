import { GridRenderCellParams } from "@mui/x-data-grid";

const renderCell = (params: GridRenderCellParams) => params.value || "–";

export default renderCell;
