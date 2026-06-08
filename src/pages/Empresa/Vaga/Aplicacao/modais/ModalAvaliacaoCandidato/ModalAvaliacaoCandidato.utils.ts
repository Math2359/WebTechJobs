import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { Dominios } from "@/lib/dominios"
import type { Situacao } from "@/lib/dominios/situacao"
import type { AvaliacaoCandidatoSchema } from "./ModalAvaliacaoCandidato.types"

export const valoresIniciaisAvaliacaoCandidato: AvaliacaoCandidatoSchema = {
    observacao: ""
}

export const AVALIACAO_CANDIDATO_MAPEADA = {
    [Dominios.Situacao.Aprovado]: {
        titulo: "Aprovar candidato",
        descricao: "Confirme a aprovação de",
        detalhe: "O candidato avançará para a etapa de aprovação desta vaga.",
        botao: "Aprovar",
        cor: "success",
        Icone: CheckCircleOutlinedIcon
    },
    [Dominios.Situacao.Reprovado]: {
        titulo: "Reprovar candidato",
        descricao: "Confirme a reprovação de",
        detalhe: "O candidato será marcado como reprovado nesta aplicação.",
        botao: "Reprovar",
        cor: "error",
        Icone: HighlightOffIcon
    }
} as const

export const obterAvaliacaoCandidato = (situacao?: Situacao) => {
    if (situacao === Dominios.Situacao.Aprovado || situacao === Dominios.Situacao.Reprovado) {
        return AVALIACAO_CANDIDATO_MAPEADA[situacao]
    }

    return AVALIACAO_CANDIDATO_MAPEADA[Dominios.Situacao.Reprovado]
}
