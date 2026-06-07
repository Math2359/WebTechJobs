import { ModalBase } from "@/components/ModalBase/ModalBase"
import { Box, Divider, Grid, Stack, Typography } from "@mui/material"
import type { ModalCandidaturaProps } from "./ModalCandidatura.types"
import { useRef, useState } from "react"
import { useAplicarVaga } from "@/api/candidato/candidato"
import { Botao } from "@/components/Botao/Botao"
import UploadFileOutlinedIcon from "@mui/icons-material/UploadFileOutlined"
import AddIcon from "@mui/icons-material/AddBoxOutlined"

export const ModalCandidatura = ({ handleClose, vaga: { nomeEmpresa, id }, open }: ModalCandidaturaProps) => {
    const inputFileRef = useRef<HTMLInputElement>(null)
    const [arquivo, setArquivo] = useState<File>()
    const { mutateAsync: candidatarSe, isPending } = useAplicarVaga()

    const onClose = () => {
        handleClose()
        setArquivo(undefined)
        if (inputFileRef.current) {
            inputFileRef.current.value = ""
        }
    }

    const handleCandidatar = async () => {
        if (!arquivo) return

        await candidatarSe({ idVaga: id, arquivo })
        onClose()
    }

    return (
        <ModalBase open={open} handleClose={onClose} tamanho="medium">
            <Stack spacing={4}>
                <Stack spacing={1}>
                    <Stack>
                        <Grid container sx={{ placeItems: "center" }} spacing={0.5}>
                            <AddIcon fontSize="medium" color="action" />
                            <Typography color="textDisabled" variant="subtitle1" sx={{ fontWeight: 600 }}>
                                Candidatar-se
                            </Typography>

                        </Grid>
                        <Typography variant="subtitle2" sx={{ fontSize: 12 }}>Adicione um CV adicional antes de enviar sua candidatura para {nomeEmpresa}.</Typography>
                    </Stack>
                    <Divider variant="fullWidth" />
                </Stack>

                <Box
                    onClick={() => inputFileRef.current?.click()}
                    sx={(theme) => ({
                        border: "1px dashed",
                        borderColor: theme.palette.secondary.main,
                        borderRadius: 2,
                        p: 2,
                        backgroundColor: theme.palette.grey[50],
                        cursor: "pointer"
                    })}
                >
                    <Stack spacing={1.5}>
                        <Grid container spacing={1} sx={{ placeItems: "center" }}>
                            <UploadFileOutlinedIcon color="action" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                                Upload do CV
                            </Typography>
                        </Grid>
                        <Typography variant="caption" color="text.secondary">
                            Envie um arquivo PDF, DOC ou DOCX com seu currículo atualizado.
                        </Typography>
                        <input
                            ref={inputFileRef}
                            hidden
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={(event) => setArquivo(event.target.files?.[0])}
                        />
                        {arquivo && (
                            <Typography variant="caption" color="text.secondary">
                                Arquivo selecionado: <b>{arquivo.name}</b>
                            </Typography>
                        )}
                    </Stack>
                </Box>

                <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1 }}>
                    <Botao variante="ghost" cor="cinza" onClick={onClose}>
                        Cancelar
                    </Botao>
                    <Botao cor="secondary" loading={isPending} disabled={!arquivo} onClick={handleCandidatar}>
                        Enviar candidatura
                    </Botao>
                </Box>
            </Stack>
        </ModalBase>
    )
}