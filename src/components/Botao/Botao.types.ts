import type { ButtonBaseProps } from "@mui/material";

export type BotaoProps = ButtonBaseProps & {
    cor?: CorBotao,
    to?: string | number
}

export type CorBotao = "primary" | "secondary";