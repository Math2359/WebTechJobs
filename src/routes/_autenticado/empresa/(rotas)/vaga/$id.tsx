import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/empresa/(rotas)/vaga/$id')({
  component: RouteComponent,
})

function RouteComponent() {
  const { id } = Route.useParams()

  return <Pages.Empresa.Vaga.Detalhes id={Number(id)} />
}
