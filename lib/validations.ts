import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(6).max(255),
});

export const RegisterSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(6).max(255),
  name: z.string().min(5).max(255),
  surname: z.string().min(5).max(255),
  phone: z.string().min(5).max(255),
  country: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
});
