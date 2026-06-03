import { createFormHook } from "@tanstack/react-form";
import { InputForm } from "./InputForm/InputForm";
import { TextoErro } from "./TextoErro/TextoErro";
import { fieldContext, formContext } from "@/lib/formulario";

export const { useAppForm: useFormCustomizado, withForm: comFormulario, withFieldGroup: comAgrupamento } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputForm,
    TextoErro
  },
  formComponents: {
    
  },
})
