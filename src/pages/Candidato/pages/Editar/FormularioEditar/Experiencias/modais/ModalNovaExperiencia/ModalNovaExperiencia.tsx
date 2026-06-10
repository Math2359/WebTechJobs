import { Grid, Stack } from "@mui/material"
import AddIcon from "@mui/icons-material/AddBoxOutlined"
import type { ModalNovaExperienciaProps } from "./ModalNovaExperiencia.types"
import { experienciaSchema } from "../../../FormularioEditar.schema"
import { useFormCustomizado } from "@/components/Formulario"
import { Botao } from "@/components/Botao/Botao"
import { LABELS_MAPEADAS } from "./ModalNovaExperiencia.utils"
import { ModalBase } from "@/components/ModalBase/ModalBase"

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
        <ModalBase
            handleClose={onClose}
            open={open}
            icone={AddIcon}
            corIcone="primary"
            titulo="Nova experiência"
            subtitulo="Informe os dados para adicionar uma experiência ao perfil."
        >
            <Stack spacing={4}>
                <Stack spacing={2}>
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

                <Grid container spacing={2} sx={{ placeContent: "end" }}>
                    <Botao onClick={onClose} variante="ghost" cor="cinza">Cancelar</Botao>
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
        </ModalBase>
    )
}
