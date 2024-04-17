import FollowCard from "@/components/cards/FollowCard";
import { TUser } from "@/database/user.model";
import { getFollowings, getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const Followings = async () => {
  const { userId } = auth();
  const { followings } = await getFollowings(userId!);
  let mongoUser: TUser;
  if (userId) {
    mongoUser = await getUserByClerkId(userId);
  }

  return (
    <div className="flex flex-col gap-2">
      {followings.map((following) => (
        <FollowCard
          key={following._id}
          follow={following}
          isFollowing={mongoUser?.followUser.includes(following._id as any)}
        />
      ))}
    </div>
  );
};
export default Followings;
