import z from "zod";
import { baseSchema } from "../schema";
import { validarCNPJ } from "@/lib/documento";

export const empresaSchema = baseSchema.extend({
    cnpj: z
      .string()
      .min(1, "CNPJ é obrigatório")
      .refine(validarCNPJ, {
        message: "CNPJ inválido",
      }),
})