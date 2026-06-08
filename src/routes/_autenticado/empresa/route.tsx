import { Dominios } from '@/lib/dominios'
import { store } from '@/lib/reducers'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/empresa')({
  component: RouteComponent,
  beforeLoad: () => {
    const usuario = store.getState().credencial

    if (usuario?.perfil !== Dominios.Perfil.Empresa) {
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
