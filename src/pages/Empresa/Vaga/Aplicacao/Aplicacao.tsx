import { useMemo, useState } from "react"
import { Box, Chip, Divider, Grid, IconButton, Stack, Typography } from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import EmailIcon from "@mui/icons-material/Email"
import ContactMailIcon from "@mui/icons-material/ContactMail"
import LocalPhoneIcon from "@mui/icons-material/LocalPhone"
import LinkedInIcon from "@mui/icons-material/LinkedIn"
import GitHubIcon from "@mui/icons-material/GitHub"
import PictureAsPdfOutlinedIcon from "@mui/icons-material/PictureAsPdfOutlined"
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { useNavigate } from "@tanstack/react-router"
import { Card } from "@/components/Card/Card"
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil"
import { RenderizarTexto } from "@/components/RenderizarTexto/RenderizarTexto"
import { IconeTexto } from "@/components/IconeTexto/IconeTexto"
import { Botao } from "@/components/Botao/Botao"
import { SemDados } from "@/components/SemDados/SemDados"
import { Experiencias } from "@/pages/Candidato/components/Experiencias/Experiencias"
import { ModalAgendarEntrevista } from "./modais/ModalAgendarEntrevista/ModalAgendarEntrevista"
import { ModalAvaliacaoCandidato } from "./modais/ModalAvaliacaoCandidato/ModalAvaliacaoCandidato"
import { useObterAplicacaoEmpresaPorId, useObterCurriculoAplicacaoEmpresa } from "@/api/vaga/vaga"
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
    const [situacaoAvaliacao, setSituacaoAvaliacao] = useState<Situacao>(Dominios.Situacao.EmAnalise)

    const abrirModalSituacao = (situacao: Situacao) => {
        setModalSituacao(true)
        setSituacaoAvaliacao(situacao)
    }

    const { data: aplicacao } = useObterAplicacaoEmpresaPorId(idVaga, idAplicacao)
    const { data: urlCurriculo } = useObterCurriculoAplicacaoEmpresa(idVaga, idAplicacao)

    const candidato = aplicacao ? {
        id: aplicacao.id,
        nome: aplicacao.nome,
        email: aplicacao.emailPessoal ?? aplicacao.emailCorporativo ?? ""
    } : undefined

    const experiencias = useMemo(() => ({
        trabalho: aplicacao?.experiencias.filter((item) => item.tipoExperiencia === Dominios.TipoExperiencia.Trabalho) ?? [],
        formacao: aplicacao?.experiencias.filter((item) => item.tipoExperiencia === Dominios.TipoExperiencia.Formacao) ?? []
    }), [aplicacao])

    const localizacao = [aplicacao?.cidade, aplicacao?.estado].filter(Boolean).join(", ")
    const curriculoUrl = aplicacao?.curriculo?.url ?? urlCurriculo
    const nomeCurriculo = aplicacao?.curriculo?.nomeArquivo ?? "Currículo enviado"

    const abrirCurriculo = () => {
        if (curriculoUrl) {
            window.open(curriculoUrl, "_blank")
        }
    }

    const baixarCurriculo = () => {
        if (!curriculoUrl) return

        const link = document.createElement("a")
        link.href = curriculoUrl
        link.download = nomeCurriculo
        link.target = "_blank"
        link.click()
    }

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
                                    <AvatarPerfil src={undefined} />
                                    <Box>
                                        <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                                            {aplicacao?.nome ?? "Candidato"}
                                        </Typography>
                                        <Typography variant="subtitle2" color="primary.main">
                                            {aplicacao?.area ?? "-"} {localizacao ? `- ${localizacao}` : ""}
                                        </Typography>
                                    </Box>
                                </Grid>

                                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                        <EmailIcon fontSize="small" color="action" />
                                        <Typography variant="caption">{aplicacao?.emailPessoal ?? aplicacao?.emailCorporativo ?? "-"}</Typography>
                                    </Box>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                        <LocalPhoneIcon fontSize="small" color="action" />
                                        <Typography variant="caption">{formatarTelefone(aplicacao?.telefone) ?? "-"}</Typography>
                                    </Box>
                                    <Typography variant="caption">
                                        Experiência: <b>{aplicacao?.anosExperiencia ?? "-"}</b> anos
                                    </Typography>
                                </Box>

                                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                                    {aplicacao?.habilidades?.length ? (
                                        aplicacao.habilidades.split(",").filter(Boolean).map((item, index) => (
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

                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    Sobre mim
                                </Typography>
                                <RenderizarTexto texto={aplicacao?.descricao ?? ""} />
                            </Stack>

                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    Contato
                                </Typography>
                                <Grid container spacing={2}>
                                    <Grid size={6}>
                                        <Stack spacing={0.5}>
                                            <IconeTexto icon={EmailIcon} texto={aplicacao?.emailPessoal} />
                                            <IconeTexto icon={ContactMailIcon} texto={aplicacao?.emailCorporativo} />
                                            <IconeTexto icon={LocalPhoneIcon} texto={formatarTelefone(aplicacao?.telefone)} />
                                        </Stack>
                                    </Grid>
                                    <Grid size={6}>
                                        <Stack spacing={0.5}>
                                            <IconeTexto link icon={LinkedInIcon} texto={aplicacao?.linkedin} />
                                            <IconeTexto link icon={GitHubIcon} texto={aplicacao?.github} />
                                        </Stack>
                                    </Grid>
                                </Grid>
                            </Stack>

                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    Preferências
                                </Typography>
                                <Stack spacing={0.5} sx={{ pl: 2 }}>
                                    {aplicacao?.preferencias?.length ? (
                                        aplicacao.preferencias.split(",").filter(Boolean).map((item, index) => (
                                            <Typography key={index} variant="body2" color="text.secondary">• {item}</Typography>
                                        ))
                                    ) : (
                                        <Typography variant="body2" color="text.secondary">Nenhuma preferência cadastrada</Typography>
                                    )}
                                </Stack>
                            </Stack>

                            <Stack spacing={1.5}>
                                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                    Experiências
                                </Typography>
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
                            </Stack>

                            <Stack spacing={1.5}>
                                <Grid container spacing={1} sx={{ placeItems: "center", justifyContent: "space-between" }}>
                                    <Grid container spacing={1} sx={{ placeItems: "center" }}>
                                        <PictureAsPdfOutlinedIcon color="error" />
                                        <Box>
                                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                                CV enviado
                                            </Typography>
                                            <Typography variant="caption" color="text.secondary">{nomeCurriculo}</Typography>
                                        </Box>
                                    </Grid>
                                    <Grid container spacing={1}>
                                        <Botao variante="outlined" cor="primary" disabled={!curriculoUrl} onClick={abrirCurriculo}>
                                            Visualizar PDF
                                        </Botao>
                                        <Botao variante="outlined" cor="secondary" disabled={!curriculoUrl} onClick={baixarCurriculo}>
                                            Baixar
                                        </Botao>
                                    </Grid>
                                </Grid>

                                {curriculoUrl ? (
                                    <Box
                                        component="iframe"
                                        src={curriculoUrl}
                                        title="Visualização do currículo"
                                        sx={(theme) => ({
                                            width: "100%",
                                            height: 520,
                                            border: "1px solid",
                                            borderColor: theme.palette.grey[300],
                                            borderRadius: 1,
                                        })}
                                    />
                                ) : (
                                    <SemDados titulo="CV indisponível" descricao="Nenhum arquivo de currículo foi encontrado para esta aplicação." />
                                )}
                            </Stack>
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

                                <Stack spacing={1}>
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
                                    Aplicação recebida em <b>{aplicacao?.dataCadastro ? new Date(aplicacao.dataCadastro).toLocaleDateString("pt-BR") : "-"}</b>
                                </Typography>
                                <Typography variant="caption" color="text.secondary">
                                    E-mail principal: <b>{aplicacao?.emailPessoal ?? aplicacao?.emailCorporativo ?? "-"}</b>
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
