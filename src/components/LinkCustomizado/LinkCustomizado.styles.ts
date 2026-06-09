import type { SxProps, Theme } from "@mui/material";
import type { CoresLinkCustomizado } from "./LinkCustomizado.types";

export const GerarEstiloNavLink = (cor: CoresLinkCustomizado): SxProps<Theme> => {
    return (theme) => {
        const corLink = cor === "cinza" ? theme.palette.grey[700] : theme.palette[cor].main

        return {
            color: corLink,
            textDecoration: "underline",
            "&:link, &:visited, &:hover, &:active": {
                color: `${corLink}!important`
            }
        }
    }
}
