"use client";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import { getListingBookByClerkId } from "@/lib/actions/listing.actions";
import Image from "next/image";
export type ListingBooksJSX = JSX.Element;

type ListingBookProps = {
  listingBooksType: "wishlist" | "my-adds";
  param: { id: string };
};

const ListingBook = ({ listingBooksType, param }: ListingBookProps) => {
  const [offset, setOffset] = useState(2);
  const [listingBooks, setListingBooks] = useState<ListingBooksJSX[]>([]);
  const [isNext, setIsNext] = useState(true);
  const { ref, inView } = useInView();

  useEffect(() => {
    const loadNextListings = async () => {
      const { listings, isNext: hasNext } = await getListingBookByClerkId({
        clerk_id: param.id,
        page: offset,
      });
      setListingBooks((prevState) => [...prevState, ...listings]);
      setOffset((prev) => prev + 1);
      setIsNext(hasNext);
    };
    // const loadNextWishlist = async () => {
    //   const { wishlist, hasNext: isNext } = await getUserWishlist({
    //     clerk_id: userId!,
    //     page: offset,
    //   });
    //   setListingBooks([...listingBooks, ...wishlist]);
    //   setOffset((prev) => prev + 1);
    //   setIsNext(isNext);
    // };

    if (inView && isNext) {
      if (listingBooksType === "wishlist") {
        //  loadNextWishlist();
      } else {
        loadNextListings();
      }
    }
  }, [inView, listingBooks, offset, param, isNext, listingBooksType]);

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
