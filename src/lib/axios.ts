import axios from "axios"
import { CookiesDisponiveis, obterCookie } from "./cookies"
import { type CredencialState } from "./reducers/credencial"
import { deslogarUsuarioTotal } from "./autenticacao"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

let deslogou = false

api.interceptors.request.use((config) => {
    const credentials = obterCookie<CredencialState>(CookiesDisponiveis.Credenciais)
    
    const accessToken = credentials?.token

    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`

    return config
})

api.interceptors.response.use(response => response, error => {
    if (error.response.status === 401 && !deslogou) {
        deslogou = true
        deslogarUsuarioTotal()
    }
    return Promise.reject(error);
});