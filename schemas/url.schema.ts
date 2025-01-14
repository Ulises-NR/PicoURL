import { z } from "zod";

export const urlSchema = z.object({
  originalURL: z
    .string({
      required_error: "URL is a required field.",
      invalid_type_error: "The url must be a string of characters",
    })
    .url({
      message: "Incorrect URL format",
    }),
});
