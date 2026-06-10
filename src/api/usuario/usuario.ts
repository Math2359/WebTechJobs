import { useMutation, useQuery } from "@tanstack/react-query";
import { UsuarioQueryKeys, type CriarUsuarioRequest, type EditarFotoPerfilRequest, type GerarTokenRequest, type GerarTokenResponse, type ObterNotificacoesResponse, type ObterQuantidadeNotificacoesNaoLidasResponse, type RecuperarSenhaRequest, type RedefinirSenhaRequest, type ValidarEmailRequest } from "./usuario.types";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import type { ErroResponse } from "../types";
import { queryClient } from "@/lib/queryClient";

export const useObterFotoPerfil = () => useQuery({
    queryKey: [UsuarioQueryKeys.ObterFotoPerfil],
    queryFn: async () => {
        const { data } = await api.get<string>("/usuario/foto-perfil")

        return data
    },
})

export const useObterValidacaoEmail = () => useQuery({
    queryKey: [UsuarioQueryKeys.ObterValidacaoEmail],
    queryFn: async () => {
        const { data } = await api.get<boolean>("/usuario/email/validado")

        return data
    },
})

export const useEnviarValidacaoEmail = () => useMutation({
    mutationFn: async () => {
        await api.post("/usuario/email/validacao")
    },
    onSuccess: () => {
        toast.success("E-mail de validação enviado com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useValidarEmail = () => useMutation({
    mutationFn: async ({ codigo }: ValidarEmailRequest) => {
        await api.get("/usuario/email/validar", {
            params: { codigo }
        })
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [UsuarioQueryKeys.ObterValidacaoEmail] })
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

export const useRecuperarSenha = () => useMutation({
    mutationFn: async (request: RecuperarSenhaRequest) => {
        await api.post("/usuario/senha/recuperacao", request)
    },
    onSuccess: () => {
        toast.success("Link de recuperação enviado com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useRedefinirSenha = () => useMutation({
    mutationFn: async (request: RedefinirSenhaRequest) => {
        await api.post("/usuario/senha/redefinir", request)
    },
    onSuccess: () => {
        toast.success("Senha redefinida com sucesso!")
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

export const useDeletarFotoPerfil = () => useMutation({
    mutationFn: async () => {

        await api.delete("/usuario/foto-perfil")
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [UsuarioQueryKeys.ObterFotoPerfil] })
        toast.success("Foto de perfil deletada com sucesso!")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useObterNotificacoesUsuario = () => useQuery({
    queryKey: [UsuarioQueryKeys.ObterNotificacoes],
    queryFn: async () => {
        const { data } = await api.get<ObterNotificacoesResponse>("/usuario/notificacao")

        return data
    },
})

export const useObterQuantidadeNotificacoesNaoLidasUsuario = () => useQuery({
    queryKey: [UsuarioQueryKeys.ObterQuantidadeNotificacoesNaoLidas],
    queryFn: async () => {
        const { data } = await api.get<ObterQuantidadeNotificacoesNaoLidasResponse>("/usuario/notificacao/nao-lidas")

        return data
    },
})

export const useMarcarNotificacaoComoLida = () => useMutation({
    mutationFn: async (idNotificacao: number) => {
        await api.put(`/usuario/notificacao/${idNotificacao}/lida`)
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [UsuarioQueryKeys.ObterNotificacoes] })
        queryClient.invalidateQueries({ queryKey: [UsuarioQueryKeys.ObterQuantidadeNotificacoesNaoLidas] })
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})

export const useMarcarTodasNotificacoesComoLidas = () => useMutation({
    mutationFn: async () => {
        await api.put("/usuario/notificacao/lidas")
    },
    onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: [UsuarioQueryKeys.ObterNotificacoes] })
        queryClient.invalidateQueries({ queryKey: [UsuarioQueryKeys.ObterQuantidadeNotificacoesNaoLidas] })
        toast.success("Notificações marcadas como lidas.")
    },
    onError: (erro: ErroResponse) => {
        toast.error(erro.response?.data.mensagem)
    }
})
