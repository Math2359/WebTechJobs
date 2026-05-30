import Cookies from "js-cookie"

export const CookiesDisponiveis = {
    Credenciais: "credenciais",
} as const;

export const definirCookie = <T>(nome: string, valor: T) => {
    Cookies.set(nome, JSON.stringify(valor));
}

export const obterCookie = <T = string>(nome: string) => {
    const cookie = Cookies.get(nome)

    if (!cookie) return null

    return JSON.parse(cookie) as T 
}

export const removerCookie = (nome: string) => {
    Cookies.remove(nome, { expires: 0 })
}