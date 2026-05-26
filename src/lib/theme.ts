import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#5E93AD",
        },
        secondary: {
            main: "#FF9900"
        },
        grey: {
            "700": "#686868"
        },
        text: {
            primary: "#000000",
            secondary: "#686868",
            disabled: "#686868",
        },
    },
    typography: {
        fontFamily: "Montserrat, sans-serif",
    }
})