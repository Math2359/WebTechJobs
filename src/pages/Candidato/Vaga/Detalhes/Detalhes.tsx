import { useState } from "react"
import { Box, Chip, Divider, Grid, Stack, Typography } from "@mui/material"
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined"
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded"
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined"
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined"
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined"
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined"
import { Botao } from "@/components/Botao/Botao"
import { Card } from "@/components/Card/Card"
import { formatarReal, diffDatas } from "@/lib/utils"
import { ModalCandidatura } from "./modais/ModalCandidatura/ModalCandidatura"
import { useObterFotoPerfilEmpresa } from "@/api/empresa/empresa"
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil"
import { RenderizarTexto } from "@/components/RenderizarTexto/RenderizarTexto"
import { useObterVagaAplicacaoCandidato } from "@/api/candidato/candidato"
import { ChipSituacao } from "@/components/ChipSituacao/ChipSituacao"

type DetalhesProps = {
    id: number
}

export const Detalhes = ({ id }: DetalhesProps) => {
    const [modalCandidatura, setModalCandidatura] = useState(false)
    const { data: vaga } = useObterVagaAplicacaoCandidato(id)
    const { data: fotoEmpresa } = useObterFotoPerfilEmpresa(vaga?.idEmpresa)

    const tags = [
        vaga?.nivelExperiencia,
        ...(vaga?.tecnologias?.split(",").filter(Boolean) ?? [])
    ].filter(Boolean)

    return (
        <Grid container spacing={2}>
            <Grid size="grow">
                <Card padding={2}>
                    <Stack spacing={3}>
                        <Stack spacing={2}>
                            <Grid container spacing={1} sx={{ placeItems: "center" }}>
                                <AvatarPerfil src={fotoEmpresa} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                                        {vaga?.nome}
                                    </Typography>
                                    <Typography variant="subtitle2" color="primary.main">
                                        {vaga?.nomeEmpresa}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                    <LocationOnOutlinedIcon fontSize="small" color="primary" />
                                    <Typography variant="caption">{vaga?.modelo}</Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                    <BusinessOutlinedIcon fontSize="small" color="action" />
                                    <Typography variant="caption">
                                        {vaga?.cargo}
                                    </Typography>
                                </Box>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                    <WorkOutlineRoundedIcon fontSize="small" color="action" />
                                    <Typography variant="caption">
                                        Salário: <b>{vaga?.salarioPrevisto ? formatarReal(vaga.salarioPrevisto) : "-"}</b>
                                    </Typography>
                                </Box>
                            </Box>

                            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                                {tags.map((tag) => (
                                    <Chip
                                        key={tag}
                                        label={tag}
                                        sx={(theme) => ({
                                            borderRadius: 999,
                                            fontSize: 12,
                                            backgroundColor: theme.palette.grey[100],
                                        })}
                                    />
                                ))}
                            </Stack>
                        </Stack>

                        <Divider />

                        <Stack spacing={1.5}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                Sobre a vaga
                            </Typography>
                            <RenderizarTexto texto={vaga?.descricao} />
                        </Stack>

                        <Stack spacing={1.5}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                Requisitos
                            </Typography>
                            <RenderizarTexto texto={vaga?.requisitos} />
                        </Stack>

                        <Stack spacing={1.5}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                Benefícios
                            </Typography>
                            <RenderizarTexto texto={vaga?.beneficios} />
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
            <Grid size={3}>
                <Card padding={2}>
                    <Stack spacing={2.5}>
                        {vaga?.situacao ? (
                            <Stack spacing={1.5}>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        Status da candidatura
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Você já se candidatou para esta vaga.
                                    </Typography>
                                </Box>

                                <ChipSituacao
                                    situacao={vaga.situacao}
                                    sx={{
                                        width: "fit-content",
                                    }}
                                />

                                <Typography variant="caption" color="text.secondary">
                                    Atualizado em {new Date(vaga?.dataAtualizacaoAplicacao ?? "").toLocaleDateString("pt-BR")}
                                </Typography>
                            </Stack>
                        ) : (
                            <>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                        Candidatar-se
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary">
                                        Seu perfil será enviado ao recrutador da {vaga?.nomeEmpresa}.
                                    </Typography>
                                </Box>

                                <Stack spacing={1}>
                                    <Botao fullWidth onClick={() => setModalCandidatura(true)}>
                                        Candidatar-se agora
                                    </Botao>
                                </Stack>
                            </>
                        )}

                        <Stack spacing={0.75} sx={{ pt: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                <GroupsOutlinedIcon fontSize="small" color="action" />
                                <Typography variant="caption">{142} candidatos</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                <AccessTimeOutlinedIcon fontSize="small" color="action" />
                                <Typography variant="caption">Encerra em {diffDatas(new Date(), vaga?.dataFimInscricoes!)}</Typography>
                            </Box>
                            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                <BookmarkBorderOutlinedIcon fontSize="small" color="action" />
                                <Typography variant="caption" color="primary.main">Ver perfil da empresa</Typography>
                            </Box>
                        </Stack>

                        <Divider />

                        <Stack spacing={1}>
                            <Typography variant="caption" color="text.secondary">
                                Publicada há <b>{vaga?.dataCadastro && diffDatas(vaga.dataCadastro)}</b>
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                Fim das inscrições: <b>{new Date(vaga?.dataFimInscricoes ?? "").toLocaleDateString("pt-BR")}</b>
                            </Typography>
                        </Stack>
                    </Stack>
                </Card>
            </Grid>
            <ModalCandidatura
                handleClose={() => setModalCandidatura(false)}
                open={modalCandidatura}
                vaga={{
                    id: vaga?.id ?? 0,
                    nomeEmpresa: vaga?.nomeEmpresa ?? ""
                }}
            />
        </Grid>
    )
}
