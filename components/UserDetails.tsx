"use client";
import { getUserDetail } from "@/lib/actions/user.actions";
import { MapPin } from "lucide-react";
import Image from "next/image";
import PlainStarRating from "./PlainStarRating";
import FollowUnFollow from "./shared/FollowUnFollow";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { TUser } from "@/database/user.model";

const UserDetails = () => {
  const param = useParams();
  const { user } = useUser();

  console.log(param);
  const [isLoading, setIsLoading] = useState(true);
  const [state, setState] = useState<{
    user: TUser;
    imageUrl: string;
    numOfListing: number;
    isFollowing: boolean;
  } | null>(null);

  useEffect(() => {
    const fetchUserDetails = async (clerk_id: string) => {
      setIsLoading(true);
      try {
        const { user, imageUrl, numOfListing, isFollowing } =
          await getUserDetail(clerk_id);
        setState({ user, imageUrl, numOfListing, isFollowing });
      } catch (error: any) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    if (param.id) {
      fetchUserDetails(param?.id as string);
    }
  }, [param]);

  if (!user) {
    return null;
  }

  if (isLoading) {
    return (
      <div className="flex justify-center">
        <Image
          src="../assets/icons/spinner.svg"
          alt="spinner"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex p-4 items-center justify-center h-56">
      <Image
        className="rounded-full h-20"
        width={80}
        height={80}
        src={state?.imageUrl ? state?.imageUrl : ""}
        alt="User image"
      />
      <div className="flex flex-col flex-1 px-4">
        <h3 className="text-lg font-semibold">
          {state?.user.name} {state?.user.surname}
        </h3>
        <p className="flex font-semibold text-como gap-2">
          <MapPin /> <span>{state?.user.city},</span>{" "}
          <span>{state?.user.country}</span>
        </p>
        <PlainStarRating
          rate={state?.user?.rating ? state?.user?.rating : 0}
          uniqueId="book-user-star"
        />
        <p className="text-sm space-x-2 text-como">
          Other book: <span>{state?.numOfListing}</span>
        </p>

        <div className="w-56">
          {user?.id !== state?.user.clerkId && (
            <FollowUnFollow
              follow_user_id={JSON.stringify(state?.user._id)}
              isFollowing={state?.isFollowing ? state?.isFollowing : false}
            />
          )}
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
