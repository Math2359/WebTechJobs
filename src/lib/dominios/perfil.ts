export const Perfil = {
    Admin: 0,
    Candidato: 1,
    Empresa: 2,
} as const

export const RotasPerfil = {
    [Perfil.Candidato]: "/candidato",
    [Perfil.Empresa]: "/empresa",
    [Perfil.Admin]: "/",
} as const

export type Perfil =
    typeof Perfil[keyof typeof Perfil];