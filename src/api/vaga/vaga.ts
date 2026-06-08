import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";
import { VagaQueryKeys, type AtualizarVagaEmpresaRequest, type CadastrarVagaRequest, type ObterAplicacaoEmpresaPorIdResponse, type ObterVagaEmpresaPorIdResponse, type ObterVagaPorIdResponse, type ObterVagasDisponiveisRequest, type ObterVagasDisponiveisResponse, type ObterVagasEmpresaResponse, type ObterVagasPorEmpresaResponse } from "./vaga.types";
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

export const useObterAplicacaoEmpresaPorId = (idVaga: number | undefined, idAplicacao: number | undefined) => useQuery({
    queryKey: [VagaQueryKeys.ObterAplicacaoEmpresaPorId, idVaga, idAplicacao],
    enabled: !!idVaga && !!idAplicacao,
    queryFn: async () => {
        const { data } = await api.get<ObterAplicacaoEmpresaPorIdResponse>(`/vaga/empresa/${idVaga}/aplicacao/${idAplicacao}`)

        return data
    }
})

export const useObterCurriculoAplicacaoEmpresa = (idVaga: number | undefined, idAplicacao: number | undefined) => useQuery({
    queryKey: [VagaQueryKeys.ObterCurriculoAplicacaoEmpresa, idVaga, idAplicacao],
    enabled: !!idVaga && !!idAplicacao,
    queryFn: async () => {
        const { data } = await api.get<string>(`/vaga/empresa/${idVaga}/aplicacao/${idAplicacao}/curriculo`)

        return data
    }
})

export const useObterVagasDisponiveis = (request: ObterVagasDisponiveisRequest) => useQuery({
    queryKey: [VagaQueryKeys.ObterVagasDisponiveis, request],
    queryFn: async () => {
        const { data } = await api.get<ObterVagasDisponiveisResponse>("/vaga/todas", {
            params: request
        })

        return data
    }
})

export const useObterVagasPorEmpresa = (idEmpresa: number | undefined) => useQuery({
    queryKey: [VagaQueryKeys.ObterVagasPorEmpresa, idEmpresa],
    enabled: !!idEmpresa,
    queryFn: async () => {
        const { data } = await api.get<ObterVagasPorEmpresaResponse>(`/vaga/por-empresa/${idEmpresa}`)

        return data
    }
})

export const useObterVagaPorId = (id: number | undefined) => useQuery({
    queryKey: [VagaQueryKeys.ObterVagasDisponiveis, id],
    enabled: !!id,
    queryFn: async () => {
        const { data } = await api.get<ObterVagaPorIdResponse>(`/vaga/${id}`)

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
