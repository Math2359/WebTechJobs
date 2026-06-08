import type { VagaVisualizacaoCandidato } from "@/api/vaga/vaga.types"

export const obterTagsVaga = (vaga: VagaVisualizacaoCandidato) => [
    vaga.modelo,
    vaga.nivelExperiencia,
    ...(vaga.tecnologias?.split(",").filter(Boolean) ?? [])
].filter(Boolean)
