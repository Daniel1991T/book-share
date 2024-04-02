import BookCard from "@/components/cards/BookCard";
import FilterByCountry from "@/components/FilterByCountry";
import FilterByGender from "@/components/FilterByGender";
import Pagination from "@/components/Pagination";
import { getListingBooks } from "@/lib/actions/book.actions";
import { SearchParamsProps } from "@/types";

const Home = async ({ searchParams }: SearchParamsProps) => {
  const { listings, hasNext } = await getListingBooks({
    searchQuery: searchParams.q,
    filter: {
      city: searchParams.city,
      country: searchParams.country,
      gender: searchParams.gender,
      price: searchParams.price ? parseInt(searchParams.price) : undefined,
    },
    page: searchParams.page ? +searchParams.page : 1,
  });

  return (
    <section
      className="flex flex-col mt-16 md:h-[calc(100vh-5rem)] md:grid md:grid-cols-5 
    md:grid-rows-10 justify-center"
    >
      <div className="row-span-5 md:justify-end items-start px-2 mt-2 flex">
        <FilterByGender />
      </div>
      <div className="hidden h-[60px] col-span-4 mt-2 md:flex w-full max-w-4xl items-center">
        <FilterByCountry
          otherClasses="min-h-[56px] sm:min-w-[170px] max-w-[200px]"
          containerClasses="hidden md:flex gap-2 items-center"
        />
      </div>
      <div
        className="flex flex-col gap-2 h-full justify-between max-w-4xl 
      px-3 col-span-4 row-span-4 col-start-2 row-start-2"
      >
        <div className="flex md:items-start justify-center flex-wrap w-full gap-2  md:justify-start">
          {listings.map((listingBook) => (
            <BookCard
              key={listingBook._id}
              author={listingBook.book.author}
              title={listingBook.book.title}
              image={listingBook.book.cover_url[0]}
              location={`${listingBook.city}, ${listingBook.country}`}
              price={listingBook.price}
            />
          ))}
        </div>
        <Pagination
          pageNumber={searchParams.page ? +searchParams.page : 1}
          isNext={hasNext}
        />
      </div>
    </section>
  );
};
export default Home;
