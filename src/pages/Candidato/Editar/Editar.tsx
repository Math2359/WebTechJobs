import { Grid, IconButton, Stack, Typography } from "@mui/material"
import { Card } from "@/components/Card/Card"
import { Botao } from "@/components/Botao/Botao"
import { useFormCustomizado } from "@/components/Formulario"
import { useAtualizarInformacoes, useObterInformacoes } from "@/api/candidato/candidato"
import { useNavigate } from "@tanstack/react-router"
import { useState } from "react"
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import { TabContext, TabPanel } from "@mui/lab"
import { ListaTab } from "@/components/ListaTab/ListaTab"
import { FormularioEditar } from "./FormularioEditar"
import { toast } from "sonner"
import { editarFormOptions } from "./FormularioEditar/FormularioEditar.utils"

export const Editar = () => {
    const { data: informacoesCandidato } = useObterInformacoes()

    const { mutateAsync: atualizarInformacoes } = useAtualizarInformacoes()

    const navigate = useNavigate()

    const form = useFormCustomizado({
        ...editarFormOptions,
        defaultValues: {
            sobreMim: {
                descricao: informacoesCandidato?.descricao ?? undefined,
                preferencias: informacoesCandidato?.preferencias?.split(",").filter(Boolean) ?? [],
                area: informacoesCandidato?.area ?? undefined,
                cidade: informacoesCandidato?.cidade ?? undefined,
                estado: informacoesCandidato?.estado ?? undefined,
                anosExperiencia: informacoesCandidato?.anosExperiencia ?? undefined
            },
            contato: {
                emailPessoal: informacoesCandidato?.emailPessoal ?? undefined,
                emailCorporativo: informacoesCandidato?.emailCorporativo ?? undefined,
                telefone: informacoesCandidato?.telefone ?? undefined,
                linkedin: informacoesCandidato?.linkedin ?? undefined,
                github: informacoesCandidato?.github ?? undefined,
            },
            habilidade: {
                habilidades: informacoesCandidato?.habilidades?.split(",").filter(Boolean) ?? [],
            }
        },
        onSubmit: async ({ value }) => {
            await atualizarInformacoes({
                descricao: value.sobreMim.descricao,
                habilidades: value.habilidade.habilidades?.join(","),
                emailPessoal: value.contato.emailPessoal,
                emailCorporativo: value.contato.emailCorporativo,
                experiencias: [],
                telefone: value.contato.telefone,
                linkedin: value.contato.linkedin,
                github: value.contato.github,
                preferencias: value.sobreMim.preferencias.join(","),
                area: value.sobreMim.area,
                anosExperiencia: value.sobreMim.anosExperiencia ? Number(value.sobreMim.anosExperiencia) : undefined,
                cidade: value.sobreMim.cidade,
                estado: value.sobreMim.estado
            })
            navigate({
                to: "/candidato",
            })
        },
        onSubmitInvalid: ({ formApi: { state: { errors } } }) => {
            const itens = errors.flatMap(erro => {
                const keys = Object.keys(erro)

                return keys.map(chave => {
                    const erroItem = erro[chave]

                    return erroItem.map(item => <Typography variant="caption"><b>{String(item.path?.findLast(x => x))}: </b>{item.message}</Typography>)
                })
            })

            toast.error(<Stack>
                {itens}
            </Stack>)
        }
    })

    const { Subscribe, handleSubmit } = form

    const [tab, setTab] = useState("1")

    return (
        <Stack spacing={4}>
            <Stack>
                <Grid container sx={{ placeItems: "center" }}>
                    <IconButton color="primary" onClick={() => navigate({ to: "/candidato" })}>
                        <KeyboardBackspaceIcon />
                    </IconButton>
                    <Typography variant="h6">Editar perfil</Typography>
                </Grid>
                <Typography variant="caption">Atualize suas informações de contato, habilidades e apresentação.</Typography>
            </Stack>

            <TabContext value={tab}>
                <Grid container spacing={2}>
                    <Grid size={2}>
                        <Stack spacing={2}>
                            <ListaTab onChange={setTab} orientation="vertical" tabs={[{
                                label: "Sobre mim",
                                value: "1",
                                selected: {
                                    corFundo: (theme) => theme.palette.grey[200],
                                    cor: "#000"
                                }
                            }, {
                                label: "Habilidades",
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
                            }]} />

                            <Subscribe
                                selector={selector => [selector.isSubmitting, selector.isDirty]}
                                children={([isSubmitting, isDirty]) => (
                                    <Botao fullWidth disabled={isSubmitting || !isDirty} loading={isSubmitting} type="submit" onClick={handleSubmit}>
                                        Salvar alterações
                                    </Botao>
                                )}
                            />
                        </Stack>

                    </Grid>
                    <Grid size="grow">
                        <Card padding={1}>
                            <TabPanel value="1">
                                <FormularioEditar.SobreMim form={form} />
                            </TabPanel>
                            <TabPanel value="2">
                                <FormularioEditar.Habilidade form={form} />
                            </TabPanel>
                            <TabPanel value="3">
                                <FormularioEditar.Contato form={form} />
                            </TabPanel>
                            <TabPanel value="4">
                                <FormularioEditar.Experiencias form={form} />
                            </TabPanel>
                        </Card>
                    </Grid>
                </Grid>

            </TabContext>
        </Stack>
    )
}