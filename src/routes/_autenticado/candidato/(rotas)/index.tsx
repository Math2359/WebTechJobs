import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/candidato/(rotas)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Pages.Candidato.Dashboard />
}
