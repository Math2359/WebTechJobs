import { Dominios } from '@/lib/dominios'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { store } from '@/lib/reducers'

export const Route = createFileRoute('/_autenticado/candidato')({
    component: RouteComponent,
    beforeLoad: () => {
        const usuario = store.getState().credencial

        if (usuario?.perfil !== Dominios.Perfil.Candidato) {
            throw redirect({
                to: "/",
            })
        }
    },
})

function RouteComponent() {
    return (
        <Outlet />
    )
}
