import { Box, Divider, Stack, Typography } from "@mui/material";
import type { ExperienciasProps } from "./Experiencias.types";
import { formatarData } from "@/lib/data";
import { SemDados } from "@/components/SemDados/SemDados";

export const Experiencias = ({ experiencias }: ExperienciasProps) => {
    return (
        <Stack spacing={1}>
            {experiencias.length > 0 ? experiencias.map((experiencia, index) => (
                <Box key={index}>
                    <Stack spacing={2}>
                        {index !== 0 && <Divider />}
                        <Stack>
                            <Typography variant="h6" noWrap>{experiencia.instituicao}</Typography>

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
                <SemDados titulo="Nenhuma experiência cadastrada" descricao="Edite seu perfil para adicionar suas experiências" />
            )}
        </Stack>
    )
}