import { useState } from "react"
import { useObterVagasEmpresa } from "@/api/vaga/vaga"
import { GridDados } from "@/components/GridDados/GridDados"
import { useGerarDadosGrid } from "@/components/GridDados/GridDados.hook"
import { Botao } from "@/components/Botao/Botao"
import { Grid, IconButton, Stack, Typography } from "@mui/material"
import { format } from "date-fns"
import { useNavigate } from "@tanstack/react-router"
import Visibility from "@mui/icons-material/Visibility"
import AddIcon from "@mui/icons-material/Add"
import { ModalNovaVaga } from "./modais/ModalNovaVaga/ModalNovaVaga"

export const Busca = () => {
    const [modalAdicionarVaga, setModalAdicionarVaga] = useState(false)
    const { data: vagas, isLoading, isRefetching } = useObterVagasEmpresa()

    const navigate = useNavigate()

    const { dadosGrid } = useGerarDadosGrid({
        colunas: [
            {
                largura: 150,
                nomeHeader: "Nome",
                renderizarValor: (linha) => linha.nome
            },
            {
                largura: 150,
                nomeHeader: "Cargo",
                renderizarValor: (linha) => linha.cargo
            },
            {
                largura: 120,
                nomeHeader: "Modelo",
                renderizarValor: (linha) => linha.modelo
            },
            {
                largura: 180,
                nomeHeader: "Nível de Experiência",
                renderizarValor: (linha) => linha.nivelExperiencia
            },
            {
                largura: 180,
                nomeHeader: "Tecnologias",
                renderizarValor: (linha) => linha.tecnologias
            },
            {
                largura: 150,
                nomeHeader: "Fim das Inscrições",
                renderizarValor: (linha) =>
                    linha.dataFimInscricoes
                        ? format(new Date(linha.dataFimInscricoes), "dd/MM/yyyy")
                        : "-"
            },
            {
                largura: 150,
                nomeHeader: "Aplicações",
                renderizarValor: (linha) => linha.quantidadeAplicacoes
            },
            {
                largura: 150,
                nomeHeader: "Ações",
                renderizarValor: (linha) => <IconButton onClick={() => navigate({
                    to: "/empresa/vaga/$id",
                    params: {
                        id: String(linha.id)
                    }
                })}><Visibility fontSize="small" /></IconButton>
            }
        ],
        linhas: vagas,
        isLoading: isLoading || isRefetching
    });

    return (
        <>
            <Stack spacing={4}>
                <Stack spacing={1}>
                    <Grid container sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                        <Stack>
                            <Typography variant="h6">Minhas vagas</Typography>
                            <Typography variant="caption">Gerencie as suas principais vagas</Typography>
                        </Stack>
                        <Grid>
                            <Botao cor="secondary" onClick={() => setModalAdicionarVaga(true)}>
                                Adicionar vaga <AddIcon />
                            </Botao>
                        </Grid>
                    </Grid>
                </Stack>

                <GridDados {...dadosGrid} />
            </Stack>

            <ModalNovaVaga open={modalAdicionarVaga} handleClose={() => setModalAdicionarVaga(false)} />
        </>
    )
}
