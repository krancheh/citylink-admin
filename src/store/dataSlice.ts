import { createSlice } from "@reduxjs/toolkit";
import { City, Route, RouteRecord, Ticket, User } from "../types";
import { RootState } from "./index";

interface IState {
    routeRecords: RouteRecord[] | [];
    routes: Route[] | [];
    cities: City[] | [];
    tickets: Ticket[] | [];
    users: User[] | [];
}

const initialState: IState = {
    routeRecords: [],
    routes: [],
    cities: [],
    tickets: [],
    users: [],
}

const dataSlice = createSlice({
    name: "routes",
    initialState,
    reducers: (creators) => ({
        setRouteRecords: creators.reducer<{ routeRecords: RouteRecord[] | [] }>((state, action) => {
            state.routeRecords = action.payload.routeRecords;
        }),
        setRoutes: creators.reducer<{ routes: Route[] | [] }>((state, action) => {
            state.routes = action.payload.routes;
        }),
        setCities: creators.reducer<{ cities: City[] | [] }>((state, action) => {
            state.cities = action.payload.cities;
        }),
        setTickets: creators.reducer<{ tickets: Ticket[] | [] }>((state, action) => {
            state.tickets = action.payload.tickets;
        }),
        setUsers: creators.reducer<{ users: User[] | [] }>((state, action) => {
            state.users = action.payload.users;
        })
    })
})

export const selectRouteRecords = (state: RootState) => state.data.routeRecords;
export const selectRoutes = (state: RootState) => state.data.routes;
export const selectCities = (state: RootState) => state.data.cities;
export const selectTickets = (state: RootState) => state.data.tickets;
export const selectUsers = (state: RootState) => state.data.users;


export const { setRouteRecords, setRoutes, setCities, setTickets, setUsers } = dataSlice.actions;

export default dataSlice.reducer;