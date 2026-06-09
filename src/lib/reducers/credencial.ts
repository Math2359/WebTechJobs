import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CookiesDisponiveis, definirCookie, obterCookie } from "../cookies";
import type { Perfil } from "../dominios/perfil";

export type CredencialState = {
    token: string
    nomeUsuario: string
    email: string
    perfil: Perfil
    emailValidado: boolean
} | null

const INITIAL_STATE: CredencialState = obterCookie<CredencialState>(CookiesDisponiveis.Credenciais)

export const { reducer: credencialReducer, actions: credencialActions } = createSlice({
    name: "credencial",
    initialState: INITIAL_STATE,
    reducers: {
        definirCredenciais: (_, action: PayloadAction<CredencialState>) => {
            definirCookie(CookiesDisponiveis.Credenciais, action.payload)

            return action?.payload || null
        },
        deslogarUsuario: () => null
    }
})
