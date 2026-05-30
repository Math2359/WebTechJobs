import { ButtonBase, type SxProps, type Theme } from "@mui/material";
import type { BotaoProps } from "./Botao.types";
import { Link } from "@tanstack/react-router";
import { EstilosBotao } from "./Botao.utils";
import * as styles from "./Botao.styles"
import CachedRoundedIcon from '@mui/icons-material/CachedRounded';

export const Botao = ({ cor = "primary", loading = false, variante = "contained", fullWidth, children, to, ...props }: BotaoProps) => {
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
            {loading ? <CachedRoundedIcon /> : children}
        </ButtonBase>
    )
}