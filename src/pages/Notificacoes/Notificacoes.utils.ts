import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded"
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined"
import { Dominios } from "@/lib/dominios"
import type { TipoNotificacao } from "@/lib/dominios/tipoNotificacao"
import GroupAddRoundedIcon from '@mui/icons-material/GroupAddRounded';
import type { ConfiguracaoNotificacao } from "./Notificacoes.types"

const CONFIGURACAO_PADRAO: ConfiguracaoNotificacao = {
    Icone: NotificationsNoneOutlinedIcon,
}

const CONFIGURACOES_NOTIFICACAO: Partial<Record<TipoNotificacao, ConfiguracaoNotificacao>> = {
    [Dominios.TipoNotificacao.RespostaVaga]: {
        Icone: WorkOutlineRoundedIcon,
        obterDestino: (idVaga) => ({
            to: "/candidato/vaga/$id",
            params: { id: idVaga },
        }),
    },
    [Dominios.TipoNotificacao.Aplicacao]: {
        Icone: GroupAddRoundedIcon,
        obterDestino: (propsAdicionais) => {
            const props = JSON.parse(propsAdicionais) as { idVaga: number, idAplicacao: number }

            return {
                to: "/empresa/vaga/$id/candidato/$idAplicacao",
                params: {
                    id: String(props.idVaga),
                    idAplicacao: String(props.idAplicacao)
                }
            }
        }
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