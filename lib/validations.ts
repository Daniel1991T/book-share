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
  name: z.string().min(1).max(255),
  surname: z.string().min(1).max(255),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number")
    .min(10, "Phone number too short")
    .max(15, "Phone number too long"),
  country: z.string().min(3).max(255),
  city: z.string().min(3).max(255),
});

export const EditProfileSchema = z.object({
  name: z.string().min(1).max(255),
  surname: z.string().min(1).max(255),
  phone: z
    .string()
    .regex(phoneRegex, "Invalid phone number")
    .min(10, "Phone number too short")
    .max(15, "Phone number too long"),
  country: z.string().min(1).max(255),
  city: z.string().min(1).max(255),
  bio: z.string().min(15).max(255),
});

export type EditProfileInputType =
  | "name"
  | "surname"
  | "phone"
  | "bio"
  | "country"
  | "city";

export type EditProfileType = z.infer<typeof EditProfileSchema>;

export const OtpSchema = z.object({
  pin: z
    .string()
    .min(6, { message: "Your code need to contain 6 digits" })
    .max(6),
});

export enum ConditionBook {
  NEW = "new",
  USED = "used",
}

export enum GenderBook {
  FICTION = "fiction",
  NONFICTION = "nonfiction",
  EDUCATION = "education",
  MAGAZINE_COMICS = "magazine & comics",
  CHILDREN = "children's literature",
}

export enum BookPrice {
  FREE = "free",
  PRICE = "price",
}

export const BookSchema = z.object({
  isGenerate: z.boolean().default(false),
  title: z.string().min(1).max(255),
  description: z.string().min(255),
  author: z.string().min(3).max(255),
  gender: z.enum([
    GenderBook.CHILDREN,
    GenderBook.EDUCATION,
    GenderBook.FICTION,
    GenderBook.MAGAZINE_COMICS,
    GenderBook.NONFICTION,
  ]),
  publisher: z.string().min(3).max(255),
  publication_year: z.string(),
  language: z.string().min(3).max(255),
  print_length: z.string(),
  condition: z.enum([ConditionBook.NEW, ConditionBook.USED]),
  isFree: z.enum([BookPrice.FREE, BookPrice.PRICE]),
  price: z.string().optional(),
  cover_url: z.tuple([z.string().min(3), z.string().min(3), z.string().min(3)]),
});

export type BookType = z.infer<typeof BookSchema>;

export type BookSchemaProp =
  | "title"
  | "description"
  | "author"
  | "gender"
  | "publisher"
  | "publication_year"
  | "language"
  | "print_length"
  | "condition"
  | "isFree"
  | "price"
  | "cover_url";
