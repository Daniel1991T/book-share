"use server";
import BookCollections from "@/database/book.model";
import { connectToDB } from "../mongodb";
import { BookType } from "../validations";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import ListingBooks from "@/database/listing.model";

export const addBookToDB = async (book: BookType, book_id: string) => {
  const { userId } = auth();
  cloudinary.config({
    cloud_name: "dunmfhbir",
    api_key: "312551626269952",
    api_secret: "lpFoq7kjaIJUoQeFbzWCzq04ADQ",
  });

  try {
    let bookResult;
    if (!book.isGenerate) {
      // const urlsCover = await uploadImageToCloudinary(book.cover_url);
      connectToDB();
      bookResult = await BookCollections.create({
        ...book,
        // cover_url: urlsCover,
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

const uploadImageToCloudinary = async (cover_url: [string, string, string]) => {
  const uploadPromises = cover_url.map((value) => {
    return cloudinary.uploader.upload(value, {
      upload_preset: "jblqc1gd", // This should also be an environment variable if possible
    });
  });

  const result = await Promise.all(uploadPromises);
  return result.map((uploadRes) => uploadRes.url);
};
