import type { Theme } from "@mui/material";
import type { CorBotao } from "./Botao.types";

export const CoresBotao: Record<CorBotao, (theme: Theme) => string> = {
    primary: (theme) => theme.palette.primary.main,
    secondary: (theme) => theme.palette.secondary.main,
}