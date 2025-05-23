import { z } from "zod";

export const createTaskSchema = z.object({
  title: z.string({ required_error: "El título es requerido" }).min(3, {
    message: "El título debe tener al menos 3 caracteres",
  }),
  description: z.string({ required_error: "La descripción es requerida" }),
  completed: z.preprocess((val) => {
    if (typeof val === "string") return val === "true";
    return val;
  }, z.boolean()),
  date: z.string({ required_error: "La fecha es requerida" }),
});
