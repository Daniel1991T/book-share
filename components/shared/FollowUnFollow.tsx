"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toggleFollowUser } from "@/lib/actions/user.actions";
import { useAuth } from "@clerk/nextjs";
import { toast } from "../ui/use-toast";
import { FormEvent, useState } from "react";

type FollowUnFollowProps = {
  follow_user_id: string;
  initialIsFollowing: boolean;
};

const FollowUnFollow = ({
  follow_user_id,
  initialIsFollowing,
}: FollowUnFollowProps) => {
  // TODO: optimistic UI instead of switching the state of parent component
  const [isFollowing, setIsFollowing] = useState(initialIsFollowing);
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useAuth();

  const handleFollow = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!isSignedIn) {
        toast({
          title: "Not signed in",
          description: "Please sign in to follow",
        });
        router.push(`/sign-in?redirect=${pathname}`);
        return;
      }
      await toggleFollowUser({
        followUserId: JSON.parse(follow_user_id),
        path: pathname,
      });
      setIsFollowing((prev) => !prev);
    } catch (error) {
      console.log(error);
      setIsFollowing(initialIsFollowing);
    }
  };

  return (
    <form onSubmit={(e) => handleFollow(e)}>
      <Button variant="outline" className="text-como w-full rounded-full ">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
};
export default FollowUnFollow;
