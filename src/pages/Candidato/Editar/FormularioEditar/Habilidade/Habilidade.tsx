import { comFormulario } from "@/components/Formulario";
import { editarFormOptions } from "../FormularioEditar.utils";
import { useState } from "react";
import { Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import { InputNormal } from "@/components/Formulario/InputForm/variantes/Normal/Normal";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const Habilidade = comFormulario({
    ...editarFormOptions,
    render: function HabilidadeItem({ form: { AppField } }) {
        const [habilidade, setHabilidade] = useState("")
        return (
            <Stack spacing={2}>
                <Typography variant="overline">Habilidades</Typography>
                <AppField
                    name="habilidade.habilidades"
                    mode="array"
                    children={(field) => (
                        <Stack spacing={2}>
                            <Grid container>
                                <Grid size={3}>
                                    <Stack spacing={1}>
                                        <Typography variant="body2">Habilidades (máx. 7):</Typography>
                                        <Grid container>
                                            <Grid size="grow">
                                                <InputNormal sx={{ width: "100%" }} disabled={field.state.value.length >= 7} placeholder="Digite uma habilidade" value={habilidade} onChange={(e) => setHabilidade(e.target.value)} />
                                            </Grid>

                                            <IconButton disabled={field.state.value.length >= 7} onClick={() => {
                                                if (habilidade.trim() !== "") {
                                                    field.pushValue(habilidade.trim())
                                                    setHabilidade("")
                                                }
                                            }}>
                                                <AddIcon />
                                            </IconButton>
                                        </Grid>
                                        <field.TextoErro />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Grid spacing={1} container>
                                {field.state.value.map((item: string, index: number) => (
                                    <Chip key={index} color="primary" label={item} deleteIcon={<DeleteIcon color="error" fontSize="small" />} onDelete={() => field.removeValue(index)} />
                                ))}
                            </Grid>
                        </Stack>
                    )}
                />
            </Stack>
        )
    }
})