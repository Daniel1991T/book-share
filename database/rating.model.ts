import { Document, Schema, model, models } from "mongoose";

export type TReview = {
  authorId: Schema.Types.ObjectId;
  forUserId: Schema.Types.ObjectId;
  review: string;
  rate: string;
  postedAt: Date;
} & Document;

const ReviewSchema = new Schema<TReview>({
  authorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  forUserId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  review: { type: String, required: true },
  rate: { type: String, required: true },
  postedAt: { type: Date, default: Date.now },
});

const Review = models.User || model("Review", ReviewSchema);
export const USER_MODEL_MONGODB = "Review";

export default Review;
