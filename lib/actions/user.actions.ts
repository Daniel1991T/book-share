"use server";

import User from "@/database/user.model";
import { connectToDB } from "../mongodb";
import { CreateUserParams, ToggleAddWishlistParams } from "./shared.types";
import { revalidatePath } from "next/cache";
import { LISTING_BOOKS_MODEL_MONGODB } from "@/database/listing.model";
import { BOOKS_COLLECTIONS_MODEL_MONGODB } from "@/database/book.model";
import { auth, clerkClient, getAuth } from "@clerk/nextjs/server";
import { redirect } from "next/dist/server/api-utils";
import { redirectToSignIn } from "@clerk/nextjs";
import path from "path";
import { log } from "console";
import { convertBase64 } from "../utils";

export const createUser = async (userData: CreateUserParams) => {
  try {
    connectToDB();
    const newUser = await User.create(userData);
    return newUser;
  } catch (error: any) {
    console.log(error);
    throw new Error("Create user fail", error);
  }
};

export const getUserByClerkId = async (userId: string) => {
  try {
    connectToDB();
    const user = await User.findOne({ clerkId: userId });
    console.log(user);

    return user;
  } catch (error: any) {
    console.log(error);
    throw new Error("Get user by id fail", error);
  }
};

export const toggleAddToWishlist = async ({
  path,
  listingBookId,
  userId,
}: ToggleAddWishlistParams) => {
  try {
    connectToDB();
    const user = await User.findById(userId);
    if (!user) throw new Error("User not found!");

    const isBookInWishlist = user.wishlist.includes(listingBookId);
    console.log("isBookInWishlist", isBookInWishlist);
    console.log("listingBookId", listingBookId);

    if (isBookInWishlist) {
      // remove question from user saved question
      await User.findByIdAndUpdate(
        userId,
        { $pull: { wishlist: listingBookId } },
        { new: true }
      );
    } else {
      // add question to user saved question
      await User.findByIdAndUpdate(
        userId,
        { $push: { wishlist: listingBookId } },
        { new: true }
      );
    }
    revalidatePath(path);
  } catch (error) {
    console.log(error);
    throw error;
  }
};

export const updateImageProfile = async (
  image: File,
  clerkId: string,
  path: string
) => {
  console.log("updateImageProfile", clerkId, path);
  try {
    const imageBase64 = await convertBase64(image);
    const updatedImage = await clerkClient.users
      .updateUserProfileImage(clerkId, { file: imageBase64 as File })
      .catch((error) => {
        console.log(error);
      });
    console.log(updatedImage);
    revalidatePath(path);
    revalidatePath("/");
  } catch (error) {
    console.log("update Image error", error);
    throw error;
  }
};
