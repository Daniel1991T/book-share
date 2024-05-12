"use server";
import { connectToDB } from "../mongodb";
import { RatingSchema } from "../validations";
import Review from "@/database/rating.model";
import { auth } from "@clerk/nextjs";
import { getUserByClerkId } from "./user.actions";
import User, { TUser, USER_MODEL_MONGODB } from "@/database/user.model";
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
    if (review) {
      console.info(
        "Review created successfully and updating average rating for user"
      );

      await updateAverageRatingForUser(parseData.data.forUserClerkId)
        .then(() => console.log("Average rating updated successfully"))
        .catch((error) => {
          console.error("Failed to update average rating:", error);
          throw error;
        });
    }
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

/**
 * Calculates the average rating for a given user identified by their Clerk ID.
 * @param clerkId The Clerk ID of the user for whom the average rating is to be calculated.
 */
export const updateAverageRatingForUser = async (clerkId: string) => {
  try {
    connectToDB(); // Connect to the database.

    const result = await Review.aggregate([
      { $match: { forUserClerkId: clerkId } }, // Filter to only include reviews for the specific user.
      { $group: { _id: null, averageRating: { $avg: "$rating" } } }, // Calculate the average rating.
    ]);

    if (result.length > 0) {
      await User.updateOne({ clerkId }, { rating: result[0].averageRating });
    }
  } catch (error) {
    console.error("Failed to calculate average rating:", error);
    throw error; // Rethrow the error for further handling.
  }
};

const getRatingForUser = async (clerkId: string): Promise<number> => {
  try {
    connectToDB(); // Connect to the database.
    const user = await User.findOne({ clerkId }).select("rating");
    return user?.rating ?? 0;
  } catch (error: any) {
    console.error("Failed to get rating:", error);
    throw new Error("Get rating fail", error);
  }
};
