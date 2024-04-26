import { z } from "zod";

export const userSchema = z.object({
  name: z.string({
    required_error: "required",
  }),
  email: z.string().email({
    required_error: "required, ",
    message: "wrong, must be a valid email!",
  }),
});

export const paramSchema = z.object({
  id: z.number({
    message: "wrong, param id should be a number",
  }),
});
