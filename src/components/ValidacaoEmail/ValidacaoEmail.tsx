import { useEnviarValidacaoEmail } from "@/api/usuario/usuario";
import { Botao } from "@/components/Botao/Botao";
import type { CorBotao } from "@/components/Botao/Botao.types";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Alert, AlertTitle, Tooltip } from "@mui/material";

type AlertaValidacaoEmailProps = {
    cor?: CorBotao
}

export const AlertaValidacaoEmail = ({ cor = "primary" }: AlertaValidacaoEmailProps) => {
    const { mutate: enviarValidacaoEmail, isPending } = useEnviarValidacaoEmail()

    return (
        <Alert
            severity="info"
            action={
                <Botao
                    cor={cor}
                    variante="outlined"
                    loading={isPending}
                    onClick={() => enviarValidacaoEmail()}
                >
                    Enviar e-mail
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
