import type { SxProps, Theme } from "@mui/material";

export const EstiloCard: SxProps<Theme> = (theme) => ({
    borderRadius: 2,
    border: "1px solid",
    borderColor: theme.palette.grey[300],
    overflow: "hidden"
})