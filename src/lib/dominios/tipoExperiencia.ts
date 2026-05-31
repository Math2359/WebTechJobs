export const TipoExperiencia = {
    Trabalho: 1,
    Formacao: 2,
} as const

export type TipoExperiencia =
    typeof TipoExperiencia[keyof typeof TipoExperiencia];