import type { Perfil } from "@/lib/dominios/perfil";
import type { TipoNotificacao } from "@/lib/dominios/tipoNotificacao";

export const UsuarioQueryKeys = {
    ObterFotoPerfil: "obterFotoPerfil",
    ObterNotificacoes: "obterNotificacoesUsuario",
    ObterQuantidadeNotificacoesNaoLidas: "obterQuantidadeNotificacoesNaoLidasUsuario",
    ObterValidacaoEmail: "obterValidacaoEmailUsuario"
} as const

export type NotificacaoUsuario = {
    id: number
    idUsuario: number
    tipo: TipoNotificacao
    titulo: string
    mensagem: string
    lida: boolean
    dataCadastro: Date
    propsAdicionais: string
}

export type ObterNotificacoesResponse = NotificacaoUsuario[]

export type ObterQuantidadeNotificacoesNaoLidasResponse = number

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

export type RecuperarSenhaRequest = {
    login: string
}

export type RedefinirSenhaRequest = {
    codigo: string
    novaSenha: string
}

export type GerarTokenResponse = {
    token: string
    nomeUsuario: string
    email: string
    perfil: Perfil
    emailValidado: boolean
}

export type EditarFotoPerfilRequest = {
    file: File
}

export type ValidarEmailRequest = {
    codigo: string
}
