import type { Experiencia } from "@/api/candidato/candidato.types"

export type ExperienciasProps = {
    experiencias: Experiencia[]
    descricaoSemDados?: string
    removerExperiencia?: (index: number) => void
}