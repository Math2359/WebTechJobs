import z from "zod";
import { baseSchema } from "../schema";
import { validarCpf } from "@/lib/documento";

export const candidatoSchema = baseSchema.extend({
    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .refine(validarCpf, {
        message: "CPF inválido",
      }),
})