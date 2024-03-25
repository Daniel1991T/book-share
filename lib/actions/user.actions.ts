"use server";

import User from "@/database/user.model";
import { connectToDB } from "../mongodb";
import { CreateUserParams } from "./shared.types";

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
