import React, { useState } from 'react';
import Header from "../common/Header";
import SideBar from "../common/SideBar";
import { Outlet } from "react-router-dom";
import { Alert, AlertProps, Box, Snackbar, Toolbar } from "@mui/material";
import { useAppDispatch, useAppSelector } from '../../store';
import { selectSnackbar, setSnackbar } from '../../store/notificationsSlice';

export interface DrawerStatusProps {
    isDrawerOpen?: boolean;
    openDrawer?: () => void;
    closeDrawer?: () => void;
}

const Layout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);
    const snackbar = useAppSelector(selectSnackbar);

    const dispatch = useAppDispatch();

    const openDrawer = () => {
        setIsDrawerOpen(true);
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    }

    const handleCloseSnackbar = () => dispatch(setSnackbar(null));

    return (
        <>
            <Header isDrawerOpen={isDrawerOpen} openDrawer={openDrawer} />
            <SideBar isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />
            <Box component="main" sx={{ ml: { sm: "250px", xs: "none" } }} p={{ sm: 3, xs: 1 }}>
                <Toolbar />
                <Outlet />
            </Box>
            {!!snackbar
                && <Snackbar
                    open
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    onClose={handleCloseSnackbar}
                    autoHideDuration={5000}
                >
                    <Alert {...snackbar} onClose={handleCloseSnackbar} />
                </Snackbar>
            }
        </>
    );
};

export default Layout;