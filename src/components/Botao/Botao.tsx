import { ButtonBase, type SxProps, type Theme } from "@mui/material";
import type { BotaoProps } from "./Botao.types";
import { Link } from "@tanstack/react-router";
import { EstilosBotao } from "./Botao.utils";
import * as styles from "./Botao.styles"
import { motion } from "motion/react"
import { LoaderIcon } from "@/assets";

const AnimacaoLoading = () => {
    return (
        <motion.div
            style={{
                display: "flex",
                alignItems: "center"
            }}
            animate={{ 
                rotate: 360,
                transition: { duration: 1.5, ease: "linear", repeat: Infinity }
            }}>
            <LoaderIcon />
        </motion.div>
    )
}

export const Botao = ({ cor = "primary", loading = false, sx, variante = "contained", fullWidth, children, to, ...props }: BotaoProps) => {
    const linkProps = {
        LinkComponent: Link,
        to
    }

    return (
        <ButtonBase disabled={loading} sx={[
            styles.EstiloPadrao,
            (loading || props.disabled) ? styles.EstiloDesabilitado : EstilosBotao[variante](cor),
            fullWidth && { width: "100%" },
            sx
        ] as SxProps<Theme>} {...props} {...linkProps}>
            {loading ? <AnimacaoLoading />
                : children
            }
        </ButtonBase>
    )
}