import { Alert, Box, Divider, Grid, Stack, Typography } from "@mui/material"
import { Botao } from "@/components/Botao/Botao"
import { useFormCustomizado } from "@/components/Formulario"
import { ModalBase } from "@/components/ModalBase/ModalBase"
import { useAtualizarSituacaoAplicacaoVaga } from "@/api/empresa/empresa"
import { avaliacaoCandidatoSchema } from "./ModalAvaliacaoCandidato.schema"
import { obterAvaliacaoCandidato, valoresIniciaisAvaliacaoCandidato } from "./ModalAvaliacaoCandidato.utils"
import type { ModalAvaliacaoCandidatoProps } from "./ModalAvaliacaoCandidato.types"

export const ModalAvaliacaoCandidato = ({ open, handleClose, situacao, candidato, idAplicacao }: ModalAvaliacaoCandidatoProps) => {
    const avaliacao = obterAvaliacaoCandidato(situacao)
    const { mutateAsync, isPending } = useAtualizarSituacaoAplicacaoVaga()
    const { Icone } = avaliacao

    const { AppField, Subscribe, handleSubmit, reset } = useFormCustomizado({
        defaultValues: valoresIniciaisAvaliacaoCandidato,
        validators: {
            onSubmit: avaliacaoCandidatoSchema,
            onBlur: avaliacaoCandidatoSchema
        },
        onSubmit: async () => {
            if (!situacao) return

            await mutateAsync({
                idAplicacao,
                situacao
            })
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
                <Stack spacing={2}>
                    <Grid spacing={2} container>
                        <Box sx={(theme) => ({
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            backgroundColor: theme.palette[avaliacao.cor].light,
                            borderRadius: 2,
                            width: theme.spacing(6),
                            height: theme.spacing(6)
                        })}>
                            <Icone fontSize="large" sx={(theme) => ({ color: theme.palette[avaliacao.cor].contrastText })} />
                        </Box>

                        <Stack spacing={0.5}>
                            <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                {avaliacao.titulo}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {avaliacao.descricao} <b>{candidato?.nome ?? "este candidato"}</b>?
                            </Typography>
                        </Stack>
                    </Grid>

                    <Divider />
                </Stack>

                <Box sx={(theme) => ({
                    border: "1px solid",
                    borderColor: theme.palette.grey[200],
                    borderRadius: 1,
                    backgroundColor: theme.palette.grey[50],
                    p: 1.5
                })}>
                    <Typography variant="body2" color="text.secondary">
                        {avaliacao.detalhe}
                    </Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid size="grow">
                        <Botao fullWidth cor="cinza" onClick={onClose} variante="ghost" disabled={isPending}>Cancelar</Botao>
                    </Grid>
                    <Grid size="grow">
                        <Subscribe selector={(selector) => [selector.isSubmitting]} children={([isSubmitting]) => (
                            <Botao fullWidth variante="outlined" cor={avaliacao.cor} onClick={handleSubmit} loading={isPending || isSubmitting}>
                                {avaliacao.botao}
                            </Botao>
                        )} />
                    </Grid>
                </Grid>
            </Stack>
        </ModalBase>
    )
}
