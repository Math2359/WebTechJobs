import { ButtonBase } from "@mui/material";
import type { BotaoProps } from "./Botao.types";
import * as styles from "./Botao.styles";
import { Link } from "@tanstack/react-router";

export const Botao = ({ cor = "primary", children, to, ...props }: BotaoProps) => {
    const linkProps = {
        LinkComponent: Link,
        to
    }

    return (
        <ButtonBase sx={styles.GerarEstiloBotao(cor)} {...props} {...linkProps}>
            {children}
        </ButtonBase>
    )
}