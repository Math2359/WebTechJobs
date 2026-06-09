export const TipoNotificacao = {
    RespostaVaga: 1,
    Aplicacao: 2,
} as const

export type TipoNotificacao =
    typeof TipoNotificacao[keyof typeof TipoNotificacao];