import ListingBook from "@/components/MyListingBook";
import { getListingBookByClerkId } from "@/lib/actions/listing.actions";
import { auth } from "@clerk/nextjs";
import Image from "next/image";
import { Suspense } from "react";

const MyAds = async () => {
  const { userId } = auth();
  const { listings } = await getListingBookByClerkId({
    clerk_id: userId!,
  });

  return (
    <section>
      <Suspense
        fallback={
          <div>
            <Image
              src="../assets/icons/spinner.svg"
              alt="spinner"
              width={56}
              height={56}
              className="object-contain"
            />
          </div>
        }
      >
        <div className="max-w-4xl lg:max-w-5xl w-full pt-4 justify-center flex gap-2 flex-col mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 w-full">
            {listings}
          </div>
          <ListingBook listingBooksType="my-adds" />
        </div>
      </Suspense>
    </section>
  );
};

export default MyAds;
