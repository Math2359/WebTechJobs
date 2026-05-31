import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { CookiesDisponiveis, definirCookie, obterCookie, removerCookie } from "../cookies";
import type { Perfil } from "../dominios/perfil";
import { api } from "../axios";
import { toast } from "sonner";

export type CredencialState = {
    token: string
    nomeUsuario: string
    email: string
    perfil: Perfil
} | null

const INITIAL_STATE: CredencialState = obterCookie<CredencialState>(CookiesDisponiveis.Credenciais) 

export const { reducer: credencialReducer, actions: credencialActions } = createSlice({
    name: "credentials",
    initialState: INITIAL_STATE,
    reducers: {
        definirCredenciais: (_, action: PayloadAction<CredencialState>) => {
            definirCookie(CookiesDisponiveis.Credenciais, action.payload)

            return action?.payload || null
        },
        deslogarUsuario: () => {
            removerCookie("credenciais")

            api.defaults.headers.Authorization = ""

            toast.message("Sua conta foi desconectada!")
        }
    }
})