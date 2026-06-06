import { Stack, Typography, Grid, Box } from "@mui/material"
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
        <ModalBase open={open} handleClose={handleClose} tamanho="small">
            <Stack spacing={4}>
                <Stack sx={{ placeItems: "center" }} spacing={1}>
                    <Box sx={(theme) => ({ display: "flex", justifyContent: "center", alignItems: "center", background: theme.palette.error.light, padding: theme.spacing(1), borderRadius: theme.spacing(1), width: theme.spacing(7), height: theme.spacing(7) })}>
                        <DeleteOutlinedIcon fontSize="large" sx={{ color: (theme) => theme.palette.error.contrastText }} />
                    </Box>
                    <Typography variant="body1">Tem certeza que deseja deletar sua foto de perfil?</Typography>
                </Stack>

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
