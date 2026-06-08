import { useMutation, useQuery } from "@tanstack/react-query";
import { EmpresaQueryKeys, type AtualizarInformacoesRequest, type AtualizarSituacaoAplicacaoVagaRequest, type ObterInformacoesResponse } from "./empresa.types";
import { api } from "@/lib/axios";
import { toast } from "sonner";
import { queryClient } from "@/lib/queryClient";
import type { ErroResponse } from "../types";

export const useObterInformacoesEmpresa = () => useQuery({
    queryKey: [EmpresaQueryKeys.ObterInformacoes],
    queryFn: async () => {
        const { data } = await api.get<ObterInformacoesResponse>("/empresa/informacoes")

        return data
    }
})

export const useObterFotoPerfilEmpresa = (idEmpresa: number | undefined) => useQuery({
    queryKey: [EmpresaQueryKeys.ObterFotoPerfil, idEmpresa],
    enabled: !!idEmpresa,
    queryFn: async () => {
        const { data } = await api.get<string>(`/usuario/foto-perfil/empresa/${idEmpresa}`)

        return data
    }
})

export const useAtualizarInformacoesEmpresa = () => useMutation({
    mutationFn: async (request: AtualizarInformacoesRequest) => {
        await api.put("/empresa/informacoes", request)
    },
    onSuccess: () => {
        toast.success("Informações atualizadas com sucesso!")
        queryClient.invalidateQueries({ queryKey: [EmpresaQueryKeys.ObterInformacoes] })
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useAtualizarSituacaoAplicacaoVaga = () => useMutation({
    mutationFn: async ({ idAplicacao, situacao }: AtualizarSituacaoAplicacaoVagaRequest) => {
        await api.post(`/empresa/aplicacao-vaga/${idAplicacao}/${situacao}`)
    },
    onSuccess: () => {
        toast.success("Situação da aplicação atualizada com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})
