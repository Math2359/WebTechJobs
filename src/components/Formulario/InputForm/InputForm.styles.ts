import type { SxProps } from "@mui/material";
import type { Theme } from "@mui/material/styles";

export const EstuloInputForm: SxProps<Theme> = (theme) => ({
    height: 40,
    border: '1.5px solid',
    borderColor: theme.palette.primary.main,
    borderRadius: 2.5,
    padding: theme.spacing(0, 1.5),
})