"use server";

import ListingBooks, {
  LISTING_BOOKS_MODEL_MONGODB,
} from "@/database/listing.model";
import { connectToDB } from "../mongodb";
import { ListingBooksType } from "@/types";
import MyBookCard from "@/components/cards/MyBookCard";
import User from "@/database/user.model";
import { BOOKS_COLLECTIONS_MODEL_MONGODB } from "@/database/book.model";
import { getUserByClerkId, getUserClerkId } from "./user.actions";
import { clerkClient } from "@clerk/nextjs/server";
import { ListingBooksByUserIdParams } from "./shared.types";

export const getListingBookByClerkId = async ({
  clerk_id,
  page = 1,
  pageSize = 10,
}: {
  clerk_id: string;
  page?: number;
  pageSize?: number;
}) => {
  try {
    connectToDB();

    const listings = (await ListingBooks.find({
      clerk_id: clerk_id,
    })
      .populate({
        path: "book_id",
        model: "BooksCollections",
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ listed_at: -1 })
      .catch((err) => console.log(err))) as ListingBooksType[];
    const totalListingBooks = await ListingBooks.countDocuments({
      clerk_id: clerk_id,
    });
    const isNext = totalListingBooks > page * pageSize + listings.length;

    return {
      listings: listings.map((listing, index) => (
        <MyBookCard index={index} listingBook={listing} key={listing._id} />
      )),
      isNext,
    };
  } catch (error: any) {
    console.error(`Failed to get listing books: ${error.message}`);
    throw new Error(`Failed to get listing books: ${error.message}`);
  }
};

export const getListingBookByUserId = async ({
  userId,
  page = 1,
  pageSize = 10,
}: ListingBooksByUserIdParams) => {
  try {
    connectToDB();
    const clerkId = await getUserClerkId(userId);
    if (!clerkId) throw new Error("User not found");
    const listingsBook = (await ListingBooks.find({ clerk_id: clerkId })
      .populate({
        path: "book_id",
        model: BOOKS_COLLECTIONS_MODEL_MONGODB,
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ listed_at: -1 })) as ListingBooksType[];
    const totalListingBooks = await ListingBooks.countDocuments({
      clerk_id: clerkId,
    });
    const hasNext = totalListingBooks > page * pageSize + listingsBook.length;

    return {
      listingsBook,
      hasNext,
    };
  } catch (error: any) {
    console.error(`Failed to get listing books by user id: ${error.message}`);
    throw new Error(`Failed to get listing books by user id: ${error.message}`);
  }
};

export const getUserWishlist = async ({
  clerk_id,
  page = 1,
  pageSize = 8,
}: {
  clerk_id: string;
  page?: number;
  pageSize?: number;
}) => {
  try {
    connectToDB();

    const user = await User.findOne({ clerkId: clerk_id }).populate({
      path: "wishlist",
      model: LISTING_BOOKS_MODEL_MONGODB,
      populate: {
        path: "book_id",
        model: BOOKS_COLLECTIONS_MODEL_MONGODB,
      },
    });
    if (!user) throw new Error("User not found!");
    //  const wishlistCount = await User.countDocuments({
    //    clerkId: clerk_id,
    //   wishlist: { $exists: true },
    // });
    // console.log("wishlistCount", wishlistCount);

    // const hasNext = wishlistCount > page * pageSize + user?.wishlist?.length;

    return {
      wishlist: (user.wishlist as ListingBooksType[]).map((listing, index) => (
        <MyBookCard index={index} listingBook={listing} key={listing._id} />
      )),
      hasNext: true,
    };
  } catch (error: any) {
    console.error(`Failed to get user wishlist: ${error.message}`);
    throw new Error(`Failed to get user wishlist: ${error.message}`);
  }
};

export const getListingBookById = async (id: string) => {
  try {
    connectToDB();
    const listingBook = await ListingBooks.findById(id).populate({
      path: "book_id",
      model: BOOKS_COLLECTIONS_MODEL_MONGODB,
    });
    if (!listingBook) throw new Error("Listing book not found!");
    const user = await getUserByClerkId(listingBook.clerk_id);
    if (!user) throw new Error("User not found!");
    const userAvatar = (await clerkClient.users.getUser(listingBook.clerk_id))
      .imageUrl;
    return {
      listingBook: listingBook as ListingBooksType,
      user: user,
      imageUrl: userAvatar,
    };
  } catch (error: any) {
    console.error(`Failed to get listing book by id: ${error.message}`);
    throw new Error(`Failed to get listing book by id: ${error.message}`);
  }
};
