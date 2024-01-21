import {createSlice} from "@reduxjs/toolkit";


const userSlice = createSlice({
    name: "user",
    initialState: {
        name: "",
        token: "",
        role: "",
    },
    reducers: (creators) => ({
        setUser: creators.reducer<{name: string; token: string; role: string}>((state, action) => {
            state.name = action.payload.name;
            state.token = action.payload.token;
            state.role = action.payload.role;
            console.log(action.payload)
            console.log('dispatched setUser')
        })
    })
})

export const {
     setUser
} = userSlice.actions;

export default userSlice.reducer;