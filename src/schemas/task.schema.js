import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({ required_error: "El título es requerido" }).min(3, {
    message: "El título debe tener al menos 3 caracteres",
  }),
  description: z.string({ required_error: "La descripción es requerida" }),
  completed: z.boolean().optional(),
  date: z.string().datetime().optional(),
});
