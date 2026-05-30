import type { AxiosError } from "axios";

export type ErroResponse = AxiosError<{
    mensagem: string
}>