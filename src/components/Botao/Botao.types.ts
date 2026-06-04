import type { ButtonBaseProps } from "@mui/material";

export type BotaoProps = ButtonBaseProps & {
    cor?: CorBotao,
    to?: string | number
    variante?: VarianteBotao
    fullWidth?: boolean
    loading?: boolean
}

export type CorBotao = "primary" | "secondary" | "cinza"

export type VarianteBotao = "outlined" | "contained"