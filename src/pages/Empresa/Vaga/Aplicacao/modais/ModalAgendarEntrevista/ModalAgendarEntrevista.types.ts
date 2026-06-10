import type { ModalBaseGenericaProps } from "@/components/ModalBase/ModalBase.types"

export type CandidatoAplicacao = {
    id: number
    nome: string
    email: string
}

export type ModalAgendarEntrevistaProps = ModalBaseGenericaProps<{
    idAplicacao: number
    candidato?: CandidatoAplicacao
}>

export type AgendarEntrevistaSchema = {
    data: Date | undefined
    hora: string
    local: string
    observacao: string
}
