import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { Logo } from '@/assets'
import { NavLink } from '@/components/NavLink/NavLink'
import { Badge, Box, Grid, IconButton, Menu, MenuItem, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { store, useAppSelector } from '@/lib/reducers'
import { useState } from 'react'
import { deslogarUsuarioTotal } from '@/lib/autenticacao'
import { useObterFotoPerfil, useObterQuantidadeNotificacoesNaoLidasUsuario } from '@/api/usuario/usuario'
import { AvatarPerfil } from '@/components/AvatarPerfil/AvatarPerfil'
import { RotasPerfil } from '@/lib/dominios/perfil'
import { Breadcrumb } from '@/components/Breadcrumb/Breadcrumb'
import { COR_ITEM } from '@/pages/Notificacoes/Notificacoes.utils'
import { Dominios } from '@/lib/dominios'

export const Route = createFileRoute('/_autenticado')({
    component: RouteComponent,
    beforeLoad: () => {
        const usuario = store.getState().credencial

        if (!usuario) {
            throw redirect({
                to: "/login",
            })
        }
    },
})

function RouteComponent() {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleAbrirMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const { data: urlAssinada, isLoading: carregandoFoto } = useObterFotoPerfil()
    const { data: quantidadeNotificacoesNaoLidas = 0, isLoading: carregandoNotificacoes } = useObterQuantidadeNotificacoesNaoLidasUsuario()

    const navigate = useNavigate()
    const usuario = useAppSelector(state => state.credencial)
    
    const perfil = usuario?.perfil ?? 1

    return (
        <>
            <Box sx={(theme) => ({ justifyContent: "space-between", marginBottom: theme.spacing(5), display: "flex", alignItems: "center" })}>
                <Logo />
                <Grid container spacing={3} sx={{ alignItems: "center" }}>
                    <Grid container spacing={3}>
                        <NavLink underLineColor={COR_ITEM[perfil][1]} to={RotasPerfil[perfil] + "/vaga"}>Vagas</NavLink>
                        {perfil === Dominios.Perfil.Candidato && <NavLink underLineColor="primary" to="/candidato/candidaturas">Candidaturas</NavLink>}
                    </Grid>
                    <Tooltip title="Notificações">
                        <IconButton
                            color={COR_ITEM[perfil][1]}
                            disabled={carregandoNotificacoes}
                            aria-label={`${quantidadeNotificacoesNaoLidas} notificações não lidas`}
                            onClick={() => navigate({ to: "/notificacoes" })}
                        >
                            {carregandoNotificacoes ? <Skeleton variant="circular" width={24} height={24} /> : <Badge badgeContent={quantidadeNotificacoesNaoLidas} color={COR_ITEM[perfil][2]} max={99}>
                                <NotificationsNoneOutlinedIcon />
                            </Badge>}
                        </IconButton>
                    </Tooltip>
                    <IconButton disabled={carregandoFoto} onClick={handleAbrirMenu}>
                        {carregandoFoto ? <Skeleton variant="circular" width={50} height={50} /> : <AvatarPerfil src={urlAssinada} />}
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseMenu}
                        anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center"
                        }}
                    >
                        <MenuItem onClick={() => usuario && navigate({
                            to: RotasPerfil[usuario.perfil]
                        })}>
                            <Typography variant="subtitle2">
                                Meu perfil
                            </Typography>
                        </MenuItem>
                        <MenuItem onClick={deslogarUsuarioTotal}>
                            <Typography variant="subtitle2" color="error">
                                Desconectar conta
                            </Typography>
                        </MenuItem>
                    </Menu>
                </Grid>
            </Box>
            <Stack spacing={4}>
                <Breadcrumb rotaInicial={RotasPerfil[perfil]} />
                <Outlet />
            </Stack>
        </>
    )
}
