import FollowCard from "@/components/cards/FollowCard";
import { TUser } from "@/database/user.model";
import { getFollowers, getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const FollowersPage = async () => {
  const { userId } = auth();
  if (!userId) return <div>loading...</div>;
  let mongoUser: TUser | null = null;
  if (userId) {
    mongoUser = await getUserByClerkId(userId);
  }
  if (!mongoUser) return <div>loading...</div>;
  const followers = await getFollowers(JSON.stringify(mongoUser._id));

  return (
    <div className="flex flex-col gap-2">
      {followers.map((follower) => (
        <FollowCard
          key={follower._id}
          follow={follower}
          isFollowing={mongoUser?.followUser.includes(follower._id as any)}
        />
      ))}
    </div>
  );
};
export default FollowersPage;
