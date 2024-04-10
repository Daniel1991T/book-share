import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import AddToWishlist from "../shared/AddToWishlist";

type BookCardProps = {
  isWishlist: boolean;
  image: string;
  author: string;
  location: string;
  price: number | null;
  title: string;
  userId?: string;
  listingBookId?: string;
  isMyListingBook: boolean;
};

const BookCard = ({
  author,
  image,
  location,
  price,
  title,
  isWishlist,
  listingBookId,
  userId,
  isMyListingBook,
}: BookCardProps) => {
  return (
    <Card className="w-40 h-80 px-0 text-sm overflow-hidden">
      <div className="h-4/6 relative">
        <div className="absolute right-1 top-1 p-1 rounded-full flex items-center justify-center backdrop-blur-sm">
          {!isMyListingBook && (
            <AddToWishlist
              key={listingBookId}
              isWishlist={isWishlist}
              listingBookId={listingBookId}
              userId={userId}
            />
          )}
        </div>
        <Image
          src={image}
          className="object-cover w-full h-full rounded-t-md"
          width={300}
          height={400}
          alt={author}
        />
      </div>
      <CardContent className="p-0 pb-1 space-y-1 overflow-hidden text-ellipsis ">
        <CardTitle className="text-sm line-clamp-1">{title}</CardTitle>
        <CardDescription className="line-clamp-1">{author}</CardDescription>
        <p className="flex items-center gap-2 text-como font-bold line-clamp-1">
          <MapPin className="text-como" />
          {location}
        </p>
        <p>{price ? `$${price}` : "Free"}</p>
      </CardContent>
    </Card>
  );
};
export default BookCard;
