import { ButtonBase, type SxProps, type Theme } from "@mui/material";
import type { BotaoProps } from "./Botao.types";
import { Link } from "@tanstack/react-router";
import { EstilosBotao } from "./Botao.utils";
import * as styles from "./Botao.styles"

export const Botao = ({ cor = "primary", variante = "contained", fullWidth, children, to, ...props }: BotaoProps) => {
    const linkProps = {
        LinkComponent: Link,
        to
    }

    return (
        <ButtonBase sx={[
            styles.EstiloPadrao,
            EstilosBotao[variante](cor),
            fullWidth && { width: "100%" }
        ] as SxProps<Theme>} {...props} {...linkProps}>
            {children}
        </ButtonBase>
    )
}