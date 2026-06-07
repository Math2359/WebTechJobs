import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/candidato/(rotas)/vaga/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Pages.Candidato.Vaga.Busca />
}
