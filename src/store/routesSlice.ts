import {createSlice} from "@reduxjs/toolkit";
import {RouteRecord} from "../types";
import {RootState} from "./index";

interface IState {
    routeRecords: RouteRecord[] | [] ;
}

const initialState: IState = {
    routeRecords: []
}

const routesSlice = createSlice({
    name: "routes",
    initialState,
    reducers: (creators) => ({
        setRouteRecords: creators.reducer<IState>((state, action) => {
            state.routeRecords = action.payload.routeRecords;
        })
    })
})

export const selectRouteRecords = (state: RootState) => state.routes.routeRecords;


export const { setRouteRecords } = routesSlice.actions;

export default routesSlice.reducer;