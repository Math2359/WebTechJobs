import { Box, Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import type { ExperienciasProps } from "./Experiencias.types";
import { formatarData } from "@/lib/data";
import { SemDados } from "@/components/SemDados/SemDados";
import DeleteIcon from '@mui/icons-material/Delete';

export const Experiencias = ({ experiencias, descricaoSemDados, removerExperiencia }: ExperienciasProps) => {
    return (
        <Stack spacing={1}>
            {experiencias.length > 0 ? experiencias.map((experiencia, index) => (
                <Box key={index}>
                    <Stack spacing={2}>
                        {index !== 0 && <Divider />}
                        <Stack>
                            <Grid container sx={{ placeItems: "center" }}>
                                <Typography variant="h6" noWrap>{experiencia.instituicao}</Typography>
                                {removerExperiencia &&
                                    <IconButton onClick={() => removerExperiencia(index)} color="error">
                                        <DeleteIcon fontSize="small" />
                                    </IconButton>
                                }
                            </Grid>

                            <Typography variant="caption" color="primary" sx={{ fontWeight: "bold" }}>{experiencia.descricao}</Typography>

                            <Typography
                                variant="caption"
                                color="textDisabled"
                            >
                                {formatarData(experiencia.dataInicio)} - {formatarData(experiencia.dataFim) ?? "Atual"}
                            </Typography>
                        </Stack>
                    </Stack>
                </Box>
            )) : (
                <SemDados titulo="Nenhuma experiência cadastrada" descricao={descricaoSemDados ?? "Edite seu perfil para adicionar suas experiências"} />
            )}
        </Stack>
    )
}