import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/empresa/(rotas)/vaga/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Pages.Empresa.Vaga.Busca />
}
