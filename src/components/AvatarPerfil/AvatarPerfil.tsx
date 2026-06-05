import { Avatar } from "@mui/material";
import type { AvatarPerfilProps } from "./AvatarPerfil.types";

export const AvatarPerfil = ({ src, tamanho = 50 }: AvatarPerfilProps) => {
    return (
        <Avatar sx={{ width: tamanho, height: tamanho }} slotProps={{
            img: {
                sx: {
                    objectFit: "contain"
                }
            }
        }} src={src} />
    )
}