import { Grid, Icon, Link, Typography } from "@mui/material";
import type { IconeTextoProps } from "./IconeTexto.types";

const GerarTexto = (texto: React.ReactNode, link: boolean) => {
    if (!texto)
        return "--"

    if (link)
        return <Link target="_blank" href={texto as string}>{(texto as string).replace(/^https?:\/\//, "")}</Link>

    return texto

}

export const IconeTexto = ({ icon, texto, link = false }: IconeTextoProps) => {
    return (
        <Grid container sx={{ placeItems: "center" }} spacing={1}>
            <Icon color="action" fontSize="small" component={icon} />
            <Typography variant="body2">{GerarTexto(texto, link)}</Typography>
        </Grid>
    )
}