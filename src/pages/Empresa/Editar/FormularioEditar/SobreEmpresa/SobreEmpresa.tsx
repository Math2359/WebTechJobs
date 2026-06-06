import { comFormulario } from "@/components/Formulario";
import { editarFormOptions } from "../FormularioEditar.utils";
import { Chip, Grid, IconButton, Stack, Typography } from "@mui/material";
import { useState } from "react";
import { InputNormal } from "@/components/Formulario/InputForm/variantes/Normal/Normal";
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

export const SobreEmpresa = comFormulario({
    ...editarFormOptions,
    render: function SobreEmpresaItem({ form: { AppField } }) {
        const [tecnologia, setTecnologia] = useState("")
        return (
            <Stack spacing={2}>
                <Typography variant="overline">Sobre a empresa</Typography>
                <Grid container spacing={2}>
                    <Grid size={5.5}>
                        <AppField
                            name="sobreEmpresa.setor"
                            children={(field) => <field.InputForm cor="secondary" variante="normal" label="Setor" placeholder="Digite o setor da empresa" />}
                        />
                    </Grid>
                    <Grid size="grow">
                        <AppField
                            name="sobreEmpresa.tecnologias"
                            mode="array"
                            children={(field) => (
                                <Stack spacing={2}>
                                    <Grid container>
                                        <Grid size="grow">
                                            <Stack spacing={0.5}>
                                                <Typography variant="body2">Tecnologias (máx. 4):</Typography>
                                                <Grid container>
                                                    <Grid size="grow">
                                                        <InputNormal cor="secondary" sx={{ width: "100%" }} disabled={field.state.value.length >= 4} placeholder="Ex.: AWS" value={tecnologia} onChange={(e) => setTecnologia(e.target.value)} />
                                                    </Grid>

                                                    <IconButton disabled={field.state.value.length >= 4} onClick={() => {
                                                        if (tecnologia.trim() !== "") {
                                                            field.pushValue(tecnologia.trim())
                                                            setTecnologia("")
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
                                            <Chip key={index} color="secondary" label={item} deleteIcon={<DeleteIcon color="error" fontSize="small" />} onDelete={() => field.removeValue(index)} />
                                        ))}
                                    </Grid>
                                </Stack>
                            )}
                        />
                    </Grid>
                </Grid>
                
                <AppField
                    name="sobreEmpresa.descricao"
                    children={(field) => <field.InputForm cor="secondary" multiline minRows={4} variante="normal" label="Descrição" placeholder="Escreva uma descrição sobre a empresa" />}
                />

            </Stack>
        )
    }
})