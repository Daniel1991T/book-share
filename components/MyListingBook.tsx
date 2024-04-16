"use client";
import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useInView } from "react-intersection-observer";
import {
  getListingBookByClerkId,
  getUserWishlist,
} from "@/lib/actions/listing.actions";
import Image from "next/image";

const NUMBER_OF_LISTING_BOOKS_TO_FETCH = 5;

export type ListingBooksJSX = JSX.Element;

type ListingBookProps = {
  listingBooksType: "wishlist" | "my-adds";
};

const ListingBook = ({ listingBooksType }: ListingBookProps) => {
  const { userId } = useAuth();
  const [offset, setOffset] = useState(2);
  const [listingBooks, setListingBooks] = useState<ListingBooksJSX[]>([]);
  const [isNext, setIsNext] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    const loadNextListings = async () => {
      const { listings, isNext } = await getListingBookByClerkId({
        clerk_id: userId!,
        page: offset,
      });
      setListingBooks([...listingBooks, ...listings]);
      setOffset((prev) => prev + 1);
      setIsNext(isNext);
    };
    const loadNextWishlist = async () => {
      const { wishlist, hasNext: isNext } = await getUserWishlist({
        clerk_id: userId!,
        page: offset,
      });
      setListingBooks([...listingBooks, ...wishlist]);
      setOffset((prev) => prev + 1);
      setIsNext(isNext);
    };

    if (inView && isNext) {
      if (listingBooksType === "wishlist") {
        loadNextWishlist();
      } else {
        loadNextListings();
      }
    }
  }, [inView, listingBooks, offset, userId, isNext, listingBooksType]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
      {listingBooks}
      {isNext && (
        <div ref={ref} className="flex justify-center">
          <Image
            src="../assets/icons/spinner.svg"
            alt="spinner"
            width={56}
            height={56}
            className="object-contain"
          />
        </div>
      )}
    </div>
  );
};
export default ListingBook;
