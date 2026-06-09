import type { SvgIconProps } from "@mui/material"
import type { ComponentType } from "react"

export type ConfiguracaoNotificacao = {
    Icone: ComponentType<SvgIconProps>
    obterDestino?: (propsAdicionais: string) => {
        to: string
        params: object
    }
}