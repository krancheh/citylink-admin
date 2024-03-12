import { createSlice } from "@reduxjs/toolkit";
import { Notification } from "../types";

interface IState {
    notifications: Notification[] | [];
}

const initialState: IState = {
    notifications: [],
}



const notificationsSlice = createSlice({
    name: "notifications",
    initialState,
    reducers: creators => ({
        addNotification: creators.reducer<{ notification: Notification }>((state, action) => {
            const { notification } = action.payload;
            state.notifications = [...state.notifications, notification];
        })
    })
})


export const { addNotification } = notificationsSlice.actions;


export default notificationsSlice.reducer;