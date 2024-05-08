import { getUserWishlist } from "@/lib/actions/listing.actions";
import { ParamsProps } from "@/types";
import Image from "next/image";
import { Suspense } from "react";

export default async function WishlistPage({ params }: ParamsProps) {
  const { wishlist } = await getUserWishlist({ clerk_id: params.id });
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
            {wishlist}
          </div>
          {/* <ListingBook listingBooksType="wishlist" /> */}
        </div>
      </Suspense>
    </section>
  );
}
