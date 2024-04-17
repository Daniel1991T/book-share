import { MapPin } from "lucide-react";
import Image from "next/image";
import FollowUnFollow from "../shared/FollowUnFollow";
import { FollowResponseType } from "@/types";
import Link from "next/link";

type FollowCardProps = {
  follow: FollowResponseType;
  isFollowing?: boolean;
};

const FollowCard = ({ follow, isFollowing = true }: FollowCardProps) => {
  return (
    <div className="flex">
      <div className="flex w-36 items-center justify-center p-2">
        <Image
          src={follow.imageAvatar}
          width={100}
          height={100}
          alt="follow-avatar"
          className="rounded-full size-28"
        />
      </div>
      <div className="flex w-52 flex-col gap-2">
        <h3 className="text-lg font-semibold text-como_v-700 space-x-1">
          <span>{follow.name}</span>
          <span>{follow.surname}</span>
        </h3>
        <p className="flex flex-row gap-2 text-como_v-300 text-ellipsis line-clamp-1">
          <MapPin /> <span>{follow.city},</span> <span>{follow.country}</span>
        </p>
        <FollowUnFollow
          follow_user_id={JSON.stringify(follow._id)}
          isFollowing={isFollowing}
        />
      </div>
      <div className="w-full md:flex flex-1 h-36 px-2 hidden">
        {follow.firstListing.map((listing) => (
          <Link href={`/listing-book/${listing._id}`} key={listing._id}>
            <Image
              src={listing.book_id.cover_url[0]}
              className="object-contain w-32 h-full rounded-md"
              width={300}
              height={400}
              alt={listing.book_id.title}
            />
          </Link>
        ))}
      </div>
    </div>
  );
};
export default FollowCard;
