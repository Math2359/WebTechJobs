import { Breadcrumbs, Typography } from "@mui/material"
import HomeRoundedIcon from "@mui/icons-material/HomeRounded"
import { useLocation } from "@tanstack/react-router"
import { LinkCustomizado } from "@/components/LinkCustomizado/LinkCustomizado"
import { obterConfiguracaoBreadcrumb } from "./Breadcrumb.utils"
import type { BreadcrumbProps } from "./Breadcrumb.types"

export const Breadcrumb = ({ rotaInicial: rotaInicialPerfil }: BreadcrumbProps) => {
    const pathname = useLocation({ select: (location) => location.pathname })
    const { itens, rotaInicial } = obterConfiguracaoBreadcrumb(pathname)

    if (!itens.length) return null

    return (
        <Breadcrumbs>
            <LinkCustomizado cor="cinza" to={rotaInicialPerfil ?? rotaInicial} aria-label="Início">
                <HomeRoundedIcon fontSize="small" sx={{ display: "block" }} />
            </LinkCustomizado>

            {itens.map((item, index) => {
                const itemAtual = index === itens.length - 1

                if (!itemAtual && item.to) {
                    return (
                        <LinkCustomizado key={`${item.label}-${item.to}`} cor="cinza" to={item.to}>
                            {item.label}
                        </LinkCustomizado>
                    )
                }

                return (
                    <Typography key={item.label} variant="body2">
                        {item.label}
                    </Typography>
                )
            })}
        </Breadcrumbs>
    )
}
