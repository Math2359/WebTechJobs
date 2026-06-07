import { useMemo, useState } from "react"
import { Box, Chip, InputBase, Stack, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded"
import ScheduleIcon from "@mui/icons-material/Schedule"
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined"
import { useNavigate } from "@tanstack/react-router"
import { Botao } from "@/components/Botao/Botao"
import { Card } from "@/components/Card/Card"
import { useObterVagasDisponiveis } from "@/api/vaga/vaga"
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil"
import { useObterFotoPerfilEmpresa } from "@/api/empresa/empresa"
import { formatarReal, formatarTempoCadastro } from "@/lib/utils"
import { SemDados } from "@/components/SemDados/SemDados"
import { useDebounce } from "@/lib/useDebounce"
import type { Vaga } from "@/api/vaga/vaga.types"

const filtros = ["Todos", "Front-end", "Back-end", "Full Stack", "Mobile", "DevOps"]

const VagaCard = ({ vaga }: { vaga: Vaga & { nomeEmpresa: string } }) => {
    const { data } = useObterFotoPerfilEmpresa(vaga.idEmpresa)
    const navigate = useNavigate()

    return (
        <Card padding={2}>
            <Stack spacing={2}>
                <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                    <AvatarPerfil src={data} />
                    <Stack spacing={0.25}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                            {vaga.nome}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                            {vaga.nomeEmpresa}
                        </Typography>
                    </Stack>
                </Box>

                <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                    {[vaga.modelo, vaga.interna ? "PJ" : "CLT", vaga.nivelExperiencia].map((tag) => (
                        <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            sx={(theme) => ({
                                borderRadius: 999,
                                fontSize: 11,
                                height: 24,
                                backgroundColor: theme.palette.grey[100],
                            })}
                        />
                    ))}
                </Stack>

                <Stack spacing={0.75}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <WorkOutlineRoundedIcon fontSize="small" color="action" />
                        <Typography variant="caption">
                            Salário: <b>{vaga.salarioPrevisto ? formatarReal(vaga.salarioPrevisto) : "-"}</b>
                        </Typography>
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 1 }}>
                        <Botao
                            variante="outlined"
                            cor="primary"
                            onClick={() => navigate({ to: "/candidato/vaga/$id", params: { id: String(vaga.id) } })}
                        >
                            Candidatar-se
                        </Botao>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <ScheduleIcon fontSize="small" color="disabled" />
                            <Typography variant="caption" color="text.secondary">
                                Há {formatarTempoCadastro(vaga.dataCadastro)}
                            </Typography>
                        </Box>
                    </Box>
                </Stack>
            </Stack>
        </Card>
    )
}

export const Busca = () => {
    const [filtroAtivo, setFiltroAtivo] = useState("Todos")
    const [termoBusca, setTermoBusca] = useState<string>()

    const termoDebounce = useDebounce(termoBusca, 700)
    const { data: vagas, isLoading, isRefetching } = useObterVagasDisponiveis({
        termoBusca: termoDebounce
    })

    const vagasFiltradas = useMemo(() => {
        return (vagas ?? []).filter((vaga) => {
            if (filtroAtivo === "Todos") return true
            return [vaga.modelo, vaga.nivelExperiencia, vaga.cargo].some((item) =>
                item.toLowerCase().includes(filtroAtivo.toLowerCase())
            )
        })
    }, [filtroAtivo, vagas])

    const carregando = isLoading || isRefetching

    return (
        <Stack spacing={4}>
            <Stack spacing={0.5}>
                <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "left" }}>
                    Vagas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Encontre sua próxima oportunidade
                </Typography>
            </Stack>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) 240px" }, gap: 2, alignItems: "center" }}>
                <Box
                    sx={(theme) => ({
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        border: "1.5px solid",
                        borderColor: theme.palette.secondary.main,
                        borderRadius: 2,
                        px: 2,
                        py: 1.25,
                        backgroundColor: theme.palette.background.paper,
                    })}
                >
                    <SearchIcon color="action" fontSize="small" />
                    <InputBase
                        fullWidth
                        placeholder="Qual o cargo? Digite uma palavra chave"
                        value={termoBusca}
                        onChange={(event) => setTermoBusca(event.target.value)}
                        sx={{ fontSize: 14 }}
                    />
                </Box>
                <Botao cor="secondary" fullWidth>
                    Buscar
                </Botao>
            </Box>

            <Stack direction="row" spacing={1.25} sx={{ flexWrap: "wrap" }}>
                {filtros.map((filtro) => {
                    const ativo = filtro === filtroAtivo

                    return (
                        <Chip
                            key={filtro}
                            label={filtro}
                            onClick={() => setFiltroAtivo(filtro)}
                            icon={filtro === "Todos" ? <FilterAltOutlinedIcon /> : undefined}
                            sx={(theme) => ({
                                borderRadius: 999,
                                px: 0.5,
                                height: 34,
                                border: "1px solid",
                                borderColor: ativo ? theme.palette.primary.main : theme.palette.grey[300],
                                backgroundColor: ativo ? theme.palette.primary.light : theme.palette.background.paper,
                                color: theme.palette.text.primary,
                                fontWeight: 500,
                            })}
                        />
                    )
                })}
            </Stack>

            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3, minmax(0, 1fr))" }, gap: 2 }}>
                {vagasFiltradas.map((vaga) => (
                    <VagaCard key={vaga.id} vaga={vaga} />
                ))}
            </Box>

            {!carregando && !vagasFiltradas.length && (
                <Card padding={3}>
                    <SemDados descricao="Ajuste o termo de busca ou remova os filtros para ver outras oportunidades." titulo="Nenhuma vaga encontrada" />
                </Card>
            )}
        </Stack>
    )
}
