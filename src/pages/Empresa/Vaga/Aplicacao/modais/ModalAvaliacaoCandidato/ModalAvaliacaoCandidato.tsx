import { Box, Grid, Stack, Typography } from "@mui/material"
import { Botao } from "@/components/Botao/Botao"
import { ModalBase } from "@/components/ModalBase/ModalBase"
import { useAtualizarSituacaoAplicacaoVaga } from "@/api/empresa/empresa"
import { obterAvaliacaoCandidato } from "./ModalAvaliacaoCandidato.utils"
import type { ModalAvaliacaoCandidatoProps } from "./ModalAvaliacaoCandidato.types"

export const ModalAvaliacaoCandidato = ({ open, handleClose, situacao, candidato, idAplicacao }: ModalAvaliacaoCandidatoProps) => {
    const avaliacao = obterAvaliacaoCandidato(situacao)
    const { mutateAsync, isPending } = useAtualizarSituacaoAplicacaoVaga()
    const { Icone } = avaliacao

    const handleSubmit = async () => {
        if (!situacao) return

        await mutateAsync({
            idAplicacao,
            situacao
        })
        onClose()
    }

    const onClose = () => {
        handleClose()
    }

    return (
        <ModalBase
            open={open}
            handleClose={onClose}
            tamanho="small"
            icone={Icone}
            titulo={avaliacao.titulo}
            subtitulo={<>{avaliacao.descricao} <b>{candidato?.nome ?? "este candidato"}</b>?</>}
            corIcone={avaliacao.cor}
        >
            <Stack spacing={4}>
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
                            <Botao fullWidth variante="outlined" cor={avaliacao.cor} onClick={handleSubmit} loading={isPending}>
                                {avaliacao.botao}
                            </Botao>
                    </Grid>
                </Grid>
            </Stack>
        </ModalBase>
    )
}
