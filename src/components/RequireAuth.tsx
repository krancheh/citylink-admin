import React, {useEffect, useState} from 'react';
import {useLocation} from "react-router-dom";
import UserService from "../api/UserService";
import {Backdrop, CircularProgress} from "@mui/material";
import {useAppDispatch} from "../store";
import {setUser} from "../store/userSlice";

const RequireAuth = () => {
    const location = useLocation();
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
        setIsLoading(true);
        UserService.checkAuth()
            .then(result => {
                const { token } = result.data;

                if (localStorage.getItem("token")) {
                    localStorage.setItem("token", token);
                } else {
                    sessionStorage.setItem("token", token);
                }
                dispatch(setUser(result.data));
            })
            .catch(reason => {
                console.log(reason);
                localStorage.clear();
                sessionStorage.clear();
                dispatch(setUser({token: "", name: "", role: ""}));
            })
            .finally(() => setIsLoading(false))
    }, [location])

    return isLoading
        ? <Backdrop open={isLoading}><CircularProgress/></Backdrop>
        : null
};

export default RequireAuth;