import { format } from "date-fns"

export const formatarData = (data: string | Date | null | undefined) => {
    if (!data)
        return null
    
    return new Date(data).toLocaleDateString()
}

export const formatarDataHoraEntrevista = (data: string | Date, hora: string) =>
    `${format(new Date(data), "dd/MM/yyyy")} às ${hora.slice(0, 5)}`
