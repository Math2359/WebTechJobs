import type { EditarSchema } from "./FormularioEditar.types";
import { formOptions } from "@tanstack/react-form";
import { editarSchema } from "./FormularioEditar.schema";

export const DEFAULT_VALUES: EditarSchema = {
    sobreMim: {
        descricao: "",
        preferencias: [],
        area: "",
        estado: "",
        cidade: "",
        anosExperiencia: undefined
    },
    contato: {
        emailPessoal: "",
        emailCorporativo: "",
        telefone: "",
        linkedin: "",
        github: "",
    },
    habilidade: {
        habilidades: [],
    },
}

export const editarFormOptions = formOptions({
    defaultValues: DEFAULT_VALUES,
    validators: {
        onBlur: editarSchema,
        onSubmit: editarSchema,
    },
})