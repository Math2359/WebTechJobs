import { ModalBase } from "@/components/ModalBase/ModalBase"
import type { ModaleditarFotoPerfil } from "./ModalEditarFotoPerfil.types"
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil"
import { useMemo } from "react"
import { Grid, Stack, Typography } from "@mui/material"
import { Botao } from "@/components/Botao/Botao"
import { useEditarFotoPerfil } from "@/api/usuario/usuario"
import { toast } from "sonner"

export const ModalEditarFotoPerfil = ({ arquivo, handleClose, open }: ModaleditarFotoPerfil) => {
    const url = useMemo(() => arquivo && URL.createObjectURL(arquivo), [arquivo])

    const onClose = () => {
        if (url)
            URL.revokeObjectURL(url)

        handleClose()
    }

    const { mutateAsync, isPending } = useEditarFotoPerfil()

    const onSubmit = async () => {
        if (!arquivo) {
            toast.error("Arquivo inválido")
            return
        }

        await mutateAsync({
            file: arquivo
        })

        onClose()
    }

    return (
        <ModalBase tamanho="small" handleClose={onClose} open={open}>
            <Stack spacing={4}>
                <Stack spacing={1} sx={{ placeItems: "center" }}>
                    <Typography variant="h6">Nova foto de perfil:</Typography>
                    <AvatarPerfil tamanho={80} src={url} />
                </Stack>
                
                <Grid container spacing={2}>
                    <Grid size="grow">
                        <Botao cor="cinza" fullWidth variante="ghost" onClick={onClose}>Cancelar</Botao>
                    </Grid>
                    <Grid size="grow">
                        <Botao fullWidth variante="outlined" cor="success" onClick={onSubmit} loading={isPending}>Aceitar</Botao>
                    </Grid>
                </Grid>
            </Stack>
        </ModalBase>
    )
}