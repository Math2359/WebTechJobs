import { useQuery } from "@tanstack/react-query";
import { CandidatoQueryKeys, type ObterExperienciasResponse, type ObterInformacoesResponse } from "./candidato.types";
import { api } from "@/lib/axios";

export const useObterExperiencias = () => useQuery({
    queryKey: [CandidatoQueryKeys.ObterExperiencias],
    queryFn: async () => {
        const { data } = await api.get<ObterExperienciasResponse>("/candidato/experiencias")

        return data
    }
})

export const useObterInformacoes = () => useQuery({
    queryKey: [CandidatoQueryKeys.ObterInformacoes],
    queryFn: async () => {
        const { data } = await api.get<ObterInformacoesResponse>("/candidato/informacoes")

        return data
    }
})