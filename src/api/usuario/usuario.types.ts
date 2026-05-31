import type { Perfil } from "@/lib/dominios/perfil";

export type CriarUsuarioRequest = {
    senha: string;
    login: string;
    perfil: Perfil;
    documento: string;
    nome: string;
    cep?: string;
    numero?: string;
};

export type GerarTokenRequest = {
    login: string
    senha: string
}

export type GerarTokenResponse = {
    token: string
    nomeUsuario: string
    email: string
    perfil: Perfil
}