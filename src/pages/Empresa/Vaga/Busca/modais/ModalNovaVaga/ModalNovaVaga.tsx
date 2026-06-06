import { Divider, Grid, MenuItem, Stack, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/AddBoxOutlined"
import { MASCARA_CEP, MASCARA_DINHEIRO_REAL } from "@/lib/mascaras"
import { useFormCustomizado } from "@/components/Formulario"
import { Botao } from "@/components/Botao/Botao"
import { ModalBase } from "@/components/ModalBase/ModalBase"
import { useCadastrarVagaEmpresa } from "@/api/vaga/vaga"
import { defaultvalues } from "./ModalNovaVaga.utils"
import { cadastrarVagaSchema } from "./ModalNovaVaga.schema"
import type { ModalBaseGenericaProps } from "@/components/ModalBase/ModalBase.types"

export const ModalNovaVaga = ({ open, handleClose }: ModalBaseGenericaProps) => {
    const { mutateAsync, isPending } = useCadastrarVagaEmpresa()

    const { AppField, Subscribe, handleSubmit, reset } = useFormCustomizado({
        defaultValues: defaultvalues,
        validators: {
            onSubmit: cadastrarVagaSchema,
            onBlur: cadastrarVagaSchema
        },
        onSubmit: async ({ value: { salarioPrevisto, ...resto } }) => {
            await mutateAsync({
                salarioPrevisto: Number(salarioPrevisto),
                ...resto
            })
            onClose()
        }
    })

    const onClose = () => {
        reset()
        handleClose()
    }

    return (
        <ModalBase handleClose={onClose} tamanho="large" open={open}>
            <Stack spacing={4}>
                <Stack spacing={2}>
                    <Stack spacing={1}>
                        <Grid container sx={{ placeItems: "center" }} spacing={0.5}>
                            <AddIcon fontSize="medium" color="action" />
                            <Typography color="textDisabled" variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Nova vaga
                            </Typography>
                        </Grid>
                        <Divider variant="fullWidth" />
                    </Stack>

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
                            <AppField name="interna" children={(field) => (
                                <field.InputForm label="Vaga interna" variante="select" placeholder="Selecione" cor="secondary" >
                                    <MenuItem value={true as unknown as string}>Sim</MenuItem>
                                    <MenuItem value={false as unknown as string}>Não</MenuItem>
                                </field.InputForm>
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
                            <AppField name="descricao" children={(field) => (
                                <field.InputForm label="Descrição" multiline minRows={4} variante="normal" placeholder="Descreva a vaga" cor="secondary" />
                            )} />
                        </Grid>
                    </Grid>
                </Stack>

                <Grid container spacing={1} sx={{ placeContent: "end" }}>
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
