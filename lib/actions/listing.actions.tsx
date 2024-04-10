"use server";

import ListingBooks, {
  LISTING_BOOKS_MODEL_MONGODB,
} from "@/database/listing.model";
import { connectToDB } from "../mongodb";
import { ListingBooksType } from "@/types";
import MyBookCard from "@/components/cards/MyBookCard";
import User from "@/database/user.model";
import { BOOKS_COLLECTIONS_MODEL_MONGODB } from "@/database/book.model";

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
    const listings = (await ListingBooks.find({ clerkId: clerk_id })
      .populate({
        path: "book_id",
        model: "BooksCollections",
      })
      .skip((page - 1) * pageSize)
      .limit(pageSize)
      .sort({ listed_at: -1 })) as ListingBooksType[];
    const totalListingBooks = await ListingBooks.countDocuments({
      clerk_id: clerk_id,
    });
    const isNext = totalListingBooks > page * pageSize + listings.length;
    console.log("isNext", isNext);

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
    console.log("clerk_id", JSON.stringify(clerk_id));

    const user = await User.findOne({ clerkId: clerk_id }).populate({
      path: "wishlist",
      model: LISTING_BOOKS_MODEL_MONGODB,
      populate: {
        path: "book_id",
        model: BOOKS_COLLECTIONS_MODEL_MONGODB,
      },
    });

    console.log("user", user);

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
