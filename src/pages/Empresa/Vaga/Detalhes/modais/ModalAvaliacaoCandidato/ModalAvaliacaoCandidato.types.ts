import type { ModalBaseGenericaProps } from "@/components/ModalBase/ModalBase.types"
import type { CandidatoAplicacao } from "../ModalAgendarEntrevista/ModalAgendarEntrevista.types"

export type AcaoAvaliacaoCandidato = "aprovar" | "reprovar"

export type ModalAvaliacaoCandidatoProps = ModalBaseGenericaProps<{
    acao?: AcaoAvaliacaoCandidato
    candidato?: CandidatoAplicacao
}>

export type AvaliacaoCandidatoSchema = {
    observacao: string
}
