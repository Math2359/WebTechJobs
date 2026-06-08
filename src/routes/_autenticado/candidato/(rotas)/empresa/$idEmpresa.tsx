import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/candidato/(rotas)/empresa/$idEmpresa')({
    component: RouteComponent,
})

function RouteComponent() {
    const { idEmpresa } = Route.useParams()

    return <Pages.Candidato.Empresa.Detalhes idEmpresa={Number(idEmpresa)} />
}
