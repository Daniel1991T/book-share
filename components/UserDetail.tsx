import { getUserDetail } from "@/lib/actions/user.actions";
import { MapPin } from "lucide-react";
import Image from "next/image";
import PlainStarRating from "./PlainStarRating";
import FollowUnFollow from "./shared/FollowUnFollow";

const UserDetail = async ({ clerk_id }: { clerk_id: string }) => {
  const { user, imageUrl, numOfListing, isFollowing } = await getUserDetail(
    clerk_id
  );
  return (
    <div className="flex w-full p-4 items-center">
      <Image
        className="rounded-full h-20"
        width={80}
        height={80}
        src={imageUrl}
        alt="User image"
      />
      <div className="flex flex-col flex-1 px-4">
        <h3 className="text-lg font-semibold">
          {user.name} {user.surname}
        </h3>
        <p className="flex font-semibold text-como gap-2">
          <MapPin /> <span>{user.city},</span> <span>{user.country}</span>
        </p>
        <PlainStarRating
          rate={user?.rating ? user?.rating : 0}
          uniqueId="book-user-star"
        />
        <p className="text-sm space-x-2 text-como">
          Other book: <span>{numOfListing}</span>
        </p>

        <FollowUnFollow
          follow_user_id={JSON.stringify(user._id)}
          isFollowing={isFollowing}
        />
      </div>
    </div>
  );
};
export default UserDetail;
