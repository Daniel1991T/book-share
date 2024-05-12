import Image from "next/image";
import { Card } from "../ui/card";
import PlainStarRating from "../PlainStarRating";
import { TReviewUser } from "@/lib/actions/shared.types";
import { timeAgo } from "@/lib/utils";
import Link from "next/link";

type ReviewCardProps = {
  reviewItem: TReviewUser;
};

const AVATAR_PLACEHOLDER = "https://avatar.iran.liara.run/public/boy";

const ReviewCard = ({ reviewItem }: ReviewCardProps) => {
  const { _id, comment, rating, authorMongoUserId, forUserClerkId, postedAt } =
    reviewItem;
  const fullName = `${authorMongoUserId.name} ${authorMongoUserId.surname}`;

  return (
    <Card className="border-0">
      <div className="flex items-start space-x-4 px-2 py-4">
        <div className="w-20 h-20 mr-3 rounded-full overflow-hidden">
          <Image
            src={
              authorMongoUserId.picture
                ? authorMongoUserId.picture
                : AVATAR_PLACEHOLDER
            }
            alt={`${fullName} avatar`}
            width={56}
            height={56}
          />
        </div>
        <div className="flex flex-col w-full">
          <div className="flex justify-between w-full">
            <Link href={`/profiles/rating/${authorMongoUserId.clerkId}`}>
              <h3 className="text-lg font-bold hover:scale-105 transition-all duration-300 ease-in-out">
                {fullName}
              </h3>
            </Link>
            <p className="text-sm text-gray-400">{timeAgo(postedAt)}</p>
          </div>
          <PlainStarRating rate={rating} uniqueId={JSON.stringify(_id)} />
          <p className="mt-4 text-gray-600">{comment}</p>
        </div>
      </div>
    </Card>
  );
};
export default ReviewCard;
