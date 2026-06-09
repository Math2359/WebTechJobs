export const TipoNotificacao = {
    RespostaVaga: 1,
} as const

export type TipoNotificacao =
    typeof TipoNotificacao[keyof typeof TipoNotificacao];