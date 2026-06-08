import { Divider, Grid, Stack, Typography } from "@mui/material"
import EventAvailableOutlinedIcon from "@mui/icons-material/EventAvailableOutlined"
import { toast } from "sonner"
import { Botao } from "@/components/Botao/Botao"
import { useFormCustomizado } from "@/components/Formulario"
import { ModalBase } from "@/components/ModalBase/ModalBase"
import { agendarEntrevistaSchema } from "./ModalAgendarEntrevista.schema"
import { valoresIniciaisAgendarEntrevista } from "./ModalAgendarEntrevista.utils"
import type { ModalAgendarEntrevistaProps } from "./ModalAgendarEntrevista.types"

export const ModalAgendarEntrevista = ({ open, handleClose, candidato }: ModalAgendarEntrevistaProps) => {
    const { AppField, Subscribe, handleSubmit, reset } = useFormCustomizado({
        defaultValues: valoresIniciaisAgendarEntrevista,
        validators: {
            onSubmit: agendarEntrevistaSchema,
            onBlur: agendarEntrevistaSchema
        },
        onSubmit: async () => {
            toast.success("Entrevista agendada com sucesso!")
            onClose()
        }
    })

    const onClose = () => {
        reset()
        handleClose()
    }

    return (
        <ModalBase handleClose={onClose} tamanho="medium" open={open}>
            <Stack spacing={4}>
                <Stack spacing={1}>
                    <Stack>
                        <Grid container sx={{ placeItems: "center" }} spacing={0.5}>
                            <EventAvailableOutlinedIcon fontSize="medium" color="action" />
                            <Typography color="textDisabled" variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Agendar entrevista
                            </Typography>
                        </Grid>
                        <Typography variant="subtitle2" sx={{ fontSize: 12 }}>
                            Defina a entrevista com {candidato?.nome ?? "o candidato"}.
                        </Typography>
                    </Stack>
                    <Divider variant="fullWidth" />
                </Stack>

                <Grid container spacing={2}>
                    <Grid size={6}>
                        <AppField name="data" children={(field) => (
                            <field.InputForm label="Data" type="date" variante="data" cor="secondary" />
                        )} />
                    </Grid>
                    <Grid size={6}>
                        <AppField name="hora" children={(field) => (
                            <field.InputForm label="Horário" type="time" variante="normal" cor="secondary" />
                        )} />
                    </Grid>
                    <Grid size={12}>
                        <AppField name="local" children={(field) => (
                            <field.InputForm label="Local ou link" variante="normal" placeholder="Ex: Google Meet, Teams ou endereço" cor="secondary" />
                        )} />
                    </Grid>
                    <Grid size={12}>
                        <AppField name="observacao" children={(field) => (
                            <field.InputForm label="Observação" multiline minRows={3} variante="normal" placeholder="Adicione instruções para a entrevista" cor="secondary" />
                        )} />
                    </Grid>
                </Grid>

                <Grid container spacing={1} sx={{ placeContent: "end" }}>
                    <Botao onClick={onClose} variante="ghost" cor="cinza">Cancelar</Botao>
                    <Subscribe selector={(selector) => [selector.isSubmitting]} children={([isSubmitting]) => (
                        <Botao cor="secondary" loading={isSubmitting} type="submit" onClick={handleSubmit}>
                            Agendar
                        </Botao>
                    )} />
                </Grid>
            </Stack>
        </ModalBase>
    )
}
