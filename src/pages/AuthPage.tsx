import { ChangeEventHandler, FocusEventHandler, FormEventHandler, useEffect, useState } from 'react';
import {
    Alert,
    Avatar, Backdrop,
    Box,
    Button, Collapse,
    CssBaseline,
    FormControlLabel, FormGroup, Grow, IconButton, InputAdornment, LinearProgress,
    Paper,
    Stack,
    Switch,
    TextField, Tooltip,
    Typography
} from "@mui/material";
import {
    AccountCircleOutlined, CloseOutlined,
    Key,
    LockOutlined,
    VisibilityOffOutlined,
    VisibilityOutlined,
} from "@mui/icons-material";
import UserService from "../api/UserService";
import { AuthData } from "../types";
import { Navigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store";
import { selectToken, setUser } from "../store/userSlice";

const AuthPage = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [phoneNumberError, setPhoneNumberError] = useState("");

    const [password, setPassword] = useState("");
    const [passwordError, setPasswordError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const [toRemember, setToRemember] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const dispatch = useAppDispatch();
    const token = useAppSelector(selectToken);

    useEffect(() => {
        setPhoneNumberError("");
        setPasswordError("");
        setErrorMessage("");
    }, [phoneNumber, password])

    const submitAuthData: FormEventHandler = async (e) => {
        e.preventDefault();

        if (phoneNumberError || passwordError) {
            return setErrorMessage("Заполните все поля");
        }

        try {
            const authData: AuthData = { phoneNumber: phoneNumber.replace(/\D/g, ''), password };
            setIsLoading(true);
            const response = await UserService.login(authData);
            const { data } = response;

            // Remember me
            toRemember
                ? localStorage.setItem("token", response.data.token)
                : sessionStorage.setItem("token", response.data.token);

            dispatch(setUser(data));
            setIsSuccess(true);
        }
        catch (err: any) {
            const { message } = err;
            if (message) {
                setErrorMessage(message);
            }
        }
        finally {
            setIsLoading(false);
        }
    }

    const checkPhoneNumber: FocusEventHandler<HTMLInputElement> = (e) => {
        const phoneNumber = e.target.value.replace(/\D/g, "");

        if (!phoneNumber) return setPhoneNumberError("Введите номер телефона");
        if (phoneNumber.length !== 11) return setPhoneNumberError("Некорректный номер телефона");

        return setPhoneNumberError("");
    }
    const checkPassword: FocusEventHandler<HTMLInputElement> = (e) => {
        const password = e.target.value;

        if (!password) return setPasswordError("Введите пароль");

        return setPasswordError("");
    }

    const handlePhoneNumberInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        let inputValue = e.target.value.replace(/\D/g, '');

        if (inputValue.length > 0) {
            if (inputValue.length === 1 && inputValue !== "7") {
                inputValue = "7" + inputValue[0];
            }
            const formattedValue = (inputValue.length > 1 ? '+7 (' : "") + inputValue.slice(1, 4) + (inputValue.length > 4 ? ') ' : "") +
                inputValue.slice(4, 7) + (inputValue.length > 7 ? ' - ' : "") +
                inputValue.slice(7, 9) + (inputValue.length > 9 ? ' - ' : "") +
                inputValue.slice(9, 11);

            setPhoneNumber(formattedValue);
        }
    }
    const handlePasswordInput: ChangeEventHandler<HTMLInputElement> = (e) => {
        const password = e.target.value;

        setPassword(password);
    }

    const handleShowPassword = () => setShowPassword(show => !show);
    const clearPhoneNumberInput = () => setPhoneNumber("");

    if (token || isSuccess || localStorage.getItem("token") || sessionStorage.getItem("token")) {
        return <Navigate to="/" />
    }

    return (
        <main
            style={{ width: "auto" }}
        >
            <CssBaseline />
            <Paper variant="outlined" sx={{ m: "70px auto", p: "30px", maxWidth: "450px", display: "block", position: "relative" }}>
                <Stack alignItems="center">
                    <Avatar sx={theme => ({ bgcolor: theme.palette.primary.main, mb: "10px" })}>
                        <LockOutlined />
                    </Avatar>
                    <Typography variant="h5" sx={{ mb: "30px" }}>Авторизация</Typography>
                    <form style={{ width: "100%" }} onSubmit={submitAuthData}>
                        <FormGroup sx={{ display: "flex", flexDirection: "column", gap: "25px" }}>
                            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "5px", width: "100%" }}>
                                <AccountCircleOutlined sx={{ opacity: .7 }} fontSize="large" />
                                <TextField
                                    autoFocus
                                    label="Номер телефона"
                                    type="tel"
                                    required
                                    placeholder="+7 (945) 983 - 23 - 57"
                                    variant="standard"
                                    fullWidth
                                    autoComplete="tel"
                                    onBlur={checkPhoneNumber}
                                    onChange={handlePhoneNumberInput}
                                    value={phoneNumber}
                                    error={!!phoneNumberError}
                                    helperText={phoneNumberError}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton onClick={clearPhoneNumberInput}>
                                                <CloseOutlined />
                                            </IconButton>)
                                    }}
                                />
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "flex-end", gap: "5px", width: "100%" }}>
                                <Key sx={{ opacity: .7 }} fontSize="large" />
                                <TextField
                                    label="Пароль"
                                    type={showPassword ? "text" : "password"}
                                    required
                                    placeholder="•••••••"
                                    variant="standard"
                                    fullWidth
                                    autoComplete="current-password"
                                    onBlur={checkPassword}
                                    onChange={handlePasswordInput}
                                    value={password}
                                    error={!!passwordError}
                                    helperText={passwordError}
                                    InputProps={{
                                        endAdornment:
                                            <InputAdornment position={"end"}>
                                                <Tooltip title="Показать пароль" arrow>
                                                    <IconButton onClick={handleShowPassword}>
                                                        {showPassword ? <VisibilityOffOutlined /> : <VisibilityOutlined />}
                                                    </IconButton>
                                                </Tooltip>
                                            </InputAdornment>
                                    }}
                                />
                            </Box>
                            <FormControlLabel
                                onChange={() => setToRemember(prevState => !prevState)}
                                control={<Switch />}
                                label="Запомнить"
                            />
                            <Collapse in={!!errorMessage}>
                                <Alert severity="error">{errorMessage}</Alert>
                            </Collapse>
                            <Button
                                sx={{ width: "50%", alignSelf: "center", mt: "10px" }}
                                variant="contained"
                                type="submit"
                            >
                                Войти
                            </Button>
                        </FormGroup>
                    </form>
                </Stack>
                <Grow in={isLoading}>
                    <LinearProgress sx={{ position: "absolute", bottom: 0, left: 0, width: "100%", borderBottomLeftRadius: "inherit", borderBottomRightRadius: "inherit" }} />
                </Grow>
            </Paper>
            <Backdrop open={isLoading} />
        </main>
    );
};

export default AuthPage;