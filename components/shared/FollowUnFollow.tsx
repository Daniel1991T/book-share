"use client";
import { usePathname, useRouter } from "next/navigation";
import { Button } from "../ui/button";
import { toggleFollowUser } from "@/lib/actions/user.actions";
import { useAuth } from "@clerk/nextjs";
import { toast } from "../ui/use-toast";
import { FormEvent } from "react";

const FollowUnFollow = ({
  follow_user_id,
  isFollowing,
}: {
  follow_user_id: string;
  isFollowing: boolean;
}) => {
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
    } catch (error) {
      console.log(error);
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
