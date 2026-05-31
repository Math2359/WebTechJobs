import { useAppSelector } from "@/lib/reducers"
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material"
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Card } from "@/components/Card/Card";
import { RenderizarTexto } from "@/components/RenderizarTexto/RenderizarTexto";
import { useObterExperiencias, useObterInformacoes } from "@/api/candidato/candidato";
import { useMemo } from "react";
import { Dominios } from "@/lib/dominios";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Experiencias } from "./components/Experiencias/Experiencias";
import { IconeTexto } from "./components/IconeTexto/IconeTexto";

export const Dashboard = () => {
    const usuario = useAppSelector(state => state.credencial)

    const { data: experienciasCandidato } = useObterExperiencias()
    const { data: informacoesCandidato } = useObterInformacoes()

    const experiencias = useMemo(() => ({
        trabalho: experienciasCandidato?.filter(x => x.tipoExperiencia === Dominios.TipoExperiencia.Trabalho) ?? [],
        formacao: experienciasCandidato?.filter(x => x.tipoExperiencia === Dominios.TipoExperiencia.Formacao) ?? []
    }), [experienciasCandidato])

    const preferencias = [
        "PJ ou CLT",
        "Remoto / Híbrido",
        "A partir de 10mil",
    ]
    return (
        <Stack spacing={4}>
            <Card>
                <Box sx={{ background: theme => theme.palette.primary.main, height: "70px" }} />
                <Stack sx={{ padding: 2 }}>
                    <Grid container spacing={2}>
                        <AccountCircleIcon sx={{ fontSize: 70 }} color='secondary' />

                        <Stack spacing={1}>
                            <Stack>
                                <Typography variant="h6">{usuario?.nomeUsuario}</Typography>
                                <Typography variant="caption">Desenvolvedor Full Stack - São Paulo, SP</Typography>
                            </Stack>
                            <Grid container spacing={3}>
                                <Typography variant="caption"><b>12</b> candidaturas</Typography>
                                <Typography variant="caption"><b>3</b> em andamento</Typography>
                                <Typography variant="caption"><b>5</b> anos de exp.</Typography>
                            </Grid>
                        </Stack>
                    </Grid>
                </Stack>
            </Card>

            <Grid container spacing={2}>
                <Stack>
                    <Stack spacing={2}>
                        <Card padding={2}>
                            <Stack spacing={2}>
                                <Typography variant="overline">Habilidades</Typography>
                                <Grid container size={7} rowSpacing={1} columnSpacing={2}>
                                    {informacoesCandidato?.habilidades?.split(",").map((item, index) => <Chip key={index} color="primary" label={item} />)}
                                </Grid>
                            </Stack>
                        </Card>
                        <Card padding={2}>
                            <Stack spacing={2}>
                                <Typography variant="overline">Contato</Typography>
                                <Stack spacing={0.5}>
                                    <IconeTexto icon={EmailIcon} texto={informacoesCandidato?.emailPessoal} />
                                    <IconeTexto icon={ContactMailIcon} texto={informacoesCandidato?.emailCorporativo} />
                                    <IconeTexto icon={LocalPhoneIcon} texto={informacoesCandidato?.telefone} />
                                    <IconeTexto link icon={LinkedInIcon} texto={informacoesCandidato?.linkedin} />
                                    <IconeTexto link icon={GitHubIcon} texto={informacoesCandidato?.github} />
                                </Stack>
                            </Stack>
                        </Card>
                        <Card padding={2}>
                            <Stack spacing={2}>
                                <Typography variant="overline">Preferências</Typography>
                                <Stack spacing={0.5}>
                                    {preferencias.map((item, index) => <Typography variant="body2" key={index}>{item}</Typography>)}
                                </Stack>
                            </Stack>
                        </Card>
                    </Stack>
                </Stack>
                <Grid size="grow">
                    <Stack spacing={2}>
                        <Card padding={2}>
                            <Stack spacing={4}>
                                <Stack spacing={2}>
                                    <Typography variant="overline">Sobre mim</Typography>
                                    <RenderizarTexto texto={informacoesCandidato?.descricao ?? ""} />
                                </Stack>
                            </Stack>
                        </Card>
                        <Card padding={2}>
                            <Grid container spacing={2}
                                sx={{
                                    flexGrow: 1,
                                    justifyContent: "space-between",
                                    alignItems: 'center',
                                }}>
                                <Grid size={5.7}>
                                    <Stack spacing={2}>
                                        <Typography variant="overline">Experiências</Typography>
                                        <Experiencias experiencias={experiencias.trabalho} />
                                    </Stack>
                                </Grid>

                                <Grid sx={{ height: "stretch", justifyContent: "center", display: "flex" }}>
                                    <Divider
                                        orientation="vertical"
                                        variant='fullWidth'
                                    />
                                </Grid>

                                <Grid size={5.7}>
                                    <Stack spacing={2}>
                                        <Typography variant="overline">Formações</Typography>
                                        <Experiencias experiencias={experiencias.formacao} />
                                    </Stack>
                                </Grid>

                            </Grid>
                        </Card>
                    </Stack>
                </Grid>

            </Grid>
        </Stack>
    )
}