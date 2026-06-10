import { Grid, Stack, Typography } from "@mui/material"
import { useNavigate } from "@tanstack/react-router"
import { useAtualizarInformacoesEmpresa, useObterInformacoesEmpresa } from "@/api/empresa/empresa";
import { useFormCustomizado } from "@/components/Formulario";
import { editarFormOptions } from "./FormularioEditar/FormularioEditar.utils";
import { toast } from "sonner";
import { useState } from "react";
import { TabContext, TabPanel } from "@mui/lab";
import { ListaTab } from "@/components/ListaTab/ListaTab";
import { Botao } from "@/components/Botao/Botao";
import { Card } from "@/components/Card/Card";
import { FormularioEditar } from "./FormularioEditar";
import { SkeletonFormulario } from "@/components/Carregamento/Carregamento";
import type { ObterInformacoesResponse } from "@/api/empresa/empresa.types";

export const Editar = () => {
    const { data: informacoesEmpresa, isLoading, isRefetching } = useObterInformacoesEmpresa()

    if ((isLoading || isRefetching) && !informacoesEmpresa) {
        return (
            <Stack spacing={4}>
                <Stack>
                    <Typography variant="h6">Editar perfil</Typography>
                    <Typography variant="caption">Atualize suas informaÃ§Ãµes de contato e apresentaÃ§Ã£o.</Typography>
                </Stack>
                <SkeletonFormulario />
            </Stack>
        )
    }

    return <FormularioEdicao informacoesEmpresa={informacoesEmpresa} />
}

const FormularioEdicao = ({ informacoesEmpresa }: { informacoesEmpresa?: ObterInformacoesResponse }) => {
    const { mutateAsync: atualizarInformacoes } = useAtualizarInformacoesEmpresa()

    const navigate = useNavigate()

    const form = useFormCustomizado({
        ...editarFormOptions,
        defaultValues: {
            sobreEmpresa: {
                descricao: informacoesEmpresa?.descricao,
                setor: informacoesEmpresa?.setor,
                tecnologias: informacoesEmpresa?.tecnologias?.split(",").filter(Boolean) ?? []
            },
            contato: {
                linkSite: informacoesEmpresa?.linkSite
            }
        },
        onSubmit: async ({ value }) => {
            await atualizarInformacoes({
                descricao: value.sobreEmpresa.descricao,
                linkSite: value.contato.linkSite,
                setor: value.sobreEmpresa.setor,
                tecnologias: value.sobreEmpresa.tecnologias?.join(",")
            })
            navigate({
                to: "/empresa",
            })
        },
        onSubmitInvalid: ({ formApi: { state: { errors } } }) => {
            const itens = errors.flatMap(erro => {
                const keys = Object.keys(erro)

                return keys.map(chave => {
                    const erroItem = erro[chave]

                    return erroItem.map((item, index) => <Typography key={index} variant="caption"><b>{String(item.path?.findLast(x => x))}: </b>{item.message}</Typography>)
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
                <Typography variant="h6">Editar perfil</Typography>
                <Typography variant="caption">Atualize suas informações de contato e apresentação.</Typography>
            </Stack>

            <TabContext value={tab}>
                <Grid container spacing={2}>
                    <Grid size={2}>
                        <Stack spacing={2}>
                            <ListaTab onChange={setTab} orientation="vertical" tabs={[{
                                label: "Sobre",
                                value: "1",
                                selected: {
                                    corFundo: (theme) => theme.palette.grey[200],
                                    cor: "#000"
                                }
                            }, {
                                label: "Contato",
                                value: "2",
                                selected: {
                                    corFundo: (theme) => theme.palette.grey[200],
                                    cor: "#000"
                                }
                            }]} />

                            <Subscribe
                                selector={selector => [selector.isSubmitting, selector.isDirty]}
                                children={([isSubmitting, isDirty]) => (
                                    <Botao cor="secondary" fullWidth disabled={isSubmitting || !isDirty} loading={isSubmitting} color="secondary" type="submit" onClick={handleSubmit}>
                                        Salvar alterações
                                    </Botao>
                                )}
                            />
                        </Stack>

                    </Grid>
                    <Grid size="grow">
                        <Card padding={1}>
                            <TabPanel value="1">
                                <FormularioEditar.SobreEmpresa form={form} />
                            </TabPanel>
                            <TabPanel value="2">
                                <FormularioEditar.Contato form={form} />
                            </TabPanel>
                        </Card>
                    </Grid>
                </Grid>

            </TabContext>
        </Stack>
    )
}
