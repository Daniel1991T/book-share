import { Document, Schema, model, models } from "mongoose";

export type TListingBook = {
  book_id: Schema.Types.ObjectId;
  clerk_id: string;
  condition: string;
  price: string;
  for_trade: boolean;
  listed_at: Date;
} & Document;

const listingBookSchema = new Schema<TListingBook>({
  book_id: {
    type: Schema.Types.ObjectId,
    ref: "Book",
    required: true,
  },
  clerk_id: {
    type: String,
    required: true,
  },
  condition: { type: String, required: true },
  price: Number,
  for_trade: { type: Boolean, default: false },
  listed_at: { type: Date, default: Date.now },
});

const ListingBooks = models.Listing || model("Listing", listingBookSchema);

export default ListingBooks;
