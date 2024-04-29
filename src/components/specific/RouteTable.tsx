import { Button, Card, IconButton } from "@mui/material";
import { DataGrid, GridColDef, GridRenderCellParams, GridRow, GridRowParams, GridRowProps } from "@mui/x-data-grid";
import CustomDataGridFooter from "../common/CustomDataGridFooter";
import { useAppSelector } from "../../store";
import { selectRoutes } from "../../store/dataSlice";
import { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import RouteForm from "./RouteForm";
import { EditOutlined } from "@mui/icons-material";
import { OptionType } from "../common/ServerSideAutocomplete";

interface IProps {
    isRoutesFetching: boolean;
    getRoutes: () => void;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

export interface EditParams {
    routeId: number;
    departureCity: OptionType;
    destinationCity: OptionType;
    duration: number;
}

const RouteTable = (props: IProps) => {
    const { getRoutes, isRoutesFetching, setIsModalOpen } = props;

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const [editParams, setEditParams] = useState<EditParams>();

    const routes = useAppSelector(selectRoutes);



    useEffect(() => {
        if (!routes.length) getRoutes();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", hideSortIcons: true, width: 65 },
        { field: "departureCity", headerName: "Город отправления", flex: 0.4, minWidth: 200 },
        { field: "destinationCity", headerName: "Город прибытия", flex: 0.4, minWidth: 200 },
        { field: "duration", headerName: "Время в пути", flex: 0.2, minWidth: 120 },
        {
            field: "action", headerName: "", width: 25, disableColumnMenu: true, hideSortIcons: true, renderCell: (params: GridRenderCellParams) => {
                return null;
            }
        }
    ]

    const rowStyles = {
        p: "0 15px",
        '--DataGrid-overlayHeight': '400px',
        '.row-container': {
            '&:hover .row-button': {
                display: 'block',
            },
        },
        // Скрыть кнопку по умолчанию, пока не произойдет событие наведения
        '.row-button': {
            display: 'none',
        },
    }


    const handleRowEdit = (row: any) => {
        const routeId = row?.id;

        const departureCity: OptionType = {
            id: row?.departureCityId,
            value: row?.departureCity
        }

        const destinationCity: OptionType = {
            id: row?.destinationCityId,
            value: row?.destinationCity
        }

        const duration = row?.duration;

        setEditParams({ routeId, departureCity, destinationCity, duration });
        setIsEditModalOpen(true);
    }

    return (
        <Card
            sx={{ maxWidth: "800px", width: "100%" }}
        >
            <DataGrid
                autoHeight
                columns={columns}
                rows={routes || []}
                loading={isRoutesFetching}
                slots={{
                    footer: () => (
                        <CustomDataGridFooter>
                            <Button variant='outlined' size='small' sx={{ lineHeight: { sm: "25px", xs: "13px" } }} onClick={() => setIsModalOpen(true)}>Добавить маршрут</Button>
                        </CustomDataGridFooter>
                    ),
                    row: (props: GridRowProps) => (
                        <div className="row-container" style={{ position: 'relative' }}>
                            <GridRow {...props} />
                            <IconButton
                                className="row-button"
                                style={{ position: 'absolute', top: '50%', right: 0, transform: 'translateY(-50%)' }}
                                onClick={() => handleRowEdit(props.row)}
                            >
                                <EditOutlined />
                            </IconButton>
                        </div>
                    )
                }}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                }}
                sx={rowStyles}
            />

            <RouteForm isModalOpen={isEditModalOpen} setIsModalOpen={setIsEditModalOpen} editParams={editParams} />

        </Card>
    )
}
export default RouteTable