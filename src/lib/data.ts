export const formatarData = (data: string | Date | null | undefined) => {
    if (!data)
        return null
    
    return new Date(data).toLocaleDateString()
}