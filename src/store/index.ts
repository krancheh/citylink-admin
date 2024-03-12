import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import dataReducer from "./dataSlice";
import notificationsReducer from "./notificationsSlice";
import { useDispatch, TypedUseSelectorHook, useSelector } from "react-redux";

const store = configureStore({
    reducer: {
        user: userReducer,
        data: dataReducer,
        notifications: notificationsReducer,
    }
})

export type RootState = ReturnType<typeof store.getState>;

type AppDispatch = typeof store.dispatch;
type DispatchFC = () => AppDispatch;

export const useAppDispatch: DispatchFC = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;