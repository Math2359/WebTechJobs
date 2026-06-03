import { Grid, Stack, Typography } from "@mui/material"
import type { SemDadosProps } from "./SemDados.types"
import NoSimOutlinedIcon from '@mui/icons-material/NoSimOutlined';

export const SemDados = ({ titulo, descricao }: SemDadosProps) => {
    return (
        <Grid container spacing={1} sx={{ placeItems: "center" }}>
            <NoSimOutlinedIcon color="action" fontSize="medium" />
            <Stack>
                <Typography variant="subtitle2" color="textDisabled">
                    {titulo}
                </Typography>
                <Typography variant="caption" color="textDisabled">
                    {descricao}
                </Typography>
            </Stack>
        </Grid>
    )
}