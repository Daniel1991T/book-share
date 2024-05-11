import { Document, Schema, model, models } from "mongoose";

export type TReview = {
  authorMongoUserId: Schema.Types.ObjectId;
  forUserClerkId: string;
  comment: string;
  rating: number;
  postedAt: Date;
} & Document;

const ReviewSchema = new Schema<TReview>({
  authorMongoUserId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  forUserClerkId: { type: String, required: true },
  comment: { type: String, required: true },
  rating: { type: Number, required: true },
  postedAt: { type: Date, default: Date.now },
});

const Review = models.Review || model("Review", ReviewSchema);
export const USER_MODEL_MONGODB = "Review";

export default Review;
