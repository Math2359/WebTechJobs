import { Box, Divider, Grid, Modal, Stack, Typography, type SxProps, type Theme } from "@mui/material"
import type { ModalBaseProps } from "./ModalBase.types"
import * as styles from "./ModalBase.styles"

export const ModalBase = ({ handleClose, open, children, tamanho = "medium", icone: Icone, titulo, subtitulo, corIcone = "secondary" }: ModalBaseProps) => {
    const renderizarHeader = Icone || titulo || subtitulo

    return (
        <Modal open={open} onClose={handleClose}>
            <Box sx={[styles.ModalBaseEstilos, styles.TamanhoModalEstilo(tamanho)] as SxProps<Theme>}>
                {renderizarHeader && (
                    <Stack spacing={2} sx={{ mb: 4 }}>
                        <Grid spacing={2} container>
                            {Icone && (
                                <Box sx={(theme) => ({
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: theme.palette[corIcone].light,
                                    borderRadius: 2,
                                    width: theme.spacing(6),
                                    height: theme.spacing(6)
                                })}>
                                    <Icone fontSize="large" sx={(theme: Theme) => ({ color: theme.palette[corIcone].contrastText })} />
                                </Box>
                            )}

                            <Stack spacing={0.5}>
                                {titulo && (
                                    <Typography variant="body1" sx={{ fontWeight: 700 }}>
                                        {titulo}
                                    </Typography>
                                )}
                                {subtitulo && (
                                    <Typography variant="caption" color="text.secondary">
                                        {subtitulo}
                                    </Typography>
                                )}
                            </Stack>
                        </Grid>

                        <Divider />
                    </Stack>
                )}
                {children}
            </Box>
        </Modal>
    )
}
