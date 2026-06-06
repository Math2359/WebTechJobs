import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { VagaQueryKeys, type AtualizarVagaEmpresaRequest, type CadastrarVagaRequest, type ObterVagaEmpresaPorIdResponse, type ObterVagasEmpresaResponse } from "./vaga.types";
import { api } from "@/lib/axios";
import type { ErroResponse } from "../types";

export const useObterVagasEmpresa = () => useQuery({
    queryKey: [VagaQueryKeys.ObterVagasEmpresa],
    queryFn: async () => {
        const { data } = await api.get<ObterVagasEmpresaResponse>("/vaga/empresa")

        return data
    }
})

export const useObterVagaEmpresaPorId = (id: number | undefined) => useQuery({
    queryKey: [VagaQueryKeys.ObterVagaEmpresaPorId, id],
    enabled: !!id,
    queryFn: async () => {
        const { data } = await api.get<ObterVagaEmpresaPorIdResponse>(`/vaga/empresa/${id}`)

        return data
    }
})

export const useAtualizarVagaEmpresa = () => useMutation({
    mutationFn: async ({ id, ...request }: AtualizarVagaEmpresaRequest) => {
        const { data } = await api.put(`/vaga/${id}`, request)

        return data
    },
    onSuccess: (_, { id }) => {
        queryClient.invalidateQueries({ queryKey: [VagaQueryKeys.ObterVagasEmpresa] })
        queryClient.invalidateQueries({ queryKey: [VagaQueryKeys.ObterVagaEmpresaPorId, id] })
        toast.success("Vaga atualizada com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useCadastrarVagaEmpresa = () => useMutation({
    mutationFn: async (request: CadastrarVagaRequest) => {
        const { data } = await api.post("/vaga", request)

        return data
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [VagaQueryKeys.ObterVagasEmpresa] })
        toast.success("Vaga cadastrada com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})
