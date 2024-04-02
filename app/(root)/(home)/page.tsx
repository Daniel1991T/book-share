import BookCard from "@/components/cards/BookCard";
import FilterByGender from "@/components/form/FilterByGender";
import { getListingBooks } from "@/lib/actions/book.actions";
import { SearchParamsProps } from "@/types";

const Home = async ({ searchParams }: SearchParamsProps) => {
  const listingBooks = await getListingBooks({
    searchQuery: searchParams.q,
    filter: {
      city: searchParams.city,
      country: searchParams.country,
      gender: searchParams.gender,
      price: searchParams.price ? parseInt(searchParams.price) : undefined,
    },
  });

  return (
    <section className="flex flex-col md:grid md:grid-cols-5 md:grid-rows-10 pt-3 justify-center mt-20">
      <div className="row-span-5 md:justify-end items-start px-2 flex">
        <FilterByGender />
      </div>
      <div className="col-span-4"></div>

      <div className="flex col-span-4 row-span-4 col-start-2 row-start-2 md:items-start justify-center flex-wrap w-full gap-2  md:justify-start">
        {listingBooks.map((listingBook) => (
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
    </section>
  );
};
export default Home;
