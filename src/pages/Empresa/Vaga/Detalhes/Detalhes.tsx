import { useEffect, useState } from "react"
import { TabContext, TabPanel } from "@mui/lab"
import { Grid, IconButton, MenuItem, Stack, Typography } from "@mui/material"
import KeyboardBackspaceIcon from "@mui/icons-material/KeyboardBackspace"
import Visibility from "@mui/icons-material/Visibility"
import { useNavigate } from "@tanstack/react-router"
import { Botao } from "@/components/Botao/Botao"
import { ListaTab } from "@/components/ListaTab/ListaTab"
import { Card } from "@/components/Card/Card"
import { GridDados } from "@/components/GridDados/GridDados"
import { useGerarDadosGrid } from "@/components/GridDados/GridDados.hook"
import { useFormCustomizado } from "@/components/Formulario"
import { useAtualizarVagaEmpresa, useObterVagaEmpresaPorId } from "@/api/vaga/vaga"
import { MASCARA_CEP, MASCARA_DINHEIRO_REAL } from "@/lib/mascaras"
import { cadastrarVagaSchema } from "../Busca/modais/ModalNovaVaga/ModalNovaVaga.schema"
import { defaultvalues } from "../Busca/modais/ModalNovaVaga/ModalNovaVaga.utils"
import type z from "zod"
import type { Vaga } from "@/api/vaga/vaga.types"

type DetalhesProps = {
    id: number
}

const obterValoresFormulario = (vaga: Vaga): z.infer<typeof cadastrarVagaSchema> => ({
    nome: vaga.nome,
    cargo: vaga.cargo,
    modelo: vaga.modelo,
    nivelExperiencia: vaga.nivelExperiencia,
    descricao: vaga.descricao,
    cep: vaga.cep ?? "",
    numero: vaga.numero ?? "",
    salarioPrevisto: vaga.salarioPrevisto ? String(vaga.salarioPrevisto) : "",
    interna: vaga.interna,
    dataFimInscricoes: vaga.dataFimInscricoes ? new Date(vaga.dataFimInscricoes) : undefined,
})

export const Detalhes = ({ id }: DetalhesProps) => {
    const [tab, setTab] = useState("1")
    const [editando, setEditando] = useState(false)

    const navigate = useNavigate()

    const { data, isLoading, isRefetching } = useObterVagaEmpresaPorId(id)
    const { mutateAsync: atualizarVaga, isPending } = useAtualizarVagaEmpresa()

    const { AppField, Subscribe, handleSubmit, reset } = useFormCustomizado({
        defaultValues: defaultvalues,
        validators: {
            onSubmit: cadastrarVagaSchema,
            onBlur: cadastrarVagaSchema
        },
        onSubmit: async ({ value: { salarioPrevisto, ...resto } }) => {
            await atualizarVaga({
                id,
                salarioPrevisto: Number(salarioPrevisto),
                ...resto
            })
            setEditando(false)
        }
    })

    useEffect(() => {
        if (data?.vaga) reset(obterValoresFormulario(data.vaga))
    }, [data?.vaga, reset])

    const aplicacoes = data?.aplicacoes ?? []

    const { dadosGrid } = useGerarDadosGrid({
        colunas: [
            {
                largura: 80,
                nomeHeader: "ID",
                renderizarValor: (linha) => linha.id
            },
            {
                largura: 180,
                nomeHeader: "Nome",
                renderizarValor: (linha) => linha.nome
            },
            {
                largura: 220,
                nomeHeader: "E-mail",
                renderizarValor: (linha) => linha.email
            },
            {
                largura: 120,
                nomeHeader: "Ações",
                renderizarValor: () => (
                    <IconButton color="secondary">
                        <Visibility />
                    </IconButton>
                )
            }
        ],
        linhas: aplicacoes,
        isLoading: isLoading || isRefetching
    })

    const cancelarEdicao = () => {
        if (data?.vaga) reset(obterValoresFormulario(data.vaga))
        setEditando(false)
    }

    return (
        <Stack spacing={4}>
            <Grid container sx={{ placeItems: "center", justifyContent: "space-between" }}>
                <Stack>
                    <Grid container sx={{ placeItems: "center" }}>
                        <IconButton color="secondary" onClick={() => navigate({ to: "/empresa/vaga" })}>
                            <KeyboardBackspaceIcon />
                        </IconButton>
                        <Typography variant="h6">Detalhes da vaga</Typography>
                    </Grid>
                    <Typography variant="caption">Visualize os dados da vaga e acompanhe suas aplicações.</Typography>
                </Stack>
            </Grid>

            <TabContext value={tab}>
                <Grid container spacing={2}>
                    <Grid size={2}>
                        <Stack spacing={2}>
                            <ListaTab onChange={setTab} orientation="vertical" tabs={[{
                                label: "Dados",
                                value: "1",
                                selected: {
                                    corFundo: (theme) => theme.palette.grey[200],
                                    cor: "#000"
                                }
                            }, {
                                label: "Aplicações",
                                value: "2",
                                selected: {
                                    corFundo: (theme) => theme.palette.grey[200],
                                    cor: "#000"
                                }
                            }]} />
                        </Stack>
                    </Grid>

                    <Grid size="grow">
                        <Card padding={1}>
                            <TabPanel value="1">
                                <Stack spacing={4}>
                                    <Grid spacing={2} container sx={{ placeItems: "center", justifyContent: "space-between" }}>
                                        <Typography variant="overline">Dados</Typography>
                                        <Botao cor="secondary" disabled={isLoading || editando} onClick={() => setEditando(true)}>
                                            Editar
                                        </Botao>
                                    </Grid>
                                    <Grid container spacing={2}>
                                        <Grid size={4}>
                                            <AppField name="nome" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Nome da vaga" variante="normal" placeholder="Digite o nome da vaga" cor="secondary" />
                                            )} />
                                        </Grid>
                                        <Grid size={4}>
                                            <AppField name="cargo" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Cargo" variante="normal" placeholder="Digite o cargo" cor="secondary" />
                                            )} />
                                        </Grid>
                                        <Grid size={4}>
                                            <AppField name="modelo" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Modelo" variante="normal" placeholder="Ex: Presencial, Remoto" cor="secondary" />
                                            )} />
                                        </Grid>
                                        <Grid size={4}>
                                            <AppField name="nivelExperiencia" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Nível de experiência" variante="normal" placeholder="Ex: Júnior, Pleno" cor="secondary" />
                                            )} />
                                        </Grid>
                                        <Grid size={4}>
                                            <AppField name="salarioPrevisto" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Salário previsto" variante="mascara" mask={MASCARA_DINHEIRO_REAL} placeholder="Valor aproximado" cor="secondary" />
                                            )} />
                                        </Grid>
                                        <Grid size={4}>
                                            <AppField name="interna" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Vaga interna" variante="select" placeholder="Selecione" cor="secondary" >
                                                    <MenuItem value={true as unknown as string}>Sim</MenuItem>
                                                    <MenuItem value={false as unknown as string}>Não</MenuItem>
                                                </field.InputForm>
                                            )} />
                                        </Grid>
                                        <Grid size={4}>
                                            <AppField name="dataFimInscricoes" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Fim das inscrições" type="date" variante="data" cor="secondary" />
                                            )} />
                                        </Grid>
                                        <Grid size={4}>
                                            <AppField name="cep" children={(field) => (
                                                <field.InputForm disabled={!editando} label="CEP" variante="mascara" placeholder="Digite o CEP" mask={MASCARA_CEP} cor="secondary" />
                                            )} />
                                        </Grid>
                                        <Grid size={4}>
                                            <AppField name="numero" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Número" variante="normal" placeholder="Número do endereço" cor="secondary" />
                                            )} />
                                        </Grid>
                                        <Grid size={12}>
                                            <AppField name="descricao" children={(field) => (
                                                <field.InputForm disabled={!editando} label="Descrição" multiline minRows={4} variante="normal" placeholder="Descreva a vaga" cor="secondary" />
                                            )} />
                                        </Grid>
                                    </Grid>
                                    {editando &&
                                        <Grid container spacing={1} sx={{ justifyContent: "end" }}>
                                            <Botao variante="ghost" cor="cinza" disabled={isPending} onClick={cancelarEdicao}>
                                                Cancelar
                                            </Botao>
                                            <Subscribe selector={(selector) => [selector.isSubmitting, selector.isDirty]} children={([isSubmitting, isDirty]) => (
                                                <Botao cor="secondary" disabled={isSubmitting || isPending || !isDirty} loading={isSubmitting || isPending} type="submit" onClick={handleSubmit}>
                                                    Confirmar
                                                </Botao>
                                            )} />
                                        </Grid>
                                    }
                                </Stack>
                            </TabPanel>

                            <TabPanel value="2">
                                <GridDados {...dadosGrid} />
                            </TabPanel>
                        </Card>
                    </Grid>
                </Grid>
            </TabContext>
        </Stack>
    )
}
