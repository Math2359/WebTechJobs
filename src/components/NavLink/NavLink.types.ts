import type { LinkBaseProps } from "@mui/material";

export type NavLinkProps = LinkBaseProps & {
    underLineColor?: CoresNavLink
}

export type CoresNavLink = "primary" | "secondary"