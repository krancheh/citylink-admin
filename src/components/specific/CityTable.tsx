import { Button, Card } from "@mui/material";
import { DataGrid, GridCellEditStopReasons, GridColDef, gridClasses } from "@mui/x-data-grid";
import CustomDataGridFooter from "../common/CustomDataGridFooter";
import { Dispatch, SetStateAction } from "react";
import { City } from "../../types";
import { cityNameValidation } from "../../utils/constants";
import CitiesService from "../../api/services/CitiesService";
import useSetSnackbar from "../../hooks/useSetSnackbar";

interface IProps {
    cities: City[];
    isLoading: boolean;
    setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}

const CityTable = (props: IProps) => {
    const { cities, isLoading, setIsModalOpen } = props;
    const setSnackbarError = useSetSnackbar();

    const columns: GridColDef[] = [
        { field: "id", headerName: "ID", width: 60 },
        { field: "cityName", headerName: "Город", flex: 1, editable: true },
        // {
        //     field: "action",
        //     headerName: "",
        //     hideSortIcons: true,
        //     disableColumnMenu: true,
        //     sortable: false,
        //     align: "right",
        //     renderCell: (params) => {
        //         const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
        //             e.stopPropagation(); // don't select this row after clicking
        //             console.log(params);

        //         };

        //         return (
        //             <IconButton onClick={onClick}><MoreHorizOutlined /></IconButton>
        //         )
        //     }
        // }
    ]

    const handleUpdateCity = async (newCity: City, originalCity: City) => {
        console.log(newCity.cityName);
        if (newCity.cityName === originalCity.cityName) {
            return originalCity;
        }

        if (cityNameValidation.test(newCity.cityName)) {
            try {
                const response = await CitiesService.updateCity(newCity);
                if (response.data.city.cityName) {
                    return response.data.city;
                }
            } catch (error) {
                throw new Error("Failed to update city");
            }
        } else {
            throw new Error("Некорректное название города");
        }

        throw new Error("Что то пошло не так");
    }

    const handleUpdateCityError = (error: Error) => {
        setSnackbarError({ children: error.message, severity: "error" })
    }

    return (
        <Card style={{ width: "100%", marginTop: "20px" }}>
            <DataGrid
                columns={columns}
                rows={cities || []}
                loading={isLoading}
                slots={{
                    footer: () => (
                        <CustomDataGridFooter>
                            <Button variant='outlined' size='small' sx={{ lineHeight: { sm: "25px", xs: "13px" } }} onClick={() => setIsModalOpen(true)}>Добавить город</Button>
                        </CustomDataGridFooter>
                    )
                }}
                onCellEditStop={(params, event) => {
                    if (params.reason === GridCellEditStopReasons.cellFocusOut) {
                        event.defaultMuiPrevented = true;
                    }
                }}
                processRowUpdate={handleUpdateCity}
                onProcessRowUpdateError={handleUpdateCityError}
                initialState={{
                    sorting: {
                        sortModel: [{ field: 'id', sort: 'asc' }],
                    },
                }}
                sx={{
                    p: "0px 15px",
                    [`& .${gridClasses.cell}:focus, & .${gridClasses.cell}:focus-within`]: {
                        outline: 'none',
                    },
                    [`& .${gridClasses.columnHeader}:focus, & .${gridClasses.columnHeader}:focus-within`]:
                    {
                        outline: 'none',
                    },
                    '--DataGrid-overlayHeight': '300px'
                }}
            />
        </Card>
    )
}
export default CityTable