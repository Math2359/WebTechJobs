import { createFileRoute, Outlet, redirect, useNavigate } from '@tanstack/react-router'
import { Logo } from '@/assets'
import { NavLink } from '@/components/NavLink/NavLink'
import { Badge, Box, Grid, IconButton, Menu, MenuItem, Tooltip, Typography } from '@mui/material'
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined'
import { store, useAppSelector } from '@/lib/reducers'
import { useState } from 'react'
import { deslogarUsuarioTotal } from '@/lib/autenticacao'
import { useObterFotoPerfil, useObterQuantidadeNotificacoesNaoLidasUsuario } from '@/api/usuario/usuario'
import { AvatarPerfil } from '@/components/AvatarPerfil/AvatarPerfil'
import { RotasPerfil } from '@/lib/dominios/perfil'

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

    const { data: urlAssinada } = useObterFotoPerfil()
    const { data: quantidadeNotificacoesNaoLidas = 0 } = useObterQuantidadeNotificacoesNaoLidasUsuario()

    const navigate = useNavigate()
    const usuario = useAppSelector(state => state.credencial)

    return (
        <>
            <Box sx={(theme) => ({ justifyContent: "space-between", marginBottom: theme.spacing(5), display: "flex", alignItems: "center" })}>
                <Logo />
                <Grid container spacing={3} sx={{ alignItems: "center" }}>
                    <Grid container spacing={3}>
                        <NavLink underLineColor='primary' to={RotasPerfil[usuario?.perfil ?? 0] + "/vaga"}>Vagas</NavLink>
                        <NavLink underLineColor='primary' to="/candidato/candidaturas">Candidaturas</NavLink>
                    </Grid>
                    <Tooltip title="Notificações">
                        <IconButton
                            color="primary"
                            aria-label={`${quantidadeNotificacoesNaoLidas} notificações não lidas`}
                            onClick={() => navigate({ to: "/notificacoes" })}
                        >
                            <Badge badgeContent={quantidadeNotificacoesNaoLidas} color="secondary" max={99}>
                                <NotificationsNoneOutlinedIcon />
                            </Badge>
                        </IconButton>
                    </Tooltip>
                    <IconButton onClick={handleAbrirMenu}>
                        <AvatarPerfil src={urlAssinada} />
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
            <Outlet />
        </>
    )
}
