import { Document, Schema, model, models } from "mongoose";

export type TUser = {
  clerkId: string;
  name: string;
  surname: string;
  email: string;
  password?: string;
  bio?: string;
  picture?: string;
  city?: string;
  phone?: string;
  country?: string;
  rating?: number;
  reputation: Schema.Types.ObjectId[];
  wishlist: Schema.Types.ObjectId[];
  joinedAt: Date;
} & Document;

const UserSchema = new Schema<TUser>({
  clerkId: { type: String, required: true },
  name: { type: String, required: true },
  surname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String },
  bio: { type: String },
  picture: { type: String },
  city: { type: String },
  phone: { type: String },
  country: { type: String },
  rating: { type: Number, default: 0 },
  reputation: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  wishlist: [{ type: Schema.Types.ObjectId, ref: "Listing" }],
  joinedAt: { type: Date, default: Date.now },
});

const User = models.User || model("User", UserSchema);
export const USER_MODEL_MONGODB = "User";

export default User;
