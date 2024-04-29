import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../types";
import { AlertProps } from "@mui/material";
import { RootState } from ".";


export type SnackbarType = Pick<AlertProps, 'children' | 'severity'> | null;
interface IState {
    notifications: Notification[] | [];
    snackbar: SnackbarType;
}

const initialState: IState = {
    notifications: [],
    snackbar: null,
}



const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: creators => ({
        addNotification: creators.reducer<Notification>((state, action) => {
            state.notifications = [...state.notifications, action.payload];
        }),
        setSnackbar: creators.reducer<SnackbarType>((state, action) => {
            state.snackbar = action.payload;
        })
    })
})

export const selectSnackbar = (state: RootState) => state.notifications.snackbar;
export const { addNotification, setSnackbar } = notificationsSlice.actions;


export default notificationsSlice.reducer;