import FollowCard from "@/components/cards/FollowCard";
import { getFollowers, getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

const FollowersPage = async () => {
  const { userId } = auth();
  if (!userId) return <div>loading...</div>;
  let mongoUser;
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
          isFollowing={mongoUser?.followUser.includes(follower._id)}
        />
      ))}
    </div>
  );
};
export default FollowersPage;
