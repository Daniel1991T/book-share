import BookCard from "@/components/cards/BookCard";
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
    <section className="flex pt-3 mt-20 container mx-auto">
      <div className="flex flex-wrap w-full gap-2 mx-auto max-w-2xl justify-start">
        {listingBooks.map((listingBook) => (
          <BookCard
            key={listingBook._id}
            author={listingBook.book.author}
            title={listingBook.book.title}
            image={listingBook.book.cover_url[0]}
            location={listingBook.city}
            price={listingBook.price}
          />
        ))}
      </div>
    </section>
  );
};
export default Home;
