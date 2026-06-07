import type z from "zod";
import type { cadastrarVagaSchema } from "./ModalNovaVaga.schema";

export type CadastrarVagaSchema =  z.infer<typeof cadastrarVagaSchema>