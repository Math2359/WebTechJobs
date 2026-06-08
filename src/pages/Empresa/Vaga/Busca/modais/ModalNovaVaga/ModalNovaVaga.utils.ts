import type { CadastrarVagaSchema } from "./ModalNovaVaga.types";

export const defaultvalues: CadastrarVagaSchema = {
    nome: "",
    cargo: "",
    descricao: "",
    interna: false,
    modelo: "",
    nivelExperiencia: "",
    tecnologias: [],
    requisitos: "",
    beneficios: "",
    cep: "",
    dataFimInscricoes: undefined,
    numero: "",
    salarioPrevisto: ""
}
