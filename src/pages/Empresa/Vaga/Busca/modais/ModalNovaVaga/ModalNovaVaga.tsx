import { Chip, Grid, IconButton, Stack, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/Add"
import { MASCARA_CEP, MASCARA_DINHEIRO_REAL } from "@/lib/mascaras"
import { useFormCustomizado } from "@/components/Formulario"
import { Botao } from "@/components/Botao/Botao"
import { ModalBase } from "@/components/ModalBase/ModalBase"
import { useCadastrarVagaEmpresa } from "@/api/vaga/vaga"
import { defaultvalues } from "./ModalNovaVaga.utils"
import { cadastrarVagaSchema } from "./ModalNovaVaga.schema"
import DeleteIcon from '@mui/icons-material/Delete';
import type { ModalBaseGenericaProps } from "@/components/ModalBase/ModalBase.types"
import { InputNormal } from "@/components/Formulario/InputForm/variantes/Normal/Normal"
import { useState } from "react"

export const ModalNovaVaga = ({ open, handleClose }: ModalBaseGenericaProps) => {
    const { mutateAsync, isPending } = useCadastrarVagaEmpresa()

    const { AppField, Subscribe, handleSubmit, reset } = useFormCustomizado({
        defaultValues: defaultvalues,
        validators: {
            onSubmit: cadastrarVagaSchema,
            onBlur: cadastrarVagaSchema
        },
        onSubmit: async ({ value: { salarioPrevisto, tecnologias, ...resto } }) => {
            await mutateAsync({
                salarioPrevisto: Number(salarioPrevisto),
                tecnologias: tecnologias.join(","),
                ...resto
            })
            onClose()
        }
    })

    const onClose = () => {
        reset()
        handleClose()
    }

    const [tecnologia, setTecnologia] = useState("")

    return (
        <ModalBase
            handleClose={onClose}
            tamanho="large"
            open={open}
            icone={AddIcon}
            titulo="Nova vaga"
            subtitulo="Preencha os dados para cadastrar uma nova vaga."
            corIcone="secondary"
        >
            <Stack spacing={4}>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <Grid size={4}>
                            <AppField name="nome" children={(field) => (
                                <field.InputForm label="Nome da vaga" variante="normal" placeholder="Digite o nome da vaga" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={4}>
                            <AppField name="cargo" children={(field) => (
                                <field.InputForm label="Cargo" variante="normal" placeholder="Digite o cargo" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={4}>
                            <AppField name="modelo" children={(field) => (
                                <field.InputForm label="Modelo" variante="normal" placeholder="Ex: Presencial, Remoto" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={4}>
                            <AppField name="nivelExperiencia" children={(field) => (
                                <field.InputForm label="Nível de experiência" variante="normal" placeholder="Ex: Júnior, Pleno" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={4}>
                            <AppField name="salarioPrevisto" children={(field) => (
                                <field.InputForm label="Salário previsto" variante="mascara" mask={MASCARA_DINHEIRO_REAL} placeholder="Valor aproximado" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={4}>
                            <AppField name="dataFimInscricoes" children={(field) => (
                                <field.InputForm label="Fim das inscrições" type="date" variante="data" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={4}>
                            <AppField name="cep" children={(field) => (
                                <field.InputForm label="CEP" variante="mascara" placeholder="Digite o CEP" mask={MASCARA_CEP} cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={4}>
                            <AppField name="numero" children={(field) => (
                                <field.InputForm label="Número" variante="normal" placeholder="Número do endereço" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={12}>
                            <AppField name="tecnologias" children={(field) => (
                                <Stack spacing={0.5}>
                                    <Typography variant="body2">Tecnologias (máx. 7):</Typography>
                                    <Grid container>
                                        <Grid size="grow">
                                            <InputNormal
                                                cor="secondary"
                                                sx={{ width: "100%" }}
                                                placeholder="Digite uma tecnologia"
                                                value={tecnologia}
                                                onChange={(event) => setTecnologia(event.target.value)}
                                            />
                                        </Grid>

                                        <IconButton disabled={field.state.value.length >= 7} onClick={() => field.pushValue(tecnologia)}>
                                            <AddIcon />
                                        </IconButton>
                                    </Grid>
                                    <field.TextoErro />

                                    <Grid spacing={1} container>
                                        {field.state.value.map((item, index) => (
                                            <Chip
                                                key={index}
                                                color="secondary"
                                                label={item}
                                                deleteIcon={<DeleteIcon color="error" fontSize="small" />}
                                                onDelete={() => field.removeValue(index)}
                                            />
                                        ))}
                                    </Grid>
                                </Stack>
                            )} />
                        </Grid>
                        <Grid size={12}>
                            <AppField name="descricao" children={(field) => (
                                <field.InputForm label="Descrição" multiline minRows={4} variante="normal" placeholder="Descreva a vaga" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={6}>
                            <AppField name="requisitos" children={(field) => (
                                <field.InputForm label="Requisitos" multiline minRows={4} variante="normal" placeholder="Liste os requisitos da vaga" cor="secondary" />
                            )} />
                        </Grid>
                        <Grid size={6}>
                            <AppField name="beneficios" children={(field) => (
                                <field.InputForm label="Benefícios" multiline minRows={4} variante="normal" placeholder="Liste os benefícios oferecidos" cor="secondary" />
                            )} />
                        </Grid>
                    </Grid>
                </Stack>

                <Grid container spacing={2} sx={{ placeContent: "end" }}>
                    <Botao onClick={onClose} variante="ghost" cor="cinza">Cancelar</Botao>
                    <Subscribe selector={(selector) => [selector.isSubmitting]} children={([isSubmitting]) => (
                        <Botao cor="secondary" loading={isPending || isSubmitting} type="submit" onClick={handleSubmit}>
                            Cadastrar vaga
                        </Botao>
                    )} />
                </Grid>
            </Stack>
        </ModalBase>
    )
}
