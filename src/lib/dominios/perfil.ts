export const Perfil = {
    Candidato: 1,
    Empresa: 2,
} as const

export const RotasPerfil = {
    [Perfil.Candidato]: "/candidato",
    [Perfil.Empresa]: "/empresa",
} as const

export type Perfil =
    typeof Perfil[keyof typeof Perfil];