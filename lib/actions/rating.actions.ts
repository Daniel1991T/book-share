"use server";
import { connectToDB } from "../mongodb";
import { RatingSchema } from "../validations";
import Review from "@/database/rating.model";
import { auth } from "@clerk/nextjs";
import { getUserByClerkId } from "./user.actions";
import { TUser, USER_MODEL_MONGODB } from "@/database/user.model";
import { TReviewModel, TReviewUser } from "./shared.types";
import { clerkClient } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

export const createCommentTo = async (comment: unknown, path: string) => {
  try {
    const parseData = RatingSchema.safeParse(comment);
    if (!parseData.success) {
      throw new Error("Invalid data");
    }
    const { userId } = auth();
    if (!userId) {
      throw new Error("You need to login to rate this user");
    }
    if (parseData.data.forUserClerkId === userId) {
      throw new Error("You can't rate yourself");
    }
    const mongoUser: TUser = await getUserByClerkId(userId);
    const newReview: TReviewModel = {
      authorMongoUserId: mongoUser._id,
      forUserClerkId: parseData.data.forUserClerkId,
      comment: parseData.data.comment,
      rating: parseData.data.rating,
      postedAt: new Date(),
    };
    console.log("newReview", newReview);

    connectToDB();
    const review = await Review.create(newReview);
    revalidatePath(path);
    return review;
  } catch (error: any) {
    console.log(error);
    throw new Error("Create user fail", error);
  }
};

export const getReviewOfUserClerkId = async (clerk_id: string) => {
  try {
    connectToDB();
    const reviews = (await Review.find({ forUserClerkId: clerk_id })
      .populate({
        path: "authorMongoUserId",
        model: USER_MODEL_MONGODB,
        select: "name surname clerkId",
      })
      .sort({ postedAt: -1 })) as unknown as TReviewUser[];
    console.log(reviews);

    const mapReviews = (await Promise.all(
      reviews.map(async (review) => {
        const user = await clerkClient.users.getUser(
          review.authorMongoUserId.clerkId
        );
        return {
          _id: review._id,
          comment: review.comment,
          rating: review.rating,
          postedAt: review.postedAt,
          authorMongoUserId: {
            clerkId: review.authorMongoUserId.clerkId,
            name: review.authorMongoUserId.name,
            surname: review.authorMongoUserId.surname,
            picture: user.imageUrl,
          },
        };
      })
    )) as TReviewUser[];
    return mapReviews as unknown as TReviewUser[];
  } catch (error: any) {
    console.log(error);
    throw new Error("Get review fail", error);
  }
};
