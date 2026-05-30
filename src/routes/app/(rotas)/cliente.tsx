import { createFileRoute } from '@tanstack/react-router'
import { useAppSelector } from '../../../lib/reducers'
import { Botao } from '../../../components/Botao/Botao'
import { useDispatch } from 'react-redux'
import { credencialActions } from '../../../lib/reducers/credencial'

export const Route = createFileRoute('/app/(rotas)/cliente')({
  component: RouteComponent,
})

function RouteComponent() {
  const usuario = useAppSelector(state => state.credencial)
  const dispatch = useDispatch()

  return <div>Olá, {usuario?.nomeUsuario} - {usuario?.email} <Botao onClick={() => dispatch(credencialActions.deslogarUsuario())}>Deslogar</Botao></div>
}
