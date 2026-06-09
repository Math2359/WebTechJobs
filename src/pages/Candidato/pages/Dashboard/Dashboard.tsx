import { useAppSelector } from "@/lib/reducers"
import { Box, Chip, Divider, Grid, IconButton, ListItemIcon, Menu, MenuItem, Stack, Typography } from "@mui/material"
import { Card } from "@/components/Card/Card";
import { RenderizarTexto } from "@/components/RenderizarTexto/RenderizarTexto";
import { useObterInformacoesCandidato } from "@/api/candidato/candidato";
import { useMemo, useRef, useState, type ChangeEvent } from "react";
import { Dominios } from "@/lib/dominios";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import EmailIcon from '@mui/icons-material/Email';
import ContactMailIcon from '@mui/icons-material/ContactMail';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import GitHubIcon from '@mui/icons-material/GitHub';
import { Experiencias } from "../../components/Experiencias/Experiencias";
import { IconeTexto } from "../../../../components/IconeTexto/IconeTexto";
import { Botao } from "@/components/Botao/Botao";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { SemDados } from "@/components/SemDados/SemDados";
import { formatarTelefone } from "@/lib/utils";
import CircleIcon from '@mui/icons-material/Circle';
import { useObterFotoPerfil, useObterValidacaoEmail } from "@/api/usuario/usuario";
import { AvatarPerfil } from "@/components/AvatarPerfil/AvatarPerfil";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { ModalEditarFotoPerfil } from "../../../../components/ModaisPerfil/ModalEditarFotoPerfil/ModalEditarFotoPerfil";
import { ModalConfirmarDeletarFotoPerfil } from "../../../../components/ModaisPerfil/ModalConfirmarDeletarFotoPerfil/ModalConfirmarDeletarFotoPerfil";
import { AlertaValidacaoEmail, IconeEmailValidado } from "@/components/ValidacaoEmail/ValidacaoEmail";

export const Dashboard = () => {
    const usuario = useAppSelector(state => state.credencial)
    const { data: emailValidado = false } = useObterValidacaoEmail(usuario?.emailValidado)

    const { data: informacoesCandidato } = useObterInformacoesCandidato()

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

    const experiencias = useMemo(() => ({
        trabalho: informacoesCandidato?.experiencias.filter(x => x.tipoExperiencia === Dominios.TipoExperiencia.Trabalho) ?? [],
        formacao: informacoesCandidato?.experiencias.filter(x => x.tipoExperiencia === Dominios.TipoExperiencia.Formacao) ?? []
    }), [informacoesCandidato])

    const localizacao = (informacoesCandidato?.cidade ? informacoesCandidato.cidade + ", " : "") + (informacoesCandidato?.estado ?? "")

    return (
        <Stack spacing={4}>
            {!emailValidado && <AlertaValidacaoEmail />}
            <Card>
                <Box sx={{ background: theme => theme.palette.primary.main, height: "70px" }} />
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
                                <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                                    <Typography variant="h6">{usuario?.nomeUsuario}</Typography>
                                    {emailValidado && <IconeEmailValidado />}
                                </Stack>
                                <Typography variant="caption">{informacoesCandidato?.area} - {localizacao}</Typography>
                            </Stack>
                            <Grid container spacing={3}>
                                <Typography variant="caption"><b>{informacoesCandidato?.vagasAplicadas ?? 0}</b> candidaturas</Typography>
                                <Typography variant="caption"><b>{informacoesCandidato?.processosAtivos ?? 0}</b> em andamento</Typography>
                                <Typography variant="caption"><b>{informacoesCandidato?.anosExperiencia ?? "-"}</b> anos de exp.</Typography>
                            </Grid>
                        </Stack>
                    </Grid>
                    <Botao variante="outlined" to="/candidato/editar">Editar perfil <EditOutlinedIcon /></Botao>
                </Grid>
            </Card>

            <Grid container spacing={2}>
                <Grid size={3}>
                    <Stack spacing={2}>
                        <Card padding={2}>
                            <Stack spacing={2}>
                                <Typography variant="overline">Habilidades</Typography>
                                <Grid container rowSpacing={1} columnSpacing={2}>
                                    {informacoesCandidato?.habilidades?.length ? (
                                        informacoesCandidato.habilidades.split(",").map((item, index) => <Chip key={index} color="primary" label={item} />)
                                    ) : (
                                        <SemDados titulo="Nenhuma habiliade cadastrada" descricao="Edite seu perfil para adicionar suas habilidades profissionais" />)}
                                </Grid>
                            </Stack>
                        </Card>
                        <Card padding={2}>
                            <Stack spacing={2}>
                                <Typography variant="overline">Contato</Typography>
                                <Stack spacing={0.5}>
                                    <IconeTexto icon={EmailIcon} texto={informacoesCandidato?.emailPessoal} />
                                    <IconeTexto icon={ContactMailIcon} texto={informacoesCandidato?.emailCorporativo} />
                                    <IconeTexto icon={LocalPhoneIcon} texto={formatarTelefone(informacoesCandidato?.telefone)} />
                                    <IconeTexto link icon={LinkedInIcon} texto={informacoesCandidato?.linkedin} />
                                    <IconeTexto link icon={GitHubIcon} texto={informacoesCandidato?.github} />
                                </Stack>
                            </Stack>
                        </Card>
                        <Card padding={2}>
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
                        </Card>
                    </Stack>
                </Grid>
                <Grid size="grow">
                    <Stack spacing={2}>
                        <Card padding={2}>
                            <Stack spacing={4}>
                                <Stack spacing={2}>
                                    <Typography variant="overline">Sobre mim</Typography>
                                    <RenderizarTexto texto={informacoesCandidato?.descricao ?? ""} />
                                </Stack>
                            </Stack>
                        </Card>
                        <Card padding={2}>
                            <Grid container spacing={2}
                                sx={{
                                    flexGrow: 1,
                                    justifyContent: "space-between"
                                }}>
                                <Grid size={5.7}>
                                    <Stack spacing={2}>
                                        <Typography variant="overline">Experiências</Typography>
                                        <Experiencias experiencias={experiencias.trabalho} />
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
                                        <Typography variant="overline">Formações</Typography>
                                        <Experiencias experiencias={experiencias.formacao} />
                                    </Stack>
                                </Grid>
                            </Grid>
                        </Card>
                    </Stack>
                </Grid>
            </Grid>
            <ModalEditarFotoPerfil open={modalEditarFotoPerfil} arquivo={arquivo} handleClose={handleCLoseModalEditarPerfil} />
            <ModalConfirmarDeletarFotoPerfil open={modalConfirmarDeletar} handleClose={() => setModalConfirmarDeletar(false)} />
        </Stack>
    )
}
