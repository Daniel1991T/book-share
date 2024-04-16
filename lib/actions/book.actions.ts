"use server";
import BookCollections, { TBook } from "@/database/book.model";
import { connectToDB } from "../mongodb";
import { BookType, GenderBook } from "../validations";
import { v2 as cloudinary } from "cloudinary";
import { auth } from "@clerk/nextjs/server";
import ListingBooks from "@/database/listing.model";
import { GetBooksParams, GetListingBooksParams } from "./shared.types";
import { FilterQuery } from "mongoose";
import { revalidatePath } from "next/cache";
import { GENDER_BOOK_FILTER } from "@/constants/filter";
import { ListingBooksType } from "@/types";
import { env } from "@/env";

export const addBookToDB = async (book: BookType, book_id: string | null) => {
  const { userId } = auth();

  cloudinary.config({
    cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
    api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
    api_secret: env.CLOUDINARY_API_SECRET,
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
      book_id: bookResult?._id ? bookResult._id : book_id,
      clerk_id: userId,
      condition: book.condition,
      for_trade: book.isFree === "free" ? true : false,
      price: book.price,
    });
    revalidatePath("/");
  } catch (error: any) {
    console.log(error);
    throw new Error(`Failed to add book to database: ${error.message}`);
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

export const getListingBooks = async ({
  filter,
  page = 1,
  pageSize = 10,
  searchQuery,
}: GetListingBooksParams) => {
  try {
    connectToDB();
    const matchConditions: any = {};
    if (searchQuery) {
      matchConditions["book_details.title"] = new RegExp(searchQuery, "i");
    }
    if (filter?.gender && filter?.gender !== GENDER_BOOK_FILTER.RECENT_ADDED) {
      matchConditions["book_details.gender"] = filter.gender;
    }
    if (filter?.country) {
      matchConditions["user.country"] = new RegExp(filter.country, "i");
    }
    if (filter?.city) {
      matchConditions["city"] = filter.city;
    }
    if (filter?.price) {
      matchConditions["price"] = { $lte: filter.price };
    }

    const skip = (page - 1) * pageSize;

    const listings = await ListingBooks.aggregate([
      {
        $lookup: {
          from: "bookscollections",
          localField: "book_id",
          foreignField: "_id",
          as: "book_details",
        },
      },
      {
        $sort: {
          listed_at:
            filter?.gender === GENDER_BOOK_FILTER.RECENT_ADDED ? -1 : 1,
        },
      },
      { $unwind: "$book_details" },
      // Limitează numărul de documente returnate
      {
        $lookup: {
          from: "users",
          localField: "clerk_id",
          foreignField: "clerkId",
          as: "user",
        },
      },
      { $match: matchConditions },
      { $unwind: "$user" },
      { $skip: skip }, // Sari peste documentele anterioare paginii curente
      { $limit: pageSize },
      // Sortează în ordine descrescătoare după data listării

      {
        $project: {
          // Proiectează câmpurile dorite
          _id: 1,
          book_id: 1,
          clerk_id: 1,
          condition: 1,
          price: 1,
          for_trade: 1,
          listed_at: 1,
          country: "$user.country",
          city: "$user.city",
          book: {
            title: "$book_details.title",
            author: "$book_details.author",
            gender: "$book_details.gender",
            cover_url: "$book_details.cover_url",
          },
        },
      },
    ]);
    const { totalPages } = await calculateTotalPages(matchConditions, pageSize);
    return { listings, hasNext: page < totalPages };
  } catch (error: any) {
    console.error(`Failed to get listing books: ${error.message}`);
    throw new Error(`Failed to get listing books: ${error.message}`);
  }
};

interface PaginationInfo {
  totalListings: number;
  totalPages: number;
}

async function calculateTotalPages(
  matchConditions: any,
  limit: number
): Promise<PaginationInfo> {
  const totalListingsResult = await ListingBooks.aggregate([
    {
      $lookup: {
        from: "bookscollections",
        localField: "book_id",
        foreignField: "_id",
        as: "book_details",
      },
    },
    { $unwind: "$book_details" },
    {
      $lookup: {
        from: "users",
        localField: "clerk_id",
        foreignField: "clerkId",
        as: "user",
      },
    },
    { $unwind: "$user" },
    { $match: matchConditions }, // Utilizează matchConditions pentru a filtra listările
    { $count: "total" },
  ]);

  const totalListings =
    totalListingsResult.length > 0 ? totalListingsResult[0].total : 0;
  const totalPages = Math.ceil(totalListings / limit);

  return { totalListings, totalPages };
}

const uploadImageToCloudinary = async (cover_url: [string, string, string]) => {
  const uploadPromises = cover_url.map((value) => {
    return cloudinary.uploader.upload(value, {
      upload_preset: "jblqc1gd", // This should also be an environment variable if possible
    });
  });

  const result = await Promise.all(uploadPromises);
  return result.map((uploadRes) => uploadRes.url);
};
