import React, { MouseEventHandler, useState } from 'react';
import { AppBar, Avatar, Box, CircularProgress, IconButton, Menu, MenuItem, Toolbar, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { DrawerStatusProps } from "./Layout";
import { useLocation, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { resetUser, selectFirstName } from "../store/userSlice";
import { NotificationsOutlined } from '@mui/icons-material';
import { addNotification } from '../store/notificationsSlice';
import { titleMap } from '../utils/constants';

type PathType = keyof typeof titleMap;

const Header: React.FC<DrawerStatusProps> = (props) => {
    const { openDrawer } = props;

    const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);
    const [notificationsMenuAnchor, setNotificationsMenuAnchor] = useState<null | HTMLElement>(null);

    const navigate = useNavigate();
    const location = useLocation();
    const firstName = useAppSelector(selectFirstName);
    const dispatch = useAppDispatch();

    const handleOpenUserMenu: MouseEventHandler<HTMLDivElement> = (e) => {
        setUserMenuAnchor(e.currentTarget);
    }

    const handleOpenNotificationsMenu: MouseEventHandler<HTMLButtonElement> = (e) => {
        dispatch(addNotification({
            notification: {
                id: Date.now(),
                title: "Добавлен маршрут",
                description: "Кирилл добавил маршрут",
                date: "12.02.2024",
                time: "12:00"
            }
        }));
        setNotificationsMenuAnchor(e.currentTarget);
    }

    const handleCloseUserMenu = () => setUserMenuAnchor(null);
    const handleCloseNotificationsMenu = () => setNotificationsMenuAnchor(null);

    const logout = () => {
        localStorage.clear();
        sessionStorage.clear();
        dispatch(resetUser());
        navigate("/login");
    }

    const UserMenu = () => {
        return (
            <Menu
                open={!!userMenuAnchor}
                anchorEl={userMenuAnchor}
                onClose={handleCloseUserMenu}
            >
                <MenuItem>Профиль</MenuItem>
                <MenuItem>Настройки</MenuItem>
                <MenuItem onClick={logout}>
                    <Typography sx={{ color: "#ff7373" }}>Выйти</Typography>
                </MenuItem>
            </Menu>
        )
    }

    const NotificationsMenu = () => {
        return (
            <Menu
                open={!!notificationsMenuAnchor}
                anchorEl={notificationsMenuAnchor}
                onClose={handleCloseNotificationsMenu}
                transformOrigin={{ horizontal: "right", vertical: "top" }}
                anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
            >
                <MenuItem>Kkakak</MenuItem>
            </Menu>
        )
    }



    return (
        <AppBar sx={{ pl: { sm: "250px", xs: "none" } }}>
            <Toolbar>
                <IconButton sx={{ mr: "15px", display: { sm: "none" } }} onClick={openDrawer}>
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                    {titleMap[location.pathname as PathType] || "Панель управления"}
                </Typography>
                <IconButton onClick={handleOpenNotificationsMenu}>
                    <NotificationsOutlined color='info' />
                </IconButton>
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
                <UserMenu />
                <NotificationsMenu />
            </Toolbar>
        </AppBar>
    );
};

export default Header;