import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/empresa/(rotas)/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Pages.Empresa.Dashboard />
}
