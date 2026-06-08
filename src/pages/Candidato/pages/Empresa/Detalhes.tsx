import { useMemo, useState } from "react"
import { TabContext, TabPanel } from "@mui/lab"
import { Box, Chip, Divider, Grid, IconButton, Stack, Typography } from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import BusinessOutlinedIcon from "@mui/icons-material/BusinessOutlined"
import LinkOutlinedIcon from "@mui/icons-material/LinkOutlined"
import SearchIcon from "@mui/icons-material/Search"
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined"
import { useNavigate } from "@tanstack/react-router"
import { useObterFotoPerfilEmpresa, useObterInformacoesEmpresaPorId } from "@/api/empresa/empresa"
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil"
import { Botao } from "@/components/Botao/Botao"
import { Card } from "@/components/Card/Card"
import { IconeTexto } from "@/components/IconeTexto/IconeTexto"
import { ListaTab } from "@/components/ListaTab/ListaTab"
import { RenderizarTexto } from "@/components/RenderizarTexto/RenderizarTexto"
import { SemDados } from "@/components/SemDados/SemDados"
import { InputNormal } from "@/components/Formulario/InputForm/variantes/Normal/Normal"
import { VagaCard } from "@/pages/Candidato/components/VagaCard"

type DetalhesProps = {
    idEmpresa: number
}

const filtros = ["Todos", "Front-end", "Back-end", "Full Stack", "Mobile", "DevOps"]

export const Detalhes = ({ idEmpresa }: DetalhesProps) => {
    const navigate = useNavigate()
    const [tabSelecionada, setTabSelecionada] = useState("1")
    const [filtroAtivo, setFiltroAtivo] = useState("Todos")
    const [termoBusca, setTermoBusca] = useState("")

    const { data: informacoesEmpresa, isLoading, isRefetching } = useObterInformacoesEmpresaPorId(idEmpresa)
    const { data: fotoEmpresa } = useObterFotoPerfilEmpresa(idEmpresa)
    const vagas = informacoesEmpresa?.vagas

    const tecnologias = useMemo(() => informacoesEmpresa?.tecnologias?.split(",").filter(Boolean) ?? [], [informacoesEmpresa])

    const vagasFiltradas = useMemo(() => {
        const termo = termoBusca.trim().toLowerCase()

        return (vagas ?? []).filter((vaga) => {
            const passouFiltro = filtroAtivo === "Todos" || [vaga.modelo, vaga.nivelExperiencia, vaga.cargo, vaga.tecnologias ?? ""].some((item) =>
                item.toLowerCase().includes(filtroAtivo.toLowerCase())
            )

            const passouBusca = !termo || [vaga.nome, vaga.nomeEmpresa, vaga.cargo, vaga.modelo, vaga.nivelExperiencia, vaga.tecnologias ?? ""].some((item) =>
                item.toLowerCase().includes(termo)
            )

            return passouFiltro && passouBusca
        })
    }, [filtroAtivo, termoBusca, vagas])

    const carregando = isLoading || isRefetching

    return (
        <Grid container spacing={2}>
            <Grid size="grow">
                <Card padding={2}>
                    <Stack spacing={3}>
                        <Stack spacing={2}>
                            <Grid container spacing={1} sx={{ placeItems: "center" }}>
                                <IconButton color="secondary" onClick={() => navigate({ to: "/candidato/vaga" })}>
                                    <KeyboardBackspaceIcon />
                                </IconButton>
                                <AvatarPerfil src={fotoEmpresa} />
                                <Box>
                                    <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.1 }}>
                                        {informacoesEmpresa?.nome ?? "Empresa"}
                                    </Typography>
                                    <Typography variant="subtitle2" color="primary.main">
                                        {informacoesEmpresa?.setor ?? "-"}
                                    </Typography>
                                </Box>
                            </Grid>

                            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 2 }}>
                                <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }}>
                                    <BusinessOutlinedIcon fontSize="small" color="action" />
                                    <Typography variant="caption">{informacoesEmpresa?.setor ?? "-"}</Typography>
                                </Box>
                                <Typography variant="caption">
                                    <b>{informacoesEmpresa?.vagasDisponiveis ?? vagas?.length ?? 0}</b> vagas ativas
                                </Typography>
                                <Typography variant="caption">
                                    <b>{informacoesEmpresa?.candidatos ?? 0}</b> candidaturas
                                </Typography>
                            </Box>

                            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                                {tecnologias.length ? (
                                    tecnologias.map((item, index) => (
                                        <Chip
                                            key={`${item}-${index}`}
                                            label={item}
                                            sx={(theme) => ({
                                                borderRadius: 999,
                                                fontSize: 12,
                                                backgroundColor: theme.palette.grey[100],
                                            })}
                                        />
                                    ))
                                ) : (
                                    <Typography variant="caption" color="text.secondary">Nenhuma tecnologia cadastrada</Typography>
                                )}
                            </Stack>
                        </Stack>

                        <Divider />

                        <TabContext value={tabSelecionada}>
                            <Grid sx={{ width: "fit-content" }}>
                                <ListaTab
                                    onChange={setTabSelecionada}
                                    orientation="horizontal"
                                    variante="semBorda"
                                    tabs={[{
                                        label: "Informações",
                                        value: "1",
                                        selected: {
                                            corFundo: (theme) => theme.palette.grey[200],
                                            cor: "#000"
                                        }
                                    }, {
                                        label: "Vagas",
                                        value: "2",
                                        selected: {
                                            corFundo: (theme) => theme.palette.grey[200],
                                            cor: "#000"
                                        }
                                    }]}
                                />
                            </Grid>

                            <TabPanel value="1">
                                <Stack spacing={3}>
                                    <Stack spacing={1.5}>
                                        <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                                            Sobre a empresa
                                        </Typography>
                                        <RenderizarTexto texto={informacoesEmpresa?.descricao ?? ""} />
                                    </Stack>
                                </Stack>
                            </TabPanel>

                            <TabPanel value="2">
                                <Stack spacing={3}>
                                    <Grid container spacing={2}>
                                        <Grid size={4}>
                                            <InputNormal fullWidth endAdornment={<SearchIcon color="disabled" />} value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} placeholder="Busca vagas por nome, cargo..." />
                                        </Grid>
                                        <Botao cor="secondary">
                                            Buscar
                                        </Botao>
                                    </Grid>

                                    <Stack direction="row" spacing={1.25} sx={{ flexWrap: "wrap" }}>
                                        {filtros.map((filtro) => {
                                            const ativo = filtro === filtroAtivo

                                            return (
                                                <Chip
                                                    key={filtro}
                                                    label={filtro}
                                                    onClick={() => setFiltroAtivo(filtro)}
                                                    icon={filtro === "Todos" ? <FilterAltOutlinedIcon /> : undefined}
                                                    color={ativo ? "primary" : "default"}
                                                />
                                            )
                                        })}
                                    </Stack>

                                    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
                                        {vagasFiltradas.map((vaga) => (
                                            <VagaCard key={vaga.id} vaga={vaga} fotoEmpresa={fotoEmpresa} />
                                        ))}
                                    </Box>

                                    {!carregando && !vagasFiltradas.length && (
                                        <Card padding={3}>
                                            <SemDados descricao="Ajuste o termo de busca ou remova os filtros para ver outras oportunidades." titulo="Nenhuma vaga encontrada" />
                                        </Card>
                                    )}
                                </Stack>
                            </TabPanel>
                        </TabContext>
                    </Stack>
                </Card>
            </Grid>
        </Grid>
    )
}
