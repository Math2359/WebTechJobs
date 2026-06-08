import { Box, Chip, Grid, Stack, Typography } from "@mui/material"
import { motion } from "motion/react"
import ScheduleIcon from "@mui/icons-material/Schedule"
import WorkOutlineRoundedIcon from "@mui/icons-material/WorkOutlineRounded"
import { useNavigate } from "@tanstack/react-router"
import { useObterFotoPerfilEmpresa } from "@/api/empresa/empresa"
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil"
import { Card } from "@/components/Card/Card"
import { diffDatas, formatarReal } from "@/lib/utils"
import { obterTagsVaga } from "./VagaCard.utils"
import type { VagaCardProps } from "./VagaCard.types"

export const VagaCard = ({ vaga, fotoEmpresa }: VagaCardProps) => {
    const navigate = useNavigate()
    const { data: fotoEmpresaBuscada } = useObterFotoPerfilEmpresa(fotoEmpresa ? undefined : vaga.idEmpresa)

    const visualizarVaga = () => navigate({ to: "/candidato/vaga/$id", params: { id: String(vaga.id) } })

    return (
        <motion.div
            whileHover={{ y: -4, scale: 1.01 }}
            whileTap={{ scale: 0.99 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={visualizarVaga}
            style={{ cursor: "pointer", height: "100%" }}
        >
            <Card padding={2}>
                <Stack spacing={2}>
                    <Grid container spacing={2}>
                        <AvatarPerfil src={fotoEmpresa ?? fotoEmpresaBuscada} />
                        <Stack spacing={0.25}>
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>
                                {vaga.nome}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                                {vaga.nomeEmpresa}
                            </Typography>
                        </Stack>
                    </Grid>

                    <Stack direction="row" spacing={1} sx={{ flexWrap: "wrap" }}>
                        {obterTagsVaga(vaga).map((tag) => (
                            <Chip
                                key={tag}
                                label={tag}
                                size="small"
                                sx={(theme) => ({
                                    fontSize: theme.spacing(1.4),
                                })}
                            />
                        ))}
                    </Stack>

                    <Grid container sx={{ justifyContent: "space-between" }}>
                        <Grid container spacing={1}>
                            <WorkOutlineRoundedIcon fontSize="small" color="action" />
                            <Typography variant="caption">
                                Salário: <b>{vaga.salarioPrevisto ? formatarReal(vaga.salarioPrevisto) : "-"}</b>
                            </Typography>
                        </Grid>

                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                            <ScheduleIcon fontSize="small" color="disabled" />
                            <Typography variant="caption" color="text.secondary">
                                Há {diffDatas(vaga.dataCadastro)}
                            </Typography>
                        </Box>
                    </Grid>
                </Stack>
            </Card>
        </motion.div>
    )
}
