import type { SxProps, Theme } from "@mui/material";
import type { CoresLinkCustomizado } from "./LinkCustomizado.types";

export const GerarEstiloNavLink = (cor: CoresLinkCustomizado): SxProps<Theme> => {
    return (theme) => ({
        color: theme.palette[cor].main,
        textDecoration: "underline",
        "&:link, &:visited, &:hover, &:active": {
            color: `${theme.palette[cor].main}!important`
        }
    })
}