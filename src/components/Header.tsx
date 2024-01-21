import React from 'react';
import {AppBar, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {DrawerStatusProps} from "./Layout";
import {useLocation} from "react-router-dom";


const Header: React.FC<DrawerStatusProps> = (props) => {
    const { openDrawer } = props;
    const location = useLocation();
    const titleMap: {[key: string]: string} = {
        "/route-records": "Текущие рейсы",
        "/routes": "Маршруты",
        "/cities": "Города",
        "/tickets": "Купленные билеты",
    }

    return (
        <AppBar sx={{pl: {sm: "250px", xs: "none"}}}>
            <Toolbar>
                <IconButton sx={{mr: "15px", display: {sm: "none"}}} onClick={openDrawer}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    {titleMap[location.pathname] || "Панель управления"}
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

export default Header;