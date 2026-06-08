import { Box, Grid, Stack, Typography } from "@mui/material"
import CheckCircleOutlinedIcon from "@mui/icons-material/CheckCircleOutlined"
import HighlightOffIcon from "@mui/icons-material/HighlightOff"
import { toast } from "sonner"
import { Botao } from "@/components/Botao/Botao"
import { useFormCustomizado } from "@/components/Formulario"
import { ModalBase } from "@/components/ModalBase/ModalBase"
import { avaliacaoCandidatoSchema } from "./ModalAvaliacaoCandidato.schema"
import { obterTextoAvaliacaoCandidato, valoresIniciaisAvaliacaoCandidato } from "./ModalAvaliacaoCandidato.utils"
import type { ModalAvaliacaoCandidatoProps } from "./ModalAvaliacaoCandidato.types"

export const ModalAvaliacaoCandidato = ({ open, handleClose, acao, candidato }: ModalAvaliacaoCandidatoProps) => {
    const texto = obterTextoAvaliacaoCandidato(acao)
    const Icone = acao === "aprovar" ? CheckCircleOutlinedIcon : HighlightOffIcon

    const { AppField, Subscribe, handleSubmit, reset } = useFormCustomizado({
        defaultValues: valoresIniciaisAvaliacaoCandidato,
        validators: {
            onSubmit: avaliacaoCandidatoSchema,
            onBlur: avaliacaoCandidatoSchema
        },
        onSubmit: async () => {
            toast.success(texto.mensagem)
            onClose()
        }
    })

    const onClose = () => {
        reset()
        handleClose()
    }

    return (
        <ModalBase open={open} handleClose={onClose} tamanho="small">
            <Stack spacing={4}>
                <Stack sx={{ placeItems: "center" }} spacing={1}>
                    <Box sx={(theme) => ({
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        background: acao === "aprovar" ? theme.palette.success.light : theme.palette.error.light,
                        padding: theme.spacing(1),
                        borderRadius: theme.spacing(1),
                        width: theme.spacing(7),
                        height: theme.spacing(7)
                    })}>
                        <Icone fontSize="large" sx={{ color: (theme) => acao === "aprovar" ? theme.palette.success.contrastText : theme.palette.error.contrastText }} />
                    </Box>
                    <Typography variant="body1" color="text.secondary">
                        {texto.descricao} {candidato?.nome ?? "este candidato"}?
                    </Typography>
                </Stack>

                <AppField name="observacao" children={(field) => (
                    <field.InputForm label="Observação" multiline minRows={3} variante="normal" placeholder="Adicione uma observação interna" cor="secondary" />
                )} />

                <Grid container spacing={2}>
                    <Grid size="grow">
                        <Botao fullWidth cor="cinza" onClick={onClose} variante="ghost">Cancelar</Botao>
                    </Grid>
                    <Grid size="grow">
                        <Subscribe selector={(selector) => [selector.isSubmitting]} children={([isSubmitting]) => (
                            <Botao fullWidth variante="outlined" cor={texto.cor} onClick={handleSubmit} loading={isSubmitting}>
                                {texto.botao}
                            </Botao>
                        )} />
                    </Grid>
                </Grid>
            </Stack>
        </ModalBase>
    )
}
