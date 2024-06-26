"use client";
import { getUserDetail } from "@/lib/actions/user.actions";
import { MapPin, Star } from "lucide-react";
import Image from "next/image";
import PlainStarRating from "./PlainStarRating";
import FollowUnFollow from "./shared/FollowUnFollow";
import { useCallback, useEffect, useState } from "react";
import { useParams, usePathname } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import { TUser } from "@/database/user.model";
import { spinner } from "@/app/assets/icons";
import { extractDynamicSection } from "@/lib/utils";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog";
import { RatingForm } from "./form/RatingForm";
import { toast } from "./ui/use-toast";

const UserDetails = () => {
  const param = useParams();
  const pathname = usePathname();
  const { user } = useUser();

  const [isLoading, setIsLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);
  const [state, setState] = useState<{
    user: TUser;
    imageUrl: string;
    numOfListing: number;
    isFollowing: boolean;
  } | null>(null);

  const fetchUserDetails = useCallback(async (clerk_id: string) => {
    setIsLoading(true);
    try {
      const { user, imageUrl, numOfListing, isFollowing } = await getUserDetail(
        clerk_id
      );

      setState({
        user,
        imageUrl,
        numOfListing,
        isFollowing: isFollowing ? isFollowing : false,
      });
    } catch (error: any) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    if (param.id) {
      fetchUserDetails(param?.id as string);
    }
  }, [param.id, fetchUserDetails]);

  const handleModalOpen = () => {
    if (!user?.id) {
      toast({
        title: "You need to login to rate this user",
        description: "Please login to rate this user",
        variant: "destructive",
      });
      return;
    }
    setIsOpen(!isOpen);
  };

  const handleCloseDialog = () => {
    setIsOpen(false);
  };

  if (isLoading) {
    return (
      <div className="flex h-48 justify-center">
        <Image
          src={spinner}
          alt="spinner"
          width={56}
          height={56}
          className="object-contain"
        />
      </div>
    );
  }

  return (
    <div className="flex p-4 items-start h-56 justify-center md:h-48">
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
        <div className="flex items-center justify-start">
          <PlainStarRating
            rate={state?.user?.rating ? state?.user?.rating : 0}
            uniqueId="book-user-star"
          />
          <p className="text-2xl text-como mt-1 font-bold">
            {state?.user.rating?.toPrecision(2)}
          </p>
        </div>
        <p className="text-sm space-x-2 text-como">
          Other book: <span>{state?.numOfListing}</span>
        </p>
        <div className="flex flex-col md:flex-row gap-2 md:gap-4">
          <div className="w-56">
            {user?.id !== state?.user.clerkId && (
              <FollowUnFollow
                follow_user_id={JSON.stringify(state?.user._id)}
                initialIsFollowing={
                  state?.isFollowing ? state?.isFollowing : false
                }
              />
            )}
          </div>
          {extractDynamicSection(pathname) === "rating" &&
            user?.id !== param.id && (
              <Dialog open={isOpen} onOpenChange={handleModalOpen}>
                <DialogTrigger asChild>
                  <Button
                    onClick={() => setIsOpen(true)}
                    variant="outline"
                    className="outline-como w-56 transition-colors duration-200 ease-in-out hover:text-white hover:bg-como rounded-full"
                  >
                    Rate Me
                  </Button>
                </DialogTrigger>
                {user?.id && (
                  <DialogContent className="sm:max-w-md px-2 w-[320px] rounded-lg sm:w-[28rem]">
                    <div className="flex items-center space-x-2">
                      <RatingForm
                        clerkUserId={param.id as string}
                        authClerkId={user?.id}
                        closeDialog={handleCloseDialog}
                      />
                    </div>
                  </DialogContent>
                )}
              </Dialog>
            )}
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
