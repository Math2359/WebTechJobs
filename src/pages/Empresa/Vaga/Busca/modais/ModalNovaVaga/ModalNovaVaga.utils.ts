import type z from "zod";
import type { cadastrarVagaSchema } from "./ModalNovaVaga.schema";

export const defaultvalues: z.infer<typeof cadastrarVagaSchema> = {
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