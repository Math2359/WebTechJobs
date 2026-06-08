import { comFormulario } from "@/components/Formulario";
import { editarFormOptions } from "../FormularioEditar.utils";
import { Divider, Grid, IconButton, Stack, Typography } from "@mui/material";
import { Experiencias as ExperienciaItem } from "@/pages/Candidato/components/Experiencias/Experiencias";
import AddIcon from "@mui/icons-material/Add"
import { ModalNovaExperiencia } from "./modais/ModalNovaExperiencia/ModalNovaExperiencia";
import { useState } from "react";
import type { TipoExperiencia } from "@/lib/dominios/tipoExperiencia";
import { Dominios } from "@/lib/dominios";

export const Experiencias = comFormulario({
    ...editarFormOptions,
    render: function FormExperiencia({ form: { AppField } }) {
        const [modalNovaExperiencia, setModalNovaExperiencia] = useState<{
            [Dominios.TipoExperiencia.Trabalho]: boolean
            [Dominios.TipoExperiencia.Formacao]: boolean
        }>({
            "1": false,
            "2": false
        })

        const abrirModal = (tipoExeperiencia: TipoExperiencia) => {
            setModalNovaExperiencia({
                "1": tipoExeperiencia === Dominios.TipoExperiencia.Trabalho,
                "2": tipoExeperiencia === Dominios.TipoExperiencia.Formacao
            })
        }

        const fecharModal = () => {
            setModalNovaExperiencia({
                "1": false,
                "2": false
            })
        }

        return (
            <Stack spacing={2}>
                <Grid container spacing={2}
                    sx={{
                        flexGrow: 1,
                        justifyContent: "space-between",
                    }}>
                    <Grid size={5.7}>
                        <Stack spacing={2}>
                            <Grid container sx={{ placeItems: "center" }}>
                                <Typography variant="overline">Experiências</Typography>
                                <IconButton color="primary" onClick={() => abrirModal(Dominios.TipoExperiencia.Trabalho)}>
                                    <AddIcon fontSize="small"  />
                                </IconButton>
                            </Grid>
                            <AppField name="experiencia.profissional"
                                children={(field) => (
                                    <>
                                        <ExperienciaItem removerExperiencia={field.removeValue} experiencias={field.state.value} descricaoSemDados="Adicione suas experiências" />
                                        <ModalNovaExperiencia salvar={field.pushValue} tipoExperiencia={Dominios.TipoExperiencia.Trabalho} open={modalNovaExperiencia[Dominios.TipoExperiencia.Trabalho]} handleClose={fecharModal} />
                                    </>
                                )} />
                        </Stack>
                    </Grid>

                    <Grid sx={{ height: "stretch", justifyContent: "center", display: "flex" }}>
                        <Divider
                            orientation="vertical"
                            variant='fullWidth'
                        />
                    </Grid>

                    <Grid size={5.7}>
                        <Stack spacing={2}>
                            <Grid container sx={{ placeItems: "center" }}>
                                <Typography variant="overline">Formações</Typography>
                                <IconButton color="primary" onClick={() => abrirModal(Dominios.TipoExperiencia.Formacao)}>
                                    <AddIcon fontSize="small"  />
                                </IconButton>
                            </Grid>
                            <AppField name="experiencia.formacao"
                                children={(field) => (
                                    <>
                                        <ExperienciaItem experiencias={field.state.value} descricaoSemDados="Adicione suas experiências" />
                                        <ModalNovaExperiencia salvar={field.pushValue} tipoExperiencia={Dominios.TipoExperiencia.Formacao} open={modalNovaExperiencia[Dominios.TipoExperiencia.Formacao]} handleClose={fecharModal} />
                                    </>
                                )} />
                        </Stack>
                    </Grid>
                </Grid>
            </Stack>
        )
    }
})