import type { SxProps, Theme } from "@mui/material";
import type { CorBotao } from "./Botao.types";

export const GerarEstiloBotaoOutlined = (cor: CorBotao): SxProps<Theme> => {
    return (theme) => ({
        borderColor: theme.palette[cor].main,
        color: theme.palette[cor].main,
    })
}

export const GerarEstiloBotaoContaind = (cor: CorBotao): SxProps<Theme> => {
    return (theme) => ({
        borderColor: theme.palette[cor].main,
        background: theme.palette[cor].main,
        color: theme.palette[cor].contrastText,
    })
}

export const EstiloPadrao: SxProps<Theme> = (theme) => ({
    border: '1px solid',
    padding: theme.spacing(1, 3),
    typography: theme.typography.subtitle2,
    borderRadius: 100,
    placeItems: "center",
    gap: theme.spacing(1),
})

export const EstiloDesabilitado: SxProps<Theme> = (theme) => ({
    background: theme.palette.grey[200],
    borderColor: theme.palette.grey[700]
})