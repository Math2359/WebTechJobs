import { Button, ButtonBase, Link } from "@mui/material";
import type { BotaoProps } from "./Button.types";
import * as styles from "./Button.style";

export const Botao = ({ children, ...props }: BotaoProps) => {
    return (
        <ButtonBase sx={styles.BotaoStyle} {...props}>
            {children}
        </ButtonBase>
    )
}