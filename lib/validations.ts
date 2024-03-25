import * as z from "zod";

export const LoginSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(6).max(255),
});

const phoneRegex = new RegExp(
  /^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/
);

export const RegisterSchema = z.object({
  email: z.string().email().min(5).max(255),
  password: z.string().min(6).max(255),
  name: z.string().min(5).max(255),
  surname: z.string().min(5).max(255),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number")
    .min(10, "Phone number too short")
    .max(15, "Phone number too long"),
  country: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
});

export const OtpSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Your code need to contain 6 digits" })
    .max(6),
});
