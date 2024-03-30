import { BookType } from "@/lib/validations";
import { Document, Schema, model, models } from "mongoose";

export type TBook = Omit<BookType, "condition" | "isFree" | "price"> & {
  createdAt: Date;
} & Document;

const BookCollectionsSchema = new Schema<TBook>({
  author: { type: String, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  gender: { type: String, required: true },
  publisher: { type: String, required: true },
  publication_year: { type: String, required: true },
  language: { type: String, required: true },
  print_length: { type: String, required: true },
  cover_url: { type: [String], required: true },
  createdAt: { type: Date, default: Date.now },
});

const BookCollections =
  models.BooksCollections || model("BooksCollections", BookCollectionsSchema);

export default BookCollections;
