import { z } from "zod";

export const urlSchema = z.object({
  originalURL: z
    .string({
      required_error: "La url es un campo requerido",
      invalid_type_error: "La url debe ser una cadena de caracteres",
    })
    .url({
      message: "Formato de URL incorrecto",
    }),
});
