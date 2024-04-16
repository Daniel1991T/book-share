import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
} from "@/components/ui/card";
import { MapPin } from "lucide-react";
import Image from "next/image";
import AddToWishlist from "../shared/AddToWishlist";
import { MotionDiv } from "../shared/MotionDiv";
import Link from "next/link";

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
  index: number;
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
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
  index,
}: BookCardProps) => {
  return (
    <MotionDiv
      variants={variants}
      initial="hidden"
      animate="visible"
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: "easeInOut",
      }}
      viewport={{ amount: 0 }}
    >
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
        <Link href={`/listing-book/${JSON.parse(listingBookId!)}`}>
          <CardContent className="p-0 pb-1 space-y-1 overflow-hidden text-ellipsis ">
            <CardTitle className="text-sm line-clamp-1">{title}</CardTitle>
            <CardDescription className="line-clamp-1">{author}</CardDescription>
            <p className="flex items-center gap-2 text-como font-bold">
              <MapPin className="text-como" />
              <span className="line-clamp-1 text-ellipsis">{location}</span>
            </p>
            <p>{price ? `$${price}` : "Free"}</p>
          </CardContent>
        </Link>
      </Card>
    </MotionDiv>
  );
};
export default BookCard;
