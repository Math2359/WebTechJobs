import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { store } from '@/lib/reducers'
import { RotasPerfil } from '@/lib/dominios/perfil'

export const Route = createFileRoute('/')({
  component: RouteComponent,

  beforeLoad: () => {
    const auth = store.getState().credencial

    if (auth) {
      throw redirect({
        to: RotasPerfil[auth.perfil]
      })
    }

    throw redirect({
      to: "/login"
    })
  }
})

function RouteComponent() {
  return (
    <>
    </>
  )
}
