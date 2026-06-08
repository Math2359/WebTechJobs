import { useMemo, useState } from "react"
import { TabContext, TabPanel } from "@mui/lab"
import { Box, Chip, Divider, Grid, IconButton, Stack, Typography } from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import EmailIcon from "@mui/icons-material/Email"
import ContactMailIcon from "@mui/icons-material/ContactMail"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { useNavigate } from "@tanstack/react-router"
import { Card } from "@/components/Card/Card"
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil"
import { RenderizarTexto } from "@/components/RenderizarTexto/RenderizarTexto"
import { IconeTexto } from "@/components/IconeTexto/IconeTexto"
import { Botao } from "@/components/Botao/Botao"
import { ListaTab } from "@/components/ListaTab/ListaTab"
import { Experiencias } from "@/pages/Candidato/components/Experiencias/Experiencias"
import { ModalAgendarEntrevista } from "./modais/ModalAgendarEntrevista/ModalAgendarEntrevista"
import { ModalAvaliacaoCandidato } from "./modais/ModalAvaliacaoCandidato/ModalAvaliacaoCandidato"
import { useObterAplicacaoVagaEmpresa } from "@/api/empresa/empresa"
import { useObterFotoPerfilCandidato } from "@/api/candidato/candidato"
import { Dominios } from "@/lib/dominios"
import { formatarTelefone } from "@/lib/utils"
import type { Situacao } from "@/lib/dominios/situacao"

type AplicacaoProps = {
    idVaga: number
    idAplicacao: number
}

export const Aplicacao = ({ idVaga, idAplicacao }: AplicacaoProps) => {
    const navigate = useNavigate()
    const [modalEntrevista, setModalEntrevista] = useState(false)
    const [modalSituacao, setModalSituacao] = useState(false)
    const [tabSelecionada, setTabSelecionada] = useState("1")
    const [situacaoAvaliacao, setSituacaoAvaliacao] = useState<Situacao>(Dominios.Situacao.EmAnalise)

    const abrirModalSituacao = (situacao: Situacao) => {
        setModalSituacao(true)
        setSituacaoAvaliacao(situacao)
    }

    const { data: aplicacao } = useObterAplicacaoVagaEmpresa(idAplicacao)
    const informacaoCandidato = aplicacao?.informacaoCandidato
    const { data: fotoCandidato } = useObterFotoPerfilCandidato(informacaoCandidato?.id)

    const candidato = informacaoCandidato ? {
        id: informacaoCandidato.id ?? idAplicacao,
        nome: informacaoCandidato.nome ?? "Candidato",
        email: informacaoCandidato.emailPessoal ?? informacaoCandidato.emailCorporativo ?? ""
    } : undefined

    const experiencias = useMemo(() => ({
        trabalho: aplicacao?.experiencias.filter((item) => item.tipoExperiencia === Dominios.TipoExperiencia.Trabalho) ?? [],
        formacao: aplicacao?.experiencias.filter((item) => item.tipoExperiencia === Dominios.TipoExperiencia.Formacao) ?? []
    }), [aplicacao])

    const localizacao = [informacaoCandidato?.cidade, informacaoCandidato?.estado].filter(Boolean).join(", ")
    const curriculoUrl = aplicacao?.urlCv

    return (
        <>
            <Grid container spacing={2}>
                <Grid size="grow">
                    <Card padding={2}>
                        <Stack spacing={3}>
                            <Stack spacing={2}>
                                <Grid container spacing={1} sx={{ placeItems: "center" }}>
                                    <IconButton color="secondary" onClick={() => navigate({ to: "/empresa/vaga/$id", params: { id: String(idVaga) } })}>
                                        <KeyboardBackspaceIcon />
                                    </IconButton>
                                    <AvatarPerfil src={fotoCandidato} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                                            {informacaoCandidato?.nome ?? "Candidato"}
                                        </Typography>
                                        <Typography variant="subtitle2" color="primary.main">
                                            {informacaoCandidato?.area ?? "-"} {localizacao ? `- ${localizacao}` : ""}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                        <EmailIcon fontSize="small" color="action" />
                                        <Typography variant="caption">{informacaoCandidato?.emailPessoal ?? informacaoCandidato?.emailCorporativo ?? "-"}</Typography>
                                    </Box>
                                    <Typography variant="caption">
                                        Experiência: <b>{informacaoCandidato?.anosExperiencia ?? "-"}</b> anos
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                                    {informacaoCandidato?.habilidades?.length ? (
                                        informacaoCandidato.habilidades.split(",").filter(Boolean).map((item, index) => (
                                            <Chip
                                                key={index}
                                                label={item}
                                                sx={(theme) => ({
                                                    borderRadius: 999,
                                                    fontSize: 12,
                                                    backgroundColor: theme.palette.grey[100],
                                                })}
                                            />
                                        ))
                                    ) : (
                                        <Typography variant="caption" color="text.secondary">Nenhuma habilidade cadastrada</Typography>
                                    )}
                                </Stack>
                            </Stack>

                            <Divider />

                            <TabContext value={tabSelecionada}>
                                <Grid sx={{ width: 'fit-content' }}>
                                    <ListaTab
                                        onChange={setTabSelecionada}
                                        orientation="horizontal"
                                        variante="semBorda"
                                        tabs={[{
                                            label: "Sobre",
                                            value: "1",
                                            selected: {
                                                corFundo: (theme) => theme.palette.grey[200],
                                                cor: "#000"
                                            }
                                        }, {
                                            label: "Currículo",
                                            value: "2",
                                            selected: {
                                                corFundo: (theme) => theme.palette.grey[200],
                                                cor: "#000"
                                            }
                                        }, {
                                            label: "Contato",
                                            value: "3",
                                            selected: {
                                                corFundo: (theme) => theme.palette.grey[200],
                                                cor: "#000"
                                            }
                                        }, {
                                            label: "Experiências",
                                            value: "4",
                                            selected: {
                                                corFundo: (theme) => theme.palette.grey[200],
                                                cor: "#000"
                                            }
                                        }]}
                                    /></Grid>

                                <TabPanel value="1">
                                    <Stack spacing={3}>
                                        <Stack spacing={1.5}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                Sobre mim
                                            </Typography>
                                            <RenderizarTexto texto={informacaoCandidato?.descricao ?? ""} />
                                        </Stack>

                                        <Stack spacing={1.5}>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                Preferências
                                            </Typography>
                                            <Stack spacing={0.5} sx={{ pl: 2 }}>
                                                {informacaoCandidato?.preferencias?.length ? (
                                                    informacaoCandidato.preferencias.split(",").filter(Boolean).map((item, index) => (
                                                        <Typography key={index} variant="body2" color="text.secondary">- {item}</Typography>
                                                    ))
                                                ) : (
                                                    <Typography variant="body2" color="text.secondary">Nenhuma preferência cadastrada</Typography>
                                                )}
                                            </Stack>
                                        </Stack>
                                    </Stack>
                                </TabPanel>

                                <TabPanel value="2">
                                    <Box
                                        component="iframe"
                                        src={curriculoUrl}
                                        title="Visualização do currículo"
                                        sx={{
                                            width: "100%",
                                            height: 800,
                                            border: 0
                                        }}
                                    />
                                </TabPanel>

                                <TabPanel value="3">
                                    <Grid container spacing={2}>
                                        <Grid size={6}>
                                            <Stack spacing={0.5}>
                                                <IconeTexto icon={EmailIcon} texto={informacaoCandidato?.emailPessoal} />
                                                <IconeTexto icon={ContactMailIcon} texto={informacaoCandidato?.emailCorporativo} />
                                                <IconeTexto icon={LocalPhoneIcon} texto={formatarTelefone(informacaoCandidato?.telefone)} />
                                            </Stack>
                                        </Grid>
                                        <Grid size={6}>
                                            <Stack spacing={0.5}>
                                                <IconeTexto link icon={LinkedInIcon} texto={informacaoCandidato?.linkedin} />
                                                <IconeTexto link icon={GitHubIcon} texto={informacaoCandidato?.github} />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </TabPanel>

                                <TabPanel value="4">
                                    <Grid container spacing={2} sx={{ justifyContent: "space-between" }}>
                                        <Grid size={5.7}>
                                            <Stack spacing={2}>
                                                <Typography variant="overline">Profissionais</Typography>
                                                <Experiencias experiencias={experiencias.trabalho} />
                                            </Stack>
                                        </Grid>
                                        <Grid sx={{ height: "stretch", justifyContent: "center", display: "flex" }}>
                                            <Divider orientation="vertical" variant="fullWidth" />
                                        </Grid>
                                        <Grid size={5.7}>
                                            <Stack spacing={2}>
                                                <Typography variant="overline">Formações</Typography>
                                                <Experiencias experiencias={experiencias.formacao} />
                                            </Stack>
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            </TabContext>
                        </Stack>
                    </Card>
                </Grid>

                <Grid size={3}>
                    <Card padding={2}>
                        <Stack spacing={2.5}>
                            <Stack spacing={1.5}>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        Ações da aplicação
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Avance o candidato no processo seletivo.
                                    </Typography>
                                </Box>

                                <Stack spacing={2}>
                                    <Botao fullWidth cor="secondary" onClick={() => setModalEntrevista(true)}>
                                        Agendar entrevista <EventAvailableOutlinedIcon fontSize="small" />
                                    </Botao>
                                    <Botao fullWidth variante="outlined" cor="success" onClick={() => abrirModalSituacao(Dominios.Situacao.Aprovado)}>
                                        Aprovar <CheckCircleOutlinedIcon fontSize="small" />
                                    </Botao>
                                    <Botao fullWidth variante="outlined" cor="error" onClick={() => abrirModalSituacao(Dominios.Situacao.Reprovado)}>
                                        Reprovar <HighlightOffIcon fontSize="small" />
                                    </Botao>
                                </Stack>
                            </Stack>

                            <Stack spacing={0.75} sx={{ pt: 2 }}>
                                <Typography variant="caption" color="text.secondary">
                                    Aplicação recebida em <b>{aplicacao?.dataCadastroAplicacao ? new Date(aplicacao.dataCadastroAplicacao).toLocaleDateString("pt-BR") : "-"}</b>
                                </Typography>
                            </Stack>
                        </Stack>
                    </Card>
                </Grid>
            </Grid>

            <ModalAgendarEntrevista
                candidato={candidato}
                open={modalEntrevista}
                handleClose={() => setModalEntrevista(false)}
            />
            <ModalAvaliacaoCandidato
                idAplicacao={idAplicacao}
                situacao={situacaoAvaliacao}
                candidato={candidato}
                open={modalSituacao}
                handleClose={() => setModalSituacao(false)}
            />
        </>
    )
}
