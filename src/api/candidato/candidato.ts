import { useMutation, useQuery } from "@tanstack/react-query";
import { CandidatoQueryKeys, type AtualizarInformacoesRequest, type ObterInformacoesResponse } from "./candidato.types";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import type { ErroResponse } from "../types";
import { queryClient } from "@/lib/queryClient";


export const useObterInformacoes = () => useQuery({
    queryKey: [CandidatoQueryKeys.ObterInformacoes],
    queryFn: async () => {
        const { data } = await api.get<ObterInformacoesResponse>("/candidato/informacoes")

        return data
    }
})

export const useAtualizarInformacoes = () => useMutation({
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