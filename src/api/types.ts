import type { AxiosError } from "axios";

export type ErroResponse = AxiosError<{
    mensagem: string
}>

export type AgendamentoEntrevista = {
    id: number
    idAplicacao: number
    data: Date
    hora: string
    local: string
    observacao?: string
}
