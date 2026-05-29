import type { SxProps, Theme } from "@mui/material";
import type { CoresNavLink } from "./NavLink.types";

export const GerarEstiloNavLink = (cor: CoresNavLink): SxProps<Theme> => {
    return (theme) => ({
        color: theme.palette.text.primary,
        textDecoration: "underline",
        textDecorationColor: theme.palette[cor].main,
        textDecorationThickness: 1.2,
        textUnderlineOffset: 6,
    })
}