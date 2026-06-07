import { useMemo, useState } from "react"
import { Box, Chip, Stack, Typography } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"
import { Card } from "@/components/Card/Card"
import { SemDados } from "@/components/SemDados/SemDados"
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil"
import { useObterAplicacoesCandidato } from "@/api/candidato/candidato"
import { useObterFotoPerfilEmpresa } from "@/api/empresa/empresa"
import { formatarTempoCadastro } from "@/lib/utils"
import type { AplicacaoVagaCandidato } from "@/api/candidato/candidato.types"
import { SITUACAO_MAPEADA } from "../Vaga/Detalhes/Detalhes.utils"
import type { Situacao } from "@/lib/dominios/situacao"

const situacao_mapeada = Object.entries(SITUACAO_MAPEADA).map(([situacao, configuracao]) => ({
    situacao: Number(situacao) as Situacao,
    ...configuracao,
}))

const AplicacaoItem = ({ aplicacao }: { aplicacao: AplicacaoVagaCandidato }) => {
    const navigate = useNavigate()
    const { data: avatar } = useObterFotoPerfilEmpresa(aplicacao.idEmpresa)
    const estilo = SITUACAO_MAPEADA[aplicacao.situacao!]

    return (
        <Box
            onClick={() => navigate({ to: "/candidato/vaga/$id", params: { id: String(aplicacao.id) } })}
            sx={{
                cursor: "pointer",
            }}
        >
            <Card padding={1.5}>
                <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 2 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <AvatarPerfil src={avatar} tamanho={40} />
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                                {aplicacao.nome}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {aplicacao.nomeEmpresa} - {aplicacao.modelo} - {aplicacao.interna ? "PJ" : "CLT"}
                            </Typography>
                        </Box>
                    </Box>

                    <Box sx={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 1 }}>
                        <Chip
                            label={aplicacao.situacao}
                            size="small"
                            sx={{
                                borderRadius: 999,
                                backgroundColor: estilo.corFundo,
                                color: estilo.cor,
                                fontWeight: 700,
                            }}
                        />
                        <Typography variant="caption" color="text.secondary">
                            {aplicacao.dataCadastro ? formatarTempoCadastro(new Date(aplicacao.dataCadastro)) : "-"}
                        </Typography>
                    </Box>
                </Box>
            </Card>
        </Box>
    )
}

export const Candidaturas = () => {
    const [filtroAtivo, setFiltroAtivo] = useState<Situacao>()
    const { data, isLoading, isRefetching } = useObterAplicacoesCandidato()

    const aplicacoes = useMemo(() => {
        return (data ?? []).filter((item) => !filtroAtivo || item.situacao === filtroAtivo)
    }, [data, filtroAtivo])

    const carregando = isLoading || isRefetching

    return (
        <Stack spacing={3}>
            <Stack spacing={0.5}>
                <Typography variant="h4" sx={{ fontWeight: 700, textAlign: "left" }}>
                    Minhas candidaturas
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    Acompanhe o status das suas candidaturas
                </Typography>
            </Stack>

            <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                <Chip
                    label={`Todas (${data?.length ?? 0})`}
                    onClick={() => setFiltroAtivo(undefined)}
                    sx={(theme) => ({
                        borderRadius: 999,
                        border: "1px solid",
                        borderColor: !filtroAtivo ? theme.palette.primary.main : theme.palette.grey[300],
                        backgroundColor: !filtroAtivo ? theme.palette.primary.light : theme.palette.background.paper,
                        fontWeight: 500,
                    })}
                />
                {situacao_mapeada.map((item) => {
                    const ativo = filtroAtivo === item.situacao
                    const total = data?.filter((aplicacao) => aplicacao.situacao === item.situacao).length ?? 0

                    return (
                        <Chip
                            key={item.situacao}
                            label={`${item.descricao} (${total})`}
                            onClick={() => setFiltroAtivo(item.situacao)}
                            sx={(theme) => ({
                                borderRadius: 999,
                                border: "1px solid",
                                borderColor: ativo ? theme.palette.primary.main : theme.palette.grey[300],
                                backgroundColor: ativo ? theme.palette.primary.light : theme.palette.background.paper,
                                fontWeight: 500,
                            })}
                        />
                    )
                })}
            </Stack>

            <Stack spacing={1}>
                {aplicacoes.map((aplicacao) => (
                    <AplicacaoItem key={aplicacao.id} aplicacao={aplicacao} />
                ))}
            </Stack>

            {!carregando && !aplicacoes.length && (
                <Card padding={3}>
                    <SemDados titulo="Nenhuma candidatura encontrada" descricao="Altere o filtro para ver outras aplicações." />
                </Card>
            )}
        </Stack>
    )
}
