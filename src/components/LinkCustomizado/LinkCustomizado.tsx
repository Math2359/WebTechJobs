import { Link } from "@mui/material";
import { createLink, type LinkComponent } from "@tanstack/react-router";
import type { LinkCustomizadoProps } from "./LinkCustomizado.types";
import * as styles from "./LinkCustomizado.styles"

const BasicNavLink = ({ cor = "primary", ...props }: LinkCustomizadoProps) => {
    return <Link sx={styles.GerarEstiloNavLink(cor)} underline="none" color="textDisabled" variant="subtitle2" {...props} />
}
const TanStackLink = createLink(BasicNavLink)

export const LinkCustomizado: LinkComponent<typeof BasicNavLink> = (props) => {
    return <TanStackLink {...props} />
}