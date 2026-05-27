import type { SxProps, Theme } from "@mui/material";
import { CoresBotao } from "./Botao.utils";
import type { CorBotao } from "./Botao.types";

export const GerarEstiloBotao = (cor: CorBotao): SxProps<Theme> => {
    return (theme) => ({
        border: '1px solid',
        borderColor: CoresBotao[cor],
        padding: theme.spacing(0.7, 2.5),
        typography: theme.typography.body2,
        borderRadius: 100,
    })
}