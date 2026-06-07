import { useMutation, useQuery } from "@tanstack/react-query";
import { CandidatoQueryKeys, type AplicarVagaRequest, type AtualizarInformacoesRequest, type ObterInformacoesResponse } from "./candidato.types";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import type { ErroResponse } from "../types";
import { queryClient } from "@/lib/queryClient";

export const useObterInformacoesCandidato = () => useQuery({
    queryKey: [CandidatoQueryKeys.ObterInformacoes],
    queryFn: async () => {
        const { data } = await api.get<ObterInformacoesResponse>("/candidato/informacoes")

        return data
    }
})

export const useAtualizarInformacoesCandidato = () => useMutation({
    mutationFn: async (request: AtualizarInformacoesRequest) => {
        await api.put("/candidato/informacoes", request)
    },
    onSuccess: () => {
        toast.success("Informações atualizadas com sucesso!")
        queryClient.invalidateQueries({ queryKey: [CandidatoQueryKeys.ObterInformacoes] })
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useAplicarVaga = () => useMutation({
    mutationFn: async (request: AplicarVagaRequest) => {
        const formData = new FormData()
        formData.append("file", request.arquivo)

        await api.post(`/candidato/vaga/${request.idVaga}`, formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    onSuccess: () => {
        toast.success("Aplicação feita com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})