import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { CorInput } from "./InputForm.types";

export const GerarEstuloInputForm = (cor: CorInput, erro: boolean = false): SxProps<Theme> => {
    return (theme) => ({
        minHeight: 40,
        typography: theme.typography.body2,
        border: '1.5px solid',
        borderColor: erro ? theme.palette.error.main : theme.palette[cor].main,
        borderRadius: 1.5,
        padding: theme.spacing(0.5, 1.5),
        backgroundColor: theme.palette.background.paper,
        transition: theme.transitions.create(["border-color", "background-color", "color", "box-shadow"], {
            duration: theme.transitions.duration.shorter,
        }),
        "&.Mui-disabled": {
            backgroundColor: theme.palette.grey[100],
            borderColor: `${theme.palette.grey[400]} !important`,
            color: theme.palette.text.primary,
            opacity: 1,
            WebkitTextFillColor: theme.palette.text.primary,
            boxShadow: `inset 0 0 0 1px ${theme.palette.grey[300]}`,
            cursor: "not-allowed",
        },
        "& .MuiInputBase-input.Mui-disabled": {
            WebkitTextFillColor: theme.palette.text.primary,
            cursor: "not-allowed",
        },
        "&.Mui-focused": {
            outlineColor: `${erro ? theme.palette.error.dark : theme.palette[cor].dark}!important`,
            outlineWidth: "0.5px",
            outlineStyle: "solid",
            borderColor: `${erro ? theme.palette.error.dark : theme.palette[cor].dark}!important`
        }
    })
}
