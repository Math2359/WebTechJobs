import { useMutation } from "@tanstack/react-query";
import type { CriarUsuarioRequest, GerarTokenRequest, GerarTokenResponse } from "./usuario.types";
import { toast } from "sonner";
import { api } from "@/lib/axios";
import type { ErroResponse } from "../types";

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