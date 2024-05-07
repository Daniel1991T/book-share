import ListingBook from "@/components/ListingBooks";
import { getListingBookByClerkId } from "@/lib/actions/listing.actions";
import { ParamsProps } from "@/types";
import Image from "next/image";
import { Suspense } from "react";

const Ads = async ({ params }: ParamsProps) => {
  const { listings } = await getListingBookByClerkId({
    clerk_id: params.id,
  });

  return (
    <section className="flex w-full h-full justify-center items-center">
      <Suspense
        fallback={
          <div className="flex items-center justify-center h-screen w-screen">
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
        <div className="max-w-3xl lg:max-w-4xl xl:max-w-5xl w-full pt-4 justify-center items-center flex gap-2 flex-col mx-auto">
          <div className="grid grid-cols-1 px-10 md:px-2 mx-auto md:grid-cols-2 gap-2 w-full">
            {listings}
          </div>
          <ListingBook listingBooksType="my-adds" param={params} />
        </div>
      </Suspense>
    </section>
  );
};

export default Ads;
