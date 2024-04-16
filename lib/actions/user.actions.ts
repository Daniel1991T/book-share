"use server";

import User, { TUser } from "@/database/user.model";
import { connectToDB } from "../mongodb";
import {
  CreateUserParams,
  ToggleAddWishlistParams,
  ToggleFollowUserParams,
  UpdateUserParams,
} from "./shared.types";
import { revalidatePath } from "next/cache";
import { auth, clerkClient } from "@clerk/nextjs/server";
import { convertBase64 } from "../utils";
import ListingBooks from "@/database/listing.model";

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

export const toggleFollowUser = async ({
  followUserId,
  path,
}: ToggleFollowUserParams) => {
  try {
    connectToDB();
    console.log("toggleFollowUser");

    const { userId } = auth();
    if (!userId) throw new Error("User not found");
    const authUser = await User.findOne({ clerkId: userId });
    if (!authUser) throw new Error("Auth user not found");

    const isFollowing = authUser.followUser?.includes(followUserId);
    if (authUser._id === followUserId) throw new Error("Can't follow yourself");
    console.log("authUser clerk", userId);
    console.log("auth", authUser);
    console.log("follow:", followUserId);

    if (isFollowing) {
      // remove question from user saved question
      console.log("remove");

      await User.findByIdAndUpdate(
        authUser?._id,
        { $pull: { followUser: followUserId } },
        { new: true }
      );
    } else {
      // add question to user saved question
      console.log("add");

      await User.findByIdAndUpdate(
        authUser?._id,
        { $push: { followUser: followUserId } },
        { new: true }
      ).catch((error) => {
        console.log(error);
        throw error;
      });
    }

    revalidatePath(path);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const updateImageProfile = async (
  image: File,
  clerkId: string,
  path: string
) => {
  try {
    const imageBase64 = await convertBase64(image);
    const updatedImage = await clerkClient.users
      .updateUserProfileImage(clerkId, { file: imageBase64 as File })
      .catch((error) => {
        console.error(error);
      });
    revalidatePath(path);
    revalidatePath("/");
  } catch (error) {
    console.error("update Image error", error);
    throw error;
  }
};

export const updateUser = async ({
  clerkId,
  path,
  updateData,
}: UpdateUserParams) => {
  try {
    connectToDB();
    await User.findOneAndUpdate({ clerkId }, updateData, { new: true });
    revalidatePath(path);
    revalidatePath("/");
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export const getUserDetail = async (clerkId: string) => {
  try {
    connectToDB();
    const { userId } = auth();
    if (!userId) throw new Error("User not found");
    const me = (await User.findOne({ clerkId: userId })) as TUser;
    const user = (await User.findOne({ clerkId })) as TUser;
    const userAvatar = await clerkClient.users.getUser(clerkId);
    const numOfListing = await ListingBooks.countDocuments({
      clerk_id: clerkId,
    });
    return {
      user,
      imageUrl: userAvatar.imageUrl,
      numOfListing,
      isFollowing: me.followUser?.includes(user._id),
    };
  } catch (error: any) {
    console.error(`Failed to get user detail: ${error.message}`);
    throw new Error(`Failed to get user detail: ${error.message}`);
  }
};
