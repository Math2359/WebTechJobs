import Box from "@mui/material/Box";
import type { CardProps } from "./Card.types";
import * as styles from "./Card.styles"
import type { SxProps, Theme } from "@mui/material";

export const Card = ({ children, padding, sx }: CardProps) => {
    return (
        <Box sx={[styles.EstiloCard, { padding }, sx] as SxProps<Theme>}>
            {children}
        </Box>
    )
}