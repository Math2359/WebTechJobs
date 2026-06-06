import { useObterFotoPerfil } from "@/api/usuario/usuario";
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil";
import { Card } from "@/components/Card/Card";
import { Box, Chip, Grid, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material"
import { useRef, useState, type ChangeEvent } from "react";
import DeleteIcon from '@mui/icons-material/Delete';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import EditIcon from '@mui/icons-material/Edit';
import { useAppSelector } from "@/lib/reducers";
import { Botao } from "@/components/Botao/Botao";
import { useObterInformacoesEmpresa } from "@/api/empresa/empresa";
import { ModalEditarFotoPerfil } from "@/components/ModaisPerfil/ModalEditarFotoPerfil/ModalEditarFotoPerfil";
import ModalConfirmarDeletarFotoPerfil from "@/components/ModaisPerfil/ModalConfirmarDeletarFotoPerfil/ModalConfirmarDeletarFotoPerfil";
import { SemDados } from "@/components/SemDados/SemDados";
import { IconeTexto } from "@/components/IconeTexto/IconeTexto";
import LinkOutlinedIcon from '@mui/icons-material/LinkOutlined';
import { RenderizarTexto } from "@/components/RenderizarTexto/RenderizarTexto";
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';

export const Dashboard = () => {
    const usuario = useAppSelector(state => state.credencial)

    const { data: informacoesEmpresa } = useObterInformacoesEmpresa()

    const [arquivo, setArquivo] = useState<File>();
    const [modalEditarFotoPerfil, setModalEditarFotoPerfil] = useState(false)
    const [modalConfirmarDeletar, setModalConfirmarDeletar] = useState(false)
    const handleCLoseModalEditarPerfil = () => {
        setArquivo(undefined)
        setModalEditarFotoPerfil(false)
        if (inputFileRef.current)
            inputFileRef.current.value = ""
    }

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files;

        const file = files?.[0] ?? undefined

        if (file) {
            setArquivo(file);
            setModalEditarFotoPerfil(true)
            setAnchorEl(null)
        }
    }

    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleAbrirMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleCloseMenu = () => {
        setAnchorEl(null);
    };

    const inputFileRef = useRef<HTMLInputElement>(null)

    const { data: urlAssinada } = useObterFotoPerfil()

    return (
        <Stack spacing={4}>
            <Card>
                <Box sx={{ background: theme => theme.palette.secondary.main, height: "70px" }} />
                <Grid sx={{ padding: 2, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                    <Grid container spacing={2}>
                        <Stack>
                            <IconButton sx={{ padding: 0 }} onClick={handleAbrirMenu}>
                                <AvatarPerfil src={urlAssinada} />
                                <input ref={inputFileRef} hidden onChange={handleFileChange} type="file" />
                            </IconButton>
                        </Stack>
                        <Menu
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleCloseMenu}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "center"
                            }}
                        >
                            <MenuItem onClick={() => inputFileRef?.current?.click()}>
                                <ListItemIcon>
                                    <EditIcon fontSize="small" />
                                </ListItemIcon>
                                <Typography variant="subtitle2">Editar</Typography>
                            </MenuItem>
                            <MenuItem onClick={() => { setModalConfirmarDeletar(true); handleCloseMenu(); }}>
                                <ListItemIcon>
                                    <DeleteIcon color="error" fontSize="small" />
                                </ListItemIcon>
                                <Typography color="error" variant="subtitle2">Deletar</Typography>
                            </MenuItem>
                        </Menu>

                        <Stack spacing={1}>
                            <Stack>
                                <Typography variant="h6">{usuario?.nomeUsuario}</Typography>
                                <Typography variant="caption">{informacoesEmpresa?.setor ?? "-"}</Typography>
                            </Stack>
                            <Grid container spacing={3}>
                                <Typography variant="caption"><b>{informacoesEmpresa?.vagasDisponiveis ?? 0}</b> vagas ativas</Typography>
                                <Typography variant="caption"><b>{informacoesEmpresa?.candidatos ?? 0}</b> candidaturas</Typography>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Botao cor="secondary" variante="outlined" to="/empresa/editar">Editar perfil <EditOutlinedIcon /></Botao>
                </Grid>
            </Card>
            <Grid container spacing={2}>
                <Grid size={3}>
                    <Stack spacing={2}>
                        <Card padding={2}>
                            <Stack spacing={2}>
                                <Typography variant="overline">Informações</Typography>
                                <Stack spacing={0.5}>
                                    <IconeTexto icon={BusinessOutlinedIcon} texto={informacoesEmpresa?.setor} />
                                    <IconeTexto link icon={LinkOutlinedIcon} texto={informacoesEmpresa?.linkSite} />
                                </Stack>
                            </Stack>
                        </Card>
                        <Card padding={2}>
                            <Stack spacing={2}>
                                <Typography variant="overline">Tecnologias</Typography>
                                <Grid container rowSpacing={1} columnSpacing={2}>
                                    {informacoesEmpresa?.tecnologias ? (
                                        informacoesEmpresa?.tecnologias.split(",").map((item, index) => <Chip key={index} color="secondary" label={item} />)
                                    ) : (
                                        <SemDados titulo="Nenhuma tecnologia cadastrada" descricao="Edite seu perfil para adicionar as tecnologias da empresa" />)}
                                </Grid>
                            </Stack>
                        </Card>
                        {/* <Card padding={2}>
                            <Stack spacing={2}>
                                <Typography variant="overline">Preferências</Typography>
                                <Stack spacing={0.5}>
                                    {informacoesCandidato?.preferencias?.length ? (
                                        informacoesCandidato.preferencias.split(",").map((item, index) =>
                                            <Grid container spacing={1} sx={{ placeItems: "center" }} key={index}>
                                                <CircleIcon sx={{ fontSize: 7 }} />
                                                <Typography variant="body2">
                                                    {item}
                                                </Typography>

                                            </Grid>
                                        )
                                    ) : (
                                        <SemDados titulo="Nenhuma preferência cadastrada" descricao="Edite seu perfil para adicionar suas preferências" />
                                    )}
                                </Stack>
                            </Stack>
                        </Card> */}
                    </Stack>
                </Grid>
                <Grid size="grow">
                    <Stack spacing={2}>
                        <Card padding={2}>
                            <Stack spacing={4}>
                                <Stack spacing={2}>
                                    <Typography variant="overline">Sobre a empresa</Typography>
                                    <RenderizarTexto texto={informacoesEmpresa?.descricao ?? ""} />
                                </Stack>
                            </Stack>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
            
            <ModalEditarFotoPerfil open={modalEditarFotoPerfil} arquivo={arquivo} handleClose={handleCLoseModalEditarPerfil} />
            <ModalConfirmarDeletarFotoPerfil open={modalConfirmarDeletar} handleClose={() => setModalConfirmarDeletar(false)} />
        </Stack>
    )
}