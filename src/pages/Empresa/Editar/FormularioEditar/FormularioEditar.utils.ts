import type { EditarSchema } from "./FormularioEditar.types"
import { formOptions } from "@tanstack/react-form";
import { editarSchema } from "./FormularioEditar.schema";

export const DEFAULT_VALUES: EditarSchema = {
    sobreEmpresa: {
        descricao: "",
        setor: "",
        tecnologias: []
    },
    contato: {
        linkSite: ""
    },
}

export const editarFormOptions = formOptions({
    defaultValues: DEFAULT_VALUES,
    validators: {
        onBlur: editarSchema,
        onSubmit: editarSchema,
    },
})