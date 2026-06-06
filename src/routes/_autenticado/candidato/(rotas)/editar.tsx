import { createFileRoute } from '@tanstack/react-router'
import { Pages } from '@/pages'

export const Route = createFileRoute('/_autenticado/candidato/(rotas)/editar')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Pages.Candidato.Editar />
}
