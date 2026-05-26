import { Link } from "@mui/material";
import type { NavLinkProps } from "./NavLink.types";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import * as styles from "./NavLink.style";

const BasicNavLink = ({ ...props }: NavLinkProps) => {
    return <Link underline="none" color="textDisabled" {...props} />
}
const TanStackLink = createLink(BasicNavLink)

export const NavLink: LinkComponent<typeof BasicNavLink> = (props) => {
    return <TanStackLink activeProps={{ sx: styles.ActiveNavLinkStyle }} {...props} />
}