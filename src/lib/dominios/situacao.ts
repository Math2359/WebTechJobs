export const Situacao = {
    EmAnalise: 1,
    Aprovado: 2,
    Entrevista: 3,
    Reprovado: 4,
} as const

export type Situacao =
    typeof Situacao[keyof typeof Situacao]
