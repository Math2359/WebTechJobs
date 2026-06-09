import { Pages } from '@/pages'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_autenticado/notificacoes')({
  component: RouteComponent,
})

function RouteComponent() {
  return <Pages.Notificacoes />
}
