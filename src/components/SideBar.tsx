import React, {useEffect} from 'react';
import {
    Box,
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar, Typography
} from "@mui/material";
import {DrawerStatusProps} from "./Layout";
import {
    ConfirmationNumberOutlined,
    EventNoteOutlined,
    LocationCityOutlined,
    RouteOutlined
} from "@mui/icons-material";
import {useLocation} from "react-router-dom";
import CustomLink from "./CustomLink";

interface IconsType {
    [key: string]: React.ReactNode;
}

const SideBar: React.FC<DrawerStatusProps> = (props) => {
    const { isDrawerOpen, closeDrawer } = props;
    const location = useLocation();

    useEffect(() => {
        closeDrawer?.();
    }, [location])

    const icons: IconsType = {
        "Текущие рейсы": <EventNoteOutlined/>,
        "Маршруты": <RouteOutlined/>,
        "Города": <LocationCityOutlined/>,
        "Купленные билеты": <ConfirmationNumberOutlined/>,
    }

    const pages = ["/route-records", "/routes", "/cities", "/tickets"]

    const drawer = (
        <div style={{width: "250px"}}>
            <Toolbar>
                <Typography variant="h6"><CustomLink to="/">CityLink</CustomLink></Typography>
            </Toolbar>
            <Divider/>
            <List>
                {Object.keys(icons).map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton selected={location.pathname === pages[index]}>
                            <CustomLink to={pages[index]} onClick={closeDrawer}>
                                <ListItemIcon sx={{marginRight: "-20px"}}>{icons[text]}</ListItemIcon>
                                <ListItemText>{text}</ListItemText>
                            </CustomLink>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    return (
        <Box component="nav">
            <Drawer open variant="permanent" sx={{display: {xs: "none", sm: "block"}}} anchor="left">
                {drawer}
            </Drawer>
            <Drawer open={isDrawerOpen} variant="temporary" sx={{display: {xs: "block", sm: "none"}}} anchor="left" onClose={closeDrawer}>
                {drawer}
            </Drawer>
        </Box>
    );
};

export default SideBar;