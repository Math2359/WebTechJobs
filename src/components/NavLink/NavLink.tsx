import { Link } from "@mui/material";
import type { NavLinkProps } from "./NavLink.types";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import * as styles from "./NavLink.styles";

const BasicNavLink = ({ ...props }: NavLinkProps) => {
    return <Link underline="none" color="textDisabled" variant="body2" {...props} />
}
const TanStackLink = createLink(BasicNavLink)

export const NavLink: LinkComponent<typeof BasicNavLink> = (props) => {
    return <TanStackLink activeProps={{ sx: styles.GerarEstiloNavLink(props.underLineColor ?? "primary") }} {...props} />
}