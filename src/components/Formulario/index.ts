import { createFormHook } from "@tanstack/react-form";
import { fieldContext, formContext } from "../../lib/formulario";
import { InputForm } from "./InputForm/InputForm";

export const { useAppForm: useFormCustomizado } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    InputForm
  },
  formComponents: {},
})
