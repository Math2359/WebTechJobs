import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";
import type { CorInput } from "./InputForm.types";

export const GerarEstuloInputForm = (cor: CorInput, erro: boolean = false): SxProps<Theme> => {
    return (theme) => ({
        height: 40,
        typography: theme.typography.body2,
        border: '1.5px solid',
        borderColor: erro ? theme.palette.error.main : theme.palette[cor].main,
        borderRadius: 2.5,
        padding: theme.spacing(0, 1.5),
        "&.Mui-focused": {
            borderColor: `${erro ? theme.palette.error.dark : theme.palette[cor].dark}!important`,
            border: "2px solid"
        }
    })
}