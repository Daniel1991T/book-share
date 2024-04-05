import { ListingBooksType } from "@/types";
import { CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";

type MyBookCardProps = {
  listingBook: ListingBooksType;
};

const MyBookCard = ({ listingBook }: MyBookCardProps) => {
  const { book_id, price } = listingBook;
  const { cover_url, title, author, description } = book_id;
  return (
    <div
      className="bg-light-800 h-42 overflow-hidden items-start justify-start gap-2 w-80 
    p-2 mx-6 rounded-2xl flex flex-row"
    >
      <Image
        src={cover_url[0]}
        className="object-contain rounded-xl w-28 h-40 md:h-40 md:rounded-l-xl md:rounded-r-none 
        transform hover:scale-105 duration-200"
        width={120}
        height={160}
        alt={author}
      />

      <CardContent className="p-0 pb-1 space-y-1 overflow-hidden text-ellipsis ">
        <CardTitle className="text-sm line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-1">{author}</CardDescription>
        <CardDescription className="line-clamp-1">
          {listingBook._id}
        </CardDescription>
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
        <p>{price ? `$${price}` : "Free"}</p>
      </CardContent>
    </div>
  );
};
export default MyBookCard;
