import { useMutation, useQuery } from "@tanstack/react-query";
import { EmpresaQueryKeys, type AtualizarInformacoesRequest, type ObterInformacoesResponse } from "./empresa.types";
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