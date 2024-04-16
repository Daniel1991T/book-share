"use client";
import { usePathname } from "next/navigation";
import { Button } from "../ui/button";
import { toggleFollowUser } from "@/lib/actions/user.actions";

const FollowUnFollow = ({
  follow_user_id,
  isFollowing,
}: {
  follow_user_id: string;
  isFollowing: boolean;
}) => {
  const pathname = usePathname();
  const handleFollow = async () => {
    try {
      await toggleFollowUser({
        followUserId: JSON.parse(follow_user_id),
        path: pathname,
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleFollow}>
      <Button variant="outline" className="text-como w-full rounded-full ">
        {isFollowing ? "Unfollow" : "Follow"}
      </Button>
    </form>
  );
};
export default FollowUnFollow;
