import type { SxProps, Theme } from "@mui/material";
import type { CorBotao, VarianteBotao } from "./Botao.types";
import { GerarEstiloBotaoOutlined, GerarEstiloBotaoContaind } from "./Botao.styles";

export const EstilosBotao: Record<VarianteBotao, (cor: CorBotao) => SxProps<Theme>> = {
    contained: GerarEstiloBotaoContaind,
    outlined: GerarEstiloBotaoOutlined,
}