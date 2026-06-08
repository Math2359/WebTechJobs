import type { ModalBaseGenericaProps } from "@/components/ModalBase/ModalBase.types"
import type { CandidatoAplicacao } from "../ModalAgendarEntrevista/ModalAgendarEntrevista.types"
import type { Situacao } from "@/lib/dominios/situacao"

export type ModalAvaliacaoCandidatoProps = ModalBaseGenericaProps<{
    idAplicacao: number
    situacao: Situacao
    candidato?: CandidatoAplicacao
}>

export type AvaliacaoCandidatoSchema = {
    observacao: string
}
