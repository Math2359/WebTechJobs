import { useEnviarValidacaoEmail } from "@/api/usuario/usuario";
import { Botao } from "@/components/Botao/Botao";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Alert, AlertTitle, Tooltip } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

export const AlertaValidacaoEmail = () => {
    const { mutate: enviarValidacaoEmail, isPending } = useEnviarValidacaoEmail()

    return (
        <Alert
            severity="warning"
            action={
                <Botao
                    cor="cinza"
                    variante="outlined"
                    loading={isPending}
                    onClick={() => enviarValidacaoEmail()}
                >
                    Enviar e-mail
                    <SendIcon fontSize="small" />
                </Botao>
            }
        >
            <AlertTitle>Valide seu e-mail</AlertTitle>
            E-mails validados ajudam a dar mais credibilidade ao seu perfil.
        </Alert>
    )
}

export const IconeEmailValidado = () => (
    <Tooltip title="E-mail validado">
        <VerifiedIcon color="primary" fontSize="small" />
    </Tooltip>
)
