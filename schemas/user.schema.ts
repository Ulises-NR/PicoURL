import { z } from "zod";

export const registerSchema = z.object({
  username: z
    .string({
      invalid_type_error: "El nombre debe ser una cadena de caracteres",
      required_error: "El nombre es un campo requerido",
    })
    .min(4, {
      message: "El nombre debe contener al menos 4 caracteres",
    })
    .max(30, {
      message: "El nombre no puede exceder los 30 caracteres",
    }),
  email: z
    .string({
      invalid_type_error: "El email debe ser una cadena de caracteres válida",
      required_error: "El email es un campo requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z
    .string({
      invalid_type_error: "La contraseña debe ser una cadena de caracteres",
      required_error: "La contraseña es un campo requerido",
    })
    .min(8, {
      message: "La contraseña debe contener al menos 8 caracteres",
    })
    .max(30, {
      message: "La contraseña no puede exceder los 30 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "El email debe ser una cadena de caracteres válida",
      required_error: "El email es un campo requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z
    .string({
      invalid_type_error: "La contraseña debe ser una cadena de caracteres",
      required_error: "La contraseña es un campo requerido",
    })
    .min(8, {
      message: "La contraseña debe contener al menos 8 caracteres",
    })
    .max(30, {
      message: "La contraseña no puede exceder los 30 caracteres",
    }),
});
