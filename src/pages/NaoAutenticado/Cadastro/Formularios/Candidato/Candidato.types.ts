import z from "zod";
import type { candidatoSchema } from "./Candidato.schema";

export type CandidatoSchema = z.infer<typeof candidatoSchema>