import { comFormulario } from "@/components/Formulario"
import { InputNormal } from "@/components/Formulario/InputForm/variantes/Normal/Normal"
import { Grid, IconButton, Stack, Typography } from "@mui/material"
import { useState } from "react"
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined';
import AddIcon from '@mui/icons-material/Add';
import { editarFormOptions } from "../FormularioEditar.utils";

export const SobreMim = comFormulario({
    ...editarFormOptions,
    render: ({ form: { AppField } }) => {
        const [preferencia, setPreferencia] = useState("")
        return (
            <Stack spacing={2}>
                <Typography variant="overline">Sobre mim</Typography>
                <Grid container spacing={2}>
                    <Grid size={3}>
                        <AppField
                            name="sobreMim.area"
                            children={(field) => <field.InputForm variante="normal" label="Área de atuação" placeholder="Digite a sua área de atuação" />}
                        />
                    </Grid>
                    <Grid size={3}>
                        <AppField
                            name="sobreMim.anosExperiencia"
                            children={(field) => <field.InputForm type="number" variante="normal" label="Anos de experiência" placeholder="Ex.: 4" />}
                        />
                    </Grid>
                    <Grid size={3}>
                        <AppField
                            name="sobreMim.estado"
                            children={(field) => <field.InputForm variante="normal" label="Estado" placeholder="Ex.: SP" />}
                        />
                    </Grid>
                    <Grid size={3}>
                        <AppField
                            name="sobreMim.cidade"
                            children={(field) => <field.InputForm variante="normal" label="Cidade" placeholder="Ex.: São Paulo" />}
                        />
                    </Grid>
                </Grid>
                <AppField
                    name="sobreMim.descricao"
                    children={(field) => <field.InputForm multiline minRows={4} variante="normal" label="Descrição" placeholder="Escreva uma descrição sobre você" />}
                />
                <AppField
                    name="sobreMim.preferencias"
                    mode="array"
                    children={(field) => (
                        <Stack spacing={2}>
                            <Grid container>
                                <Grid size={3}>
    
                                    <Stack spacing={1}>
                                        <Typography variant="body2">Preferências (máx. 4):</Typography>
                                        <Grid container>
                                            <Grid size="grow">
                                                <InputNormal sx={{ width: "100%" }} disabled={field.state.value.length >= 4} placeholder="Ex.: Remoto" value={preferencia} onChange={(e) => setPreferencia(e.target.value)} />
                                            </Grid>
    
                                            <IconButton disabled={field.state.value.length >= 4} onClick={() => {
                                                if (preferencia.trim() !== "") {
                                                    field.pushValue(preferencia.trim())
                                                    setPreferencia("")
                                                }
                                            }}>
                                                <AddIcon />
                                            </IconButton>
                                        </Grid>
                                        <Typography variant="caption" sx={{ fontWeight: "bold" }}>Adicione preferências para recrutadores saberem mais sobre você </Typography>
                                        <field.TextoErro />
                                    </Stack>
                                </Grid>
                            </Grid>
                            <Stack>
                                {field.state.value.map((item, index) => <Typography variant="body2" key={index}>{item} <IconButton onClick={() => field.removeValue(index)}><DeleteOutlinedIcon color="error" fontSize="small" /></IconButton></Typography>)}
                            </Stack>
                        </Stack>
                    )}
                />
            </Stack>
        )
    }
})