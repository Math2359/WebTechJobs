import type z from "zod";
import type { editarSchema, experienciaSchema } from "./FormularioEditar.schema";

export type ExperienciaSchema = z.infer<typeof experienciaSchema>

export type EditarSchema = z.infer<typeof editarSchema>