"use server";

import ListingBooks from "@/database/listing.model";
import { connectToDB } from "../mongodb";
import { ListingBooksType } from "@/types";
import MyBookCard from "@/components/cards/MyBookCard";

export const getListingBookByClerkId = async ({
  clerk_id,
  page = 1,
  pageSize = 9,
}: {
  clerk_id: string;
  page?: number;
  pageSize?: number;
}) => {
  try {
    connectToDB();
    console.log(clerk_id);

    const listings = (await ListingBooks.find({ clerk_id: clerk_id })
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
    const isNext = totalListingBooks > page + listings.length;

    return {
      listings: listings.map((listing) => (
        <MyBookCard listingBook={listing} key={listing._id} />
      )),
      isNext,
    };
  } catch (error: any) {
    console.error(`Failed to get listing books: ${error.message}`);
    throw new Error(`Failed to get listing books: ${error.message}`);
  }
};
