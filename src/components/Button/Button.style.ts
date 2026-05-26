import type { SxProps, Theme } from "@mui/material";

export const BotaoStyle: SxProps<Theme> = (theme) => ({
    border: '1px solid',
    borderColor: theme.palette.secondary.main,
    padding: theme.spacing(0.7, 2.5),
    typography: theme.typography.body1,
    borderRadius: 100,
})