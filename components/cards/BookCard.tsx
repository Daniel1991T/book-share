import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";

type BookCardProps = {
  image: string;
  author: string;
  location: string;
  price: number | null;
  title: string;
};

const BookCard = ({ author, image, location, price, title }: BookCardProps) => {
  return (
    <Card className="w-36 h-auto px-0">
      <Image
        src={image}
        className="object-contain w-full rounded-t-md"
        width={100}
        height={100}
        alt={author}
      />
      <CardTitle className="text-md">{title}</CardTitle>
      <CardDescription>{author}</CardDescription>
      <p>{location}</p>
      <p>{price ? `$${price}` : "Free"}</p>
    </Card>
  );
};
export default BookCard;
