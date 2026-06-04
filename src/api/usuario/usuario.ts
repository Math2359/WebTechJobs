import { useMutation, useQuery } from "@tanstack/react-query";
import { UsuarioQueryKeys, type CriarUsuarioRequest, type EditarFotoPerfilRequest, type GerarTokenRequest, type GerarTokenResponse } from "./usuario.types";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import type { ErroResponse } from "../types";
import { queryClient } from "@/lib/queryClient";

export const useObterFotoPerfil = () => useQuery({
    queryKey: [UsuarioQueryKeys.ObterFotoPerfil],
    queryFn: async () => {
        const { data } = await api.get<string>("/usuario/foto-perfil")

        return data
    }
})

export const useCriarUsuario = () => useMutation({
    mutationFn: async (request: CriarUsuarioRequest) => {
        const { data } = await api.post("/usuario", request);

        return data;
    },
    onSuccess: () => {
        toast.success("Usuário cadastrado com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useGerarToken = () => useMutation({
    mutationFn: async (request: GerarTokenRequest) => {
        const { data } = await api.post<GerarTokenResponse>("/usuario/token", request)

        return data
    },
    onSuccess: () => {
        toast.success("Login realizado com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useEditarFotoPerfil = () => useMutation({
    mutationFn: async (request: EditarFotoPerfilRequest) => {
        const formData = new FormData()
        formData.append("file", request.file)

        await api.put("/usuario/foto-perfil", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [UsuarioQueryKeys.ObterFotoPerfil] })
        toast.success("Foto de perfil atualizada com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})