import React, {useEffect} from 'react';
import {Outlet, useNavigate} from "react-router-dom";
import UserService from "../api/UserService";
import {useAppDispatch, useAppSelector} from "../store";
import {resetUser, selectToken, setUser} from "../store/userSlice";

const RequireAuth = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const token = useAppSelector(selectToken);


    useEffect(() => {

        if (!token && !localStorage.getItem("token") && !localStorage.getItem("token")) {
            navigate("/login");
            return;
        }

        if (!token) {
            UserService.checkAuth()
                .then(result => {
                    const { token: newToken } = result.data;

                    if (localStorage.getItem("token")) {
                        localStorage.setItem("token", newToken);
                    } else {
                        sessionStorage.setItem("token", newToken);
                    }

                    dispatch(setUser(result.data));
                })
                .catch(reason => {
                    console.log(reason); // dev-log
                    localStorage.clear();
                    sessionStorage.clear();
                    dispatch(resetUser());
                    navigate("/login");
                })
        }
    }, [])

    return <Outlet/>;
};

export default RequireAuth;