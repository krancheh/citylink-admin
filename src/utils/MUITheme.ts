import { createTheme, Theme } from "@mui/material";




const theme: Theme = createTheme({
    palette: {
        background: {
            default: "#f8f8f8"
        },
        primary: {
            main: "#3C9379"
        },
        secondary: {
            main: "#101913"
        },
        info: {
            main: "#f8f8f8"
        }
    },
    components: {
        MuiDrawer: {
            styleOverrides: {
                paper: {
                    backgroundColor: "#f8f8f8"
                }
            }
        }
    }
});

export default theme;