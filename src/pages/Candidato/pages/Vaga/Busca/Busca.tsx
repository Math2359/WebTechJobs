import { useMemo, useState } from "react"
import { Box, Chip, Grid, Stack, Typography } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search"
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined"
import { Card } from "@/components/Card/Card"
import { InputNormal } from "@/components/Formulario/InputForm/variantes/Normal/Normal"
import { SemDados } from "@/components/SemDados/SemDados"
import { useObterVagasDisponiveis } from "@/api/vaga/vaga"
import { useDebounce } from "@/lib/useDebounce"
import { VagaCard } from "@/pages/Candidato/components/VagaCard"
import { SkeletonListaCards } from "@/components/Carregamento/Carregamento"

const filtros = ["Todos", "Front-end", "Back-end", "Full Stack", "Mobile", "DevOps"]

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
            return [vaga.modelo, vaga.nivelExperiencia, vaga.cargo, vaga.tecnologias ?? ""].some((item) =>
                item.toLowerCase().includes(filtroAtivo.toLowerCase())
            )
        })
    }, [filtroAtivo, vagas])

    const carregando = isLoading || isRefetching

    return (
        <Stack spacing={4}>
            <Stack>
                <Typography variant="h6">Vagas</Typography>
                <Typography variant="caption">Encontre a sua próxima oportunidade aqui.</Typography>
            </Stack>

            <Grid container spacing={2}>
                <Grid size={4}>
                    <InputNormal fullWidth endAdornment={<SearchIcon color="disabled" />} value={termoBusca} onChange={(e) => setTermoBusca(e.target.value)} placeholder="Busca vagas por nome, empresa..." />
                </Grid>
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
                {!carregando && vagasFiltradas.map((vaga) => (
                    <VagaCard key={vaga.id} vaga={vaga} />
                ))}
            </Box>

            {carregando && <SkeletonListaCards colunas={3} />}

            {!carregando && !vagasFiltradas.length && (
                <Card padding={3}>
                    <SemDados descricao="Ajuste o termo de busca ou remova os filtros para ver outras oportunidades." titulo="Nenhuma vaga encontrada" />
                </Card>
            )}
        </Stack>
    )
}
