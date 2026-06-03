import type z from "zod";
import type { editarSchema } from "./FormularioEditar.schema";

export type EditarSchema = z.infer<typeof editarSchema>