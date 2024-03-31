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
  console.log(listingBooks);

  return (
    <section className="flex pt-3 flex-wrap mt-20 container mx-auto">
      <div className="flex flex-wrap mx-auto max-w-2xl">
        {listingBooks.listingBooks.map((book) => (
          <BookCard
            key={book._id}
            author={book.book_id.author}
            title={book.book_id.title}
            image={book.book_id.cover_url[0]}
            location={book.city}
            price={book.price}
          />
        ))}
      </div>
    </section>
  );
};
export default Home;
