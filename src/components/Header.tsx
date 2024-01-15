import React from 'react';
import {AppBar, Button, IconButton, Toolbar, Typography} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import {DrawerStatusProps} from "./Layout";


const Header: React.FC<DrawerStatusProps> = (props) => {
    const { openDrawer } = props;

    return (
        <AppBar>
            <Toolbar>
                <IconButton sx={{mr: "15px"}} onClick={openDrawer}>
                    <MenuIcon/>
                </IconButton>
                <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                    CityLink
                </Typography>
                <Button variant="contained" href="/" disableElevation>Login</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;