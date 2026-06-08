import { Dominios } from "@/lib/dominios";

export const LABELS_MAPEADAS = {
    Instituicao: {
        [Dominios.TipoExperiencia.Trabalho]: "Empresa",
        [Dominios.TipoExperiencia.Formacao]: "Instituição",
    },
    Descricao: {
        [Dominios.TipoExperiencia.Trabalho]: "Cargo",
        [Dominios.TipoExperiencia.Formacao]: "Curso",    
    }
}