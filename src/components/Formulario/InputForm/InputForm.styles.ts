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
        "&.Mui-focused": {
            outlineColor: `${erro ? theme.palette.error.dark : theme.palette[cor].dark}!important`,
            outlineWidth: "0.5px",
            outlineStyle: "solid",
            borderColor: `${erro ? theme.palette.error.dark : theme.palette[cor].dark}!important`
        }
    })
}