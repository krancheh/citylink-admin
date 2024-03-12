import React, {ReactNode, useEffect} from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";
import {DrawerStatusProps} from "./Layout";
import {
    ConfirmationNumberOutlined,
    EventNoteOutlined,
    LocationCityOutlined,
    PersonSearchOutlined,
    RouteOutlined
} from "@mui/icons-material";
import {useLocation} from "react-router-dom";
import CustomLink from "./CustomLink";
import {Path} from "../utils/constants";


interface SidebarRoute {
    id: number;
    title: string;
    path: string;
    icon: ReactNode;
}

const SideBar: React.FC<DrawerStatusProps> = (props) => {
    const { isDrawerOpen, closeDrawer } = props;
    const location = useLocation();

    useEffect(() => {
        closeDrawer?.();
    }, [location])



    const sideBarRoutes: SidebarRoute[] = [
        { id: 1, title: "Текущие рейсы", path: Path.ROUTE_RECORDS, icon: <EventNoteOutlined /> },
        { id: 2, title: "Маршруты", path: Path.ROUTES, icon: <RouteOutlined /> },
        { id: 3, title: "Города", path: Path.CITIES, icon: <LocationCityOutlined /> },
        { id: 4, title: "Купленные билеты", path: Path.TICKETS, icon: <ConfirmationNumberOutlined /> },
        { id: 5, title: "Пользователи", path: Path.USERS, icon: <PersonSearchOutlined /> },
    ]

    const drawer = (
        <div style={{ width: "250px" }}>
            <Toolbar>
                <Typography variant="h6"><CustomLink to="/">CityLink</CustomLink></Typography>
            </Toolbar>
            <Divider />
            <List>
                {sideBarRoutes.map((sidebarRoute) => (
                    <CustomLink key={sidebarRoute.id} to={sidebarRoute.path} onClick={closeDrawer}>
                        <ListItem disablePadding>
                            <ListItemButton selected={location.pathname === sidebarRoute.path}>
                                <ListItemIcon sx={{ marginRight: "-20px" }}>{sidebarRoute.icon}</ListItemIcon>
                                <ListItemText>{sidebarRoute.title}</ListItemText>
                            </ListItemButton>
                        </ListItem>
                    </CustomLink>
                ))}
            </List>
        </div>
    )

    return (
        <Box component="nav">
            <Drawer open variant="permanent" sx={{ display: { xs: "none", sm: "block" } }} anchor="left">
                {drawer}
            </Drawer>
            <Drawer open={isDrawerOpen} variant="temporary" sx={{ display: { xs: "block", sm: "none" } }} anchor="left" onClose={closeDrawer}>
                {drawer}
            </Drawer>
        </Box>
    );
};

export default SideBar;