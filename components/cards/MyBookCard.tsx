import { ListingBooksType } from "@/types";
import { CardContent, CardDescription, CardTitle } from "../ui/card";
import Image from "next/image";
import { MotionDiv } from "../shared/MotionDiv";

type MyBookCardProps = {
  listingBook: ListingBooksType;
  index: number;
};

const variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const MyBookCard = ({ listingBook, index }: MyBookCardProps) => {
  const { book_id, price } = listingBook;
  const { cover_url, title, author, description } = book_id;
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
      className="bg-light-800 h-42 overflow-hidden items-start justify-start gap-2 w-full 
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
        <CardDescription className="line-clamp-3">
          {description}
        </CardDescription>
        <p>{price ? `$${price}` : "Free"}</p>
      </CardContent>
    </MotionDiv>
  );
};
export default MyBookCard;
