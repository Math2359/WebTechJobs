import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import type { SvgIconProps } from "@mui/material"
import type { ComponentType } from "react"
import { Dominios } from "@/lib/dominios"
import type { TipoNotificacao } from "@/lib/dominios/tipoNotificacao"
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';

type ConfiguracaoNotificacao = {
    Icone: ComponentType<SvgIconProps>
    obterDestino?: (idAcao: number) => {
        to: string
        params: object
    }
}

const CONFIGURACAO_PADRAO: ConfiguracaoNotificacao = {
    Icone: NotificationsNoneOutlinedIcon,
}

const CONFIGURACOES_NOTIFICACAO: Partial<Record<TipoNotificacao, ConfiguracaoNotificacao>> = {
    [Dominios.TipoNotificacao.RespostaVaga]: {
        Icone: WorkOutlineRoundedIcon,
        obterDestino: (idAcao) => ({
            to: "/candidato/vaga/$id",
            params: { id: String(idAcao) },
        }),
    },
    [Dominios.TipoNotificacao.Aplicacao]: {
        Icone: GroupAddRoundedIcon,
        obterDestino: (idAcao) => ({
            to: "/empresa/vaga/$id",
            params: {
                id: String(idAcao)
            }
        })
    }
}

export const obterConfiguracaoNotificacao = (tipo: TipoNotificacao) =>
    CONFIGURACOES_NOTIFICACAO[tipo] ?? CONFIGURACAO_PADRAO

export const COR_ITEM = {
    [Dominios.Perfil.Candidato]: {
        1: "primary",
        2: "secondary"
    },
    [Dominios.Perfil.Empresa]: {
        2: "primary",
        1: "secondary"
    },
} as const