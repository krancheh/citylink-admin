import React from 'react';
import {Box, Button, Card, Divider, Stack, Switch, TextField, Typography} from "@mui/material";
import {AccountCircleOutlined, Key} from "@mui/icons-material";

const AuthPage = () => {
    return (
        <Stack
            justifyContent="center"
            alignItems="center"
            sx={{minHeight: "100vh"}}
        >
            <Card sx={{p: "30px"}}>
                <Stack alignItems="center">
                    <Typography variant="h4">Авторизация</Typography>
                    <Typography variant="subtitle1">Войдите, чтобы использовать панель управления CityLink</Typography>
                    <Divider variant="middle" flexItem sx={{m: 2}}/>
                    <form style={{display: "flex", flexDirection: "column", gap: "20px", width: "100%"}}>
                        <Box sx={{display: "flex", alignItems: "flex-end", gap: "5px", width: "100%"}}>
                            <AccountCircleOutlined sx={{opacity: .7}} fontSize="large"/>
                            <TextField label="Номер телефона" type="tel" required placeholder="+7 (945) 983 - 23 - 57"  variant="standard" fullWidth/>
                        </Box>
                        <Box sx={{display: "flex", alignItems: "flex-end", gap: "5px", width: "100%"}}>
                            <Key sx={{opacity: .7}} fontSize="large"/>
                            <TextField label="Пароль" type="password" required placeholder="•••••••"  variant="standard" fullWidth/>
                        </Box>
                        <Switch/>
                        <Button sx={{width: "50%", alignSelf: "center"}} variant="contained">Войти</Button>
                    </form>
                </Stack>
            </Card>
        </Stack>
    );
};

export default AuthPage;