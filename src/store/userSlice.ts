import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "./index";

interface IState {
    name: string;
    token: string;
    role: string;
}

const initialState: IState = {
    name: "",
    token: "",
    role: "",
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: (creators) => ({
        setUser: creators.reducer<IState>((state, action) => {
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.role = action.payload.role;
        }),
        resetUser: creators.reducer((state) => {
            state.name = "";
            state.role = "";
            state.token = "";
        })
    })
})

export const selectToken = (state: RootState) => {
    return state.user.token;
}

export const selectFirstName = (state: RootState) => {
    return state.user.name;
}

export const {
    setUser,
    resetUser,
} = userSlice.actions;

export default userSlice.reducer;