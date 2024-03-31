"use server";
import BookCollections, { TBook } from "@/database/book.model";
import { connectToDB } from "../mongodb";
import { BookType } from "../validations";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import ListingBooks from "@/database/listing.model";
import { GetBooksParams } from "./shared.types";
import { FilterQuery } from "mongoose";

export const addBookToDB = async (book: BookType, book_id: string | null) => {
  const { userId } = auth();
  cloudinary.config({
    cloud_name: "dunmfhbir",
    api_key: "312551626269952",
    api_secret: "lpFoq7kjaIJUoQeFbzWCzq04ADQ",
  });

  try {
    let bookResult;
    if (!book.isGenerate) {
      const urlsCover = await uploadImageToCloudinary(book.cover_url);
      connectToDB();
      bookResult = await BookCollections.create({
        ...book,
        cover_url: urlsCover,
      });
    }

    const listingBook = await ListingBooks.create({
      book_id: bookResult._id ? bookResult._id : book_id,
      clerk_id: userId,
      condition: book.condition,
      for_trade: book.isFree === "free" ? true : false,
      price: book.price,
    });
    console.log(listingBook);
  } catch (error) {
    console.log(error);
  }
};

export const getBookByName = async ({
  page = 1,
  pageSize = 5,
  searchQuery,
}: GetBooksParams) => {
  try {
    connectToDB();
    const query: FilterQuery<typeof BookCollections> = {};
    if (searchQuery) {
      query.$or = [{ title: { $regex: new RegExp(searchQuery, "i") } }];
    }

    // Calculate the number of posts to skip based on the page number and size
    const skipAmount = (page - 1) * pageSize;
    const books = await BookCollections.find(query)
      .skip(skipAmount)
      .limit(pageSize);
    return { books };
  } catch (error: any) {
    console.error(`Failed to get books by name: ${error.message}`);
    throw new Error(`Failed to get books by name: ${error.message}`);
  }
};

export const getBookById = async (
  bookId: string
): Promise<{ book: TBook | null }> => {
  try {
    connectToDB();
    const book = await BookCollections.findById(bookId);
    return { book };
  } catch (error: any) {
    console.error(`Failed to get book by id: ${error.message}`);
    throw new Error(`Failed to get book by id: ${error.message}`);
  }
};

const uploadImageToCloudinary = async (cover_url: [string, string, string]) => {
  const uploadPromises = cover_url.map((value) => {
    return cloudinary.uploader.upload(value, {
      upload_preset: "jblqc1gd", // This should also be an environment variable if possible
    });
  });

  const result = await Promise.all(uploadPromises);
  return result.map((uploadRes) => uploadRes.url);
};
