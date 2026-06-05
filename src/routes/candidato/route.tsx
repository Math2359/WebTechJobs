import { Logo } from '@/assets'
import { NavLink } from '@/components/NavLink/NavLink'
import { Dominios } from '@/lib/dominios'
import { Box, Grid, IconButton, Menu, Stack, Typography } from '@mui/material'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { store } from '@/lib/reducers'
import { useState } from 'react'
import { deslogarUsuarioTotal } from '@/lib/autenticacao'
import { useObterFotoPerfil } from '@/api/usuario/usuario'
import { AvatarPerfil } from '@/components/AvatarPerfil/AvatarPerfil'

export const Route = createFileRoute('/candidato')({
    component: RouteComponent,
    beforeLoad: () => {
        const usuario = store.getState().credencial

        if (!usuario) {
            throw redirect({
                to: "/login",
            })
        }

        if (usuario.perfil !== Dominios.Perfil.Candidato) {
            throw redirect({
                to: "/",
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

    return (
        <>
            <Box sx={(theme) => ({ justifyContent: "space-between", marginBottom: theme.spacing(5), display: "flex", alignItems: "center" })}>
                <Logo />
                <Grid container spacing={3} sx={{ alignItems: "center" }}>
                    <Grid container spacing={3}>
                        <NavLink underLineColor='primary' to="/candidato/vagas">Vagas</NavLink>
                        <NavLink underLineColor='primary' to="/candidato/candidaturas">Candidaturas</NavLink>
                    </Grid>
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
                        <Stack sx={{ padding: 1 }} spacing={2}>
                            <Typography sx={{ cursor: "pointer" }} variant="subtitle2" color="error" onClick={deslogarUsuarioTotal}>
                                Desconectar conta
                            </Typography>
                        </Stack>
                    </Menu>
                </Grid>
            </Box>
            <Outlet />
        </>
    )
}
