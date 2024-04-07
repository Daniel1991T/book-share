"use server";

import User from "@/database/user.model";
import { connectToDB } from "../mongodb";
import { CreateUserParams, ToggleAddWishlistParams } from "./shared.types";
import { revalidatePath } from "next/cache";

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

export const getUserById = async (userId: string) => {
  try {
    connectToDB();
    const user = await User.findOne({ clerk_id: userId });
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
