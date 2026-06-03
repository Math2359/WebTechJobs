import { toast } from "sonner"
import { removerCookie } from "./cookies"
import { api } from "./axios"
import { queryClient } from "./queryClient"
import { store } from "./reducers"
import { router } from "./router"

export function deslogarUsuarioTotal() {
    store.dispatch({ type: "credencial/deslogarUsuario" })
    removerCookie("credenciais")
    api.defaults.headers.Authorization = ""
    router.navigate({
        to: "/login",
    })
    toast.message("Sua conta foi desconectada!")
    queryClient.clear()
}
