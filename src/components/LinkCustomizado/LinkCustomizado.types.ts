import type { LinkBaseProps } from "@mui/material";

export type LinkCustomizadoProps = LinkBaseProps & {
    cor?: CoresLinkCustomizado
}

export type CoresLinkCustomizado = "primary" | "secondary" | "cinza"
