import { Box, Divider, Grid, IconButton, Stack, Typography } from "@mui/material"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import DoneAllIcon from "@mui/icons-material/DoneAll"
import { motion } from "motion/react"
import { useNavigate } from "@tanstack/react-router"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import {
    useMarcarNotificacaoComoLida,
    useMarcarTodasNotificacoesComoLidas,
    useObterNotificacoesUsuario,
} from "@/api/usuario/usuario"
import { Botao } from "@/components/Botao/Botao"
import { Card } from "@/components/Card/Card"
import { SemDados } from "@/components/SemDados/SemDados"
import { COR_ITEM, obterConfiguracaoNotificacao } from "./Notificacoes.utils"
import { useAppSelector } from "@/lib/reducers"
import { SkeletonListaCards } from "@/components/Carregamento/Carregamento"

export const Notificacoes = () => {
    const navigate = useNavigate()
    const { data: notificacoes, isLoading, isRefetching } = useObterNotificacoesUsuario()
    const { mutateAsync: marcarComoLida, isPending: marcandoComoLida } = useMarcarNotificacaoComoLida()
    const { mutateAsync: marcarTodasComoLidas, isPending: marcandoTodasComoLidas } = useMarcarTodasNotificacoesComoLidas()

    const possuiNotificacoesNaoLidas = notificacoes?.some((notificacao) => !notificacao.lida) ?? false

    const usuario = useAppSelector(state => state.credencial)

    const perfil = usuario?.perfil ?? 1

    return (
        <Stack spacing={3}>
            <Grid container sx={{ justifyContent: "space-between" }}>
                <Stack>
                    <Typography variant="h6">Notificações</Typography>
                    <Typography variant="caption">Acompanhe as atualizações da sua conta.</Typography>
                </Stack>

                {possuiNotificacoesNaoLidas && (
                    <Botao
                        cor={COR_ITEM[perfil][1]}
                        variante="outlined"
                        loading={marcandoTodasComoLidas}
                        onClick={async () => await marcarTodasComoLidas()}
                    >
                        <DoneAllIcon fontSize="small" />
                        Marcar todas como lidas
                    </Botao>
                )}
            </Grid>

            <Divider />

            {(isLoading || isRefetching) && !notificacoes ? (
                <SkeletonListaCards quantidade={4} />
            ) : notificacoes?.length ? (
                <Stack spacing={2}>
                    {notificacoes.map((notificacao) => {
                        const { Icone, obterDestino } = obterConfiguracaoNotificacao(notificacao.tipo)

                        const abrirNotificacao = async () => {
                            if (!obterDestino) return

                            if (!notificacao.lida) {
                                await marcarComoLida(notificacao.id).catch(() => undefined)
                            }
                            
                            navigate(obterDestino(notificacao.propsAdicionais))
                        }

                        return (
                            <motion.div
                                key={notificacao.id}
                                whileHover={{ y: -4, scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                transition={{ duration: 0.2, ease: "easeOut" }}
                                onClick={abrirNotificacao}
                                style={{ cursor: obterDestino ? "pointer" : "default" }}
                            >
                                <Card padding={2} sx={{ background: (theme) => notificacao.lida ? theme.palette.background.default : theme.palette.grey[200] }}>
                                    <Grid container sx={{ placeItems: "start", justifyContent: "space-between" }}>
                                        <Stack spacing={1}>
                                            <Grid container spacing={2}>
                                                <Box sx={(theme) => ({
                                                    display: "flex",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    backgroundColor: !notificacao.lida ? theme.palette[COR_ITEM[perfil][1]].light : theme.palette.grey[500],
                                                    borderRadius: 2,
                                                    width: theme.spacing(5),
                                                    height: theme.spacing(5)
                                                })}>
                                                    <Icone fontSize="medium" sx={{ color: "#fff" }} />
                                                </Box>

                                                <Stack>
                                                    <Typography variant="subtitle2">
                                                        {notificacao.titulo}
                                                    </Typography>

                                                    <Typography variant="caption" color="text.secondary">
                                                        {notificacao.mensagem}
                                                    </Typography>
                                                </Stack>
                                            </Grid>

                                            <Typography variant="caption" sx={{ fontWeight: 600 }}>
                                                {format(new Date(notificacao.dataCadastro), "dd/MM/yyyy 'às' HH:mm", { locale: ptBR })}
                                            </Typography>
                                        </Stack>

                                        {!notificacao.lida && (
                                            <IconButton
                                                color={COR_ITEM[perfil][1]}
                                                disabled={marcandoComoLida}
                                                onClick={async (event) => {
                                                    event.stopPropagation()
                                                    await marcarComoLida(notificacao.id)
                                                }}
                                                aria-label={`Marcar ${notificacao.titulo} como lida`}
                                            >
                                                <CheckCircleOutlinedIcon />
                                            </IconButton>
                                        )}
                                    </Grid>
                                </Card>
                            </motion.div>
                        )
                    })}
                </Stack>
            ) : (
                <SemDados
                    titulo="Nenhuma notificação"
                    descricao="As atualizações da sua conta aparecerão aqui."
                />
            )}
        </Stack>
    )
}
