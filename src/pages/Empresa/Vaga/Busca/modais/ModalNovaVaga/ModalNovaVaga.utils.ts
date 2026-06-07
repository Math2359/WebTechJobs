import type { CadastrarVagaSchema } from "./ModalNovaVaga.types";

export const defaultvalues: CadastrarVagaSchema = {
    nome: "",
    cargo: "",
    descricao: "",
    interna: false,
    modelo: "",
    nivelExperiencia: "",
    cep: "",
    dataFimInscricoes: undefined,
    numero: "",
    salarioPrevisto: ""
}