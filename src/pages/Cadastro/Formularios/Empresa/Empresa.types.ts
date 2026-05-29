import type z from "zod";
import type { empresaSchema } from "./Empresa.schema";

export type EmpresaSchema = z.infer<typeof empresaSchema>