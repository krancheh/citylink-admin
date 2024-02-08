import React, { MouseEventHandler, useState } from 'react';
import { AppBar, Avatar, Box, CircularProgress, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerStatusProps } from "./Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { resetUser, selectFirstName } from "../store/userSlice";


const Header: React.FC<DrawerStatusProps> = (props) => {
    const { openDrawer } = props;

    const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const firstName = useAppSelector(selectFirstName);
    const dispatch = useAppDispatch();

    const titleMap: { [key: string]: string } = {
        "/route-records": "Текущие рейсы",
        "/routes": "Маршруты",
        "/cities": "Города",
        "/tickets": "Купленные билеты",
    }

    const handleOpenUserMenu: MouseEventHandler<HTMLDivElement> = (e) => {
        setMenuAnchor(e.currentTarget);
    }

    const handleCloseUserMenu = () => setMenuAnchor(null);
    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        dispatch(resetUser());
        navigate("/login");
    }

    return (
        <AppBar sx={{ pl: { sm: "250px", xs: "none" } }}>
            <Toolbar>
                <IconButton sx={{ mr: "15px", display: { sm: "none" } }} onClick={openDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {titleMap[location.pathname] || "Панель управления"}
                </Typography>
                <Box
                    display="flex"
                    alignItems="center"
                    gap="10px"
                    sx={{ cursor: "pointer" }}
                    onClick={handleOpenUserMenu}
                >
                    <Typography sx={{ display: { sm: "block", xs: "none" } }}>{firstName}</Typography>
                    <Avatar>{firstName ? firstName[0] : <CircularProgress />}</Avatar>
                </Box>
                <Menu
                    open={!!menuAnchor}
                    anchorEl={menuAnchor}
                    onClose={handleCloseUserMenu}
                >
                    <MenuItem>Профиль</MenuItem>
                    <MenuItem>Настройки</MenuItem>
                    <MenuItem onClick={logout}>
                        <Typography sx={{ color: "#ff7373" }}>Выйти</Typography>
                    </MenuItem>
                </Menu>
            </Toolbar>
        </AppBar>
    );
};

export default Header;