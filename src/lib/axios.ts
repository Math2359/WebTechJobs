import axios from "axios"
import { CookiesDisponiveis, obterCookie } from "./cookies"
import type { CredencialState } from "./reducers/credencial"

export const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers: {
        "Content-Type": "application/json"
    }
})

api.interceptors.request.use((config) => {
    const credentials = obterCookie<CredencialState>(CookiesDisponiveis.Credenciais)
    
    const accessToken = credentials?.token

    if (accessToken) config.headers["Authorization"] = `Bearer ${accessToken}`

    return config
})