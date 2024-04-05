import MyListingBook from "@/components/MyListingBook";
import MyBookCard from "@/components/cards/MyBookCard";
import ListingBooks from "@/database/listing.model";
import { getListingBookByClerkId } from "@/lib/actions/listing.actions";
import { SearchParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";
import { Suspense } from "react";

const MyAds = async ({ searchParams }: SearchParamsProps) => {
  // const searchParams = useSearchParams();
  const { userId } = auth();
  const { listings } = await getListingBookByClerkId({
    clerk_id: userId!,
  });
  // const [listings, setListings] = useState<ListingBooksType[]>([]);
  // const [isNext, setIsNext] = useState(false);
  // const pageParam = searchParams.get(FILTER_URL_PARAMS.PAGE);

  // useEffect(() => {
  //   try {
  //     const fetchListings = async () => {
  //       const { listings: result, isNext } = await getListingBookByClerkId({
  //         clerk_id: userId!,
  //         page: pageParam ? +pageParam : 1,
  //       });
  //       console.log(result);
  //       setListings(JSON.parse(result));
  //       setIsNext(isNext);
  //     };
  //     if (userId) fetchListings();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }, [pageParam, userId]);

  return (
    <section>
      <Suspense fallback={<div>Loading...</div>}>
        <div className="max-w-4xl lg:max-w-5xl w-full justify-center flex gap-2 flex-col mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 w-full">
            {listings}
          </div>
          <MyListingBook />
        </div>
      </Suspense>
    </section>
  );
};

export default MyAds;
