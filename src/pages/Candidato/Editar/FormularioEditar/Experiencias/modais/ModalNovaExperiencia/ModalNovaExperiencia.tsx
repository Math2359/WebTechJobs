import { Box, Divider, Grid, Modal, Stack, Typography } from "@mui/material"
import AddIcon from "@mui/icons-material/AddBoxOutlined"
import type { ModalNovaExperienciaProps } from "./ModalNovaExperiencia.types"
import { experienciaSchema } from "../../../FormularioEditar.schema"
import { useFormCustomizado } from "@/components/Formulario"
import { Botao } from "@/components/Botao/Botao"
import { LABELS_MAPEADAS } from "./ModalNovaExperiencia.utils"

export const ModalNovaExperiencia = ({ handleClose, open, tipoExperiencia, salvar }: ModalNovaExperienciaProps) => {
    const { AppField, Subscribe, handleSubmit, reset } = useFormCustomizado({
        defaultValues: {
            instituicao: "",
            descricao: "",
            dataInicio: undefined! as Date,
            dataFim: undefined as Date | undefined,
            tipoExperiencia
        },
        validators: {
            onSubmit: experienciaSchema,
            onBlur: experienciaSchema
        },
        onSubmit: ({ value }) => {
            salvar(value)
            onClose()
        }
    })

    const onClose = () => {
        reset()
        handleClose()
    }

    return (
        <Modal open={open} onClose={onClose}>
            <Box sx={{
                position: "absolute",
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                background: "#fff",
                padding: 2,
                borderRadius: 5,
                width: 600
            }}>
                <Stack spacing={4}>
                    <Stack spacing={2}>
                        <Stack spacing={1}>
                            <Grid container sx={{ placeItems: "center" }} spacing={0.5}>
                                <AddIcon fontSize="medium" color="action" />
                                <Typography color="textDisabled"  variant="subtitle1" sx={{ fontWeight: 600 }}>Nova experiência</Typography>
                            </Grid>
                            <Divider variant="fullWidth" />
                        </Stack>

                        <Grid container spacing={2}>
                            <Grid size={6}>
                                <AppField children={(field) => (
                                    <field.InputForm label={LABELS_MAPEADAS.Instituicao[tipoExperiencia]} variante="normal" placeholder={`Digite o nome da ${LABELS_MAPEADAS.Instituicao[tipoExperiencia].toLowerCase()}`} />
                                )} name="instituicao" />
                            </Grid>
                            <Grid size={6}>
                                <AppField children={(field) => (
                                    <field.InputForm label={LABELS_MAPEADAS.Descricao[tipoExperiencia]} variante="normal" placeholder={`Digite o nome do ${LABELS_MAPEADAS.Descricao[tipoExperiencia].toLowerCase()}`} />
                                )} name="descricao" />
                            </Grid>
                            <Grid size={6}>
                                <AppField children={(field) => (
                                    <field.InputForm label="Data início" type="date" variante="data" />
                                )} name="dataInicio" />
                            </Grid>
                            <Grid size={6}>
                                <AppField children={(field) => (
                                    <field.InputForm label="Data fim" type="date" variante="data" />
                                )} name="dataFim" />
                            </Grid>
                        </Grid>
                    </Stack>

                    <Grid container spacing={1} sx={{ placeContent: "end" }}>
                        <Botao onClick={onClose} variante="outlined" cor="cinza">Cancelar</Botao>
                        <Subscribe
                            selector={selector => [selector.isSubmitting]}
                            children={([isSubmitting]) => (
                                <Botao loading={isSubmitting} type="submit" onClick={handleSubmit}>
                                    Adicionar
                                </Botao>
                            )}
                        />
                    </Grid>

                </Stack>

            </Box>
        </Modal>
    )
}