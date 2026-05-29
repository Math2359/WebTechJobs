import { createTheme } from "@mui/material";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#5E93AD",
        },
        secondary: {
            main: "#FF9900",
            contrastText: "white"
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
        h4: {
            textAlign: "center",
        }
    }
})