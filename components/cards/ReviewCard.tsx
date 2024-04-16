import Image from "next/image";
import { Card } from "../ui/card";
import RatingComponent from "../Rating";
import { auth } from "@clerk/nextjs";
import StarRating from "../StarRating";
import PlainStarRating from "../PlainStarRating";

type ReviewCardProps = {
  imageAvatar: string;
  fullName: string;
  posteAt: string;
  review: string;
  reviewRate: number;
};

const AVATAR_PLACEHOLDER =
  "https://img.clerk.com/eyJ0eXBlIjoicHJveHkiLCJzcmMiOiJodHRwczovL2ltYWdlcy5jbGVyay5kZXYvdXBsb2FkZWQvaW1nXzJleTZiTmk4VTRpa0dWWERDY2lheU0xTzZXRSJ9";

const ReviewCard = ({
  fullName,
  imageAvatar,
  posteAt,
  review,
  reviewRate,
}: ReviewCardProps) => {
  return (
    <Card>
      <div className="flex items-center space-x-4 px-2 py-4">
        <div className="w-20 h-20 mr-3 rounded-full overflow-hidden">
          <Image
            src={AVATAR_PLACEHOLDER}
            alt={fullName}
            width={56}
            height={56}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            <h3 className="text-lg font-bold">{fullName}</h3>
            <p className="text-sm text-gray-400">{posteAt}</p>
          </div>
          <PlainStarRating rate={4} uniqueId="card-rating-star" />
          <p className="mt-4 text-gray-600">{review}</p>
        </div>
      </div>
    </Card>
  );
};
export default ReviewCard;
