import { Logo } from '@/assets'
import { NavLink } from '@/components/NavLink/NavLink'
import { Dominios } from '@/lib/dominios'
import { store } from '@/lib/reducers'
import { Box, Grid } from '@mui/material'
import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import AccountCircleIcon from '@mui/icons-material/AccountCircle';

export const Route = createFileRoute('/candidato')({
    component: RouteComponent,
    beforeLoad: () => {
        const auth = store.getState().credencial

        if (!auth) {
            throw redirect({
                to: "/login",
            })
        }

        if (auth.perfil !== Dominios.Perfil.Candidato) {
            throw redirect({
                to: "/",
            })
        }
    }
})

function RouteComponent() {
    return (
        <>
            <Box sx={(theme) => ({ justifyContent: "space-between", marginBottom: theme.spacing(5), display: "flex", alignItems: "center" })}>
                <Logo />
                <Grid container spacing={3} sx={{ alignItems: "center" }}>
                    <Grid container spacing={3}>
                        <NavLink underLineColor='primary' to="/candidato/vagas">Vagas</NavLink>
                        <NavLink underLineColor='primary' to="/candidato/candidaturas">Candidaturas</NavLink>
                    </Grid>
                    <AccountCircleIcon sx={{ fontSize: 50 }} color='disabled' />
                </Grid>
            </Box>
            <Outlet />
        </>
    )
}
