import React from 'react';
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

interface IconsType {
    [key: string]: React.ReactNode;
}

const SideBar: React.FC<DrawerStatusProps> = (props) => {
    const { isDrawerOpen, closeDrawer } = props;

    const icons: IconsType = {
        "Текущие рейсы": <EventNoteOutlined/>,
        "Маршруты": <RouteOutlined/>,
        "Города": <LocationCityOutlined/>,
        "Купленные билеты": <ConfirmationNumberOutlined/>,
    }

    const drawer = (
        <div style={{width: "250px"}}>
            <Toolbar>
                <Typography variant="h6">CityLink</Typography>
            </Toolbar>
            <Divider/>
            <List>
                {Object.keys(icons).map((text) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton>
                            <ListItemIcon sx={{marginRight: "-20px"}}>{icons[text]}</ListItemIcon>
                            <ListItemText primary={text}/>
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
        </div>
    )

    return (
        <Box component="nav">
            <Drawer open={isDrawerOpen} variant="permanent" sx={{display: {xs: "none", sm: "block"}}} anchor="left">
                {drawer}
            </Drawer>
            <Drawer open={isDrawerOpen} variant="temporary" sx={{display: {xs: "block", sm: "none"}}} anchor="left" onClose={closeDrawer}>
                {drawer}
            </Drawer>
        </Box>
    );
};

export default SideBar;