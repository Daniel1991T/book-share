import FollowCard from "@/components/cards/FollowCard";
import MaxWidthWrapper from "@/components/shared/MaxWithWrapper";
import { TUser } from "@/database/user.model";
import { getFollowers, getUserByClerkId } from "@/lib/actions/user.actions";
import { ParamsProps } from "@/types";
import { auth } from "@clerk/nextjs";

type FollowersTabProps = {
  clerkId: string;
};

export default async function FollowersTab({ clerkId }: FollowersTabProps) {
  const { userId } = auth();
  let mongoUser: TUser | null = null;
  if (userId) {
    mongoUser = await getUserByClerkId(clerkId);
  }
  if (!mongoUser) return <div>loading...</div>;
  const followers = await getFollowers(JSON.stringify(mongoUser._id));

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-2">
        {followers.map((follower) => (
          <FollowCard
            key={follower._id}
            follow={follower}
            isFollowing={mongoUser?.followUser.includes(follower._id as any)}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
