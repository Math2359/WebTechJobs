import type { SxProps, Theme } from "@mui/material";

export const ActiveNavLinkStyle: SxProps<Theme> = (theme) => ({
    color: theme.palette.text.primary,
    textDecoration: "underline",
    textDecorationColor: theme.palette.secondary.main,
    textDecorationThickness: 1.2,
    textUnderlineOffset: 6,
});