export const Perfil = {
    Admin: 0,
    Candidato: 1,
    Empresa: 2,
} as const

export type PerfilUsuario =
    typeof Perfil[keyof typeof Perfil];