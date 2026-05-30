import type z from "zod";
import type { loginSchema } from "./Login.schema";

export type LoginSchema = z.infer<typeof loginSchema>