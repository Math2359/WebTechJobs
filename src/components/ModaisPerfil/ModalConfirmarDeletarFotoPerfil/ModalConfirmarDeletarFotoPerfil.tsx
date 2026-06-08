import { Stack, Grid } from "@mui/material"
import { useDeletarFotoPerfil } from "@/api/usuario/usuario"
import { ModalBase } from "@/components/ModalBase/ModalBase"
import { Botao } from "@/components/Botao/Botao"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import type { ModalBaseGenericaProps } from "@/components/ModalBase/ModalBase.types";

export const ModalConfirmarDeletarFotoPerfil = ({ open, handleClose }: ModalBaseGenericaProps) => {
    const { mutateAsync, isPending } = useDeletarFotoPerfil()

    const handleConfirm = async () => {
        await mutateAsync()
        handleClose()
    }

    return (
        <ModalBase
            open={open}
            handleClose={handleClose}
            tamanho="small"
            icone={DeleteOutlinedIcon}
            titulo="Deletar foto de perfil"
            subtitulo="Tem certeza que deseja deletar sua foto de perfil?"
            corIcone="error"
        >
            <Stack spacing={4}>
                <Grid container spacing={2}>
                    <Grid size="grow">
                        <Botao fullWidth cor="cinza" onClick={handleClose} variante="ghost">Cancelar</Botao>
                    </Grid>
                    <Grid size="grow">
                        <Botao fullWidth variante="outlined" cor="error" onClick={handleConfirm} loading={isPending}>
                            Deletar
                        </Botao>
                    </Grid>
                </Grid>
            </Stack>
        </ModalBase>
    )
}

export default ModalConfirmarDeletarFotoPerfil
