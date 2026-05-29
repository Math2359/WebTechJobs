import z from "zod";
import type { baseSchema } from "../schema";

export type CandidatoSchema = z.infer<typeof baseSchema>