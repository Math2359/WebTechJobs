import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/candidato/(rotas)/vaga/$id')({
    component: RouteComponent,
})

function RouteComponent() {
    const { id } = Route.useParams()

    return <Pages.Candidato.Vaga.Detalhes id={Number(id)} />
}
