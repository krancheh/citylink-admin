import React, { useState } from 'react';
import Header from "./Header";
import SideBar from "./SideBar";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";

export interface DrawerStatusProps {
    isDrawerOpen?: boolean;
    openDrawer?: () => void;
    closeDrawer?: () => void;
}

const Layout = () => {
    const [isDrawerOpen, setIsDrawerOpen] = useState(false);

    const openDrawer = () => {
        setIsDrawerOpen(true);
    }

    const closeDrawer = () => {
        setIsDrawerOpen(false);
    }

    return (
        <>
            <Header isDrawerOpen={isDrawerOpen} openDrawer={openDrawer} />
            <SideBar isDrawerOpen={isDrawerOpen} closeDrawer={closeDrawer} />
            <Box component="main" sx={{ ml: { sm: "250px", xs: "none" } }} p={{ sm: 3, xs: 1 }}>
                <Toolbar />
                <Outlet />
            </Box>
        </>
    );
};

export default Layout;