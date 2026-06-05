import type { SxProps, Theme } from "@mui/material";
import type { TamanhoModal } from "./ModalBase.types";

export const ModalBaseEstilos: SxProps<Theme> = (theme) => ({
    position: "absolute",
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    background: "#fff",
    padding: theme.spacing(2),
    borderRadius: theme.spacing(2),
})

export const TamanhoModalEstilo = (tamanho: TamanhoModal): SxProps<Theme> => (theme) => {
    const width = {
        small: theme.spacing(70),
        medium: theme.spacing(90),
        large: theme.spacing(110)
    }

    return {
        width: width[tamanho]
    }
}