import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/empresa/(rotas)/vaga/$id/candidato/$idAplicacao')({
  component: RouteComponent,
})

function RouteComponent() {
  const { idAplicacao } = Route.useParams()

  return <Pages.Empresa.Vaga.Aplicacao idAplicacao={Number(idAplicacao)} />
}
