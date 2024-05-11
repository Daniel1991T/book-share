import Image from "next/image";
import { Card } from "../ui/card";
import PlainStarRating from "../PlainStarRating";
import console from "console";
import { TReviewUser } from "@/lib/actions/shared.types";
import { timeAgo } from "@/lib/utils";

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
            <h3 className="text-lg font-bold">{fullName}</h3>
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
