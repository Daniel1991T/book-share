import FollowCard from "@/components/cards/FollowCard";
import MaxWidthWrapper from "@/components/shared/MaxWithWrapper";
import { TUser } from "@/database/user.model";
import { getFollowings, getUserByClerkId } from "@/lib/actions/user.actions";
import { auth } from "@clerk/nextjs";

type FollowingsTabProps = {
  clerkId: string;
};

export default async function FollowingTab({ clerkId }: FollowingsTabProps) {
  const { followings } = await getFollowings(clerkId);
  const { userId } = auth();
  let mongoUser: TUser;
  if (userId) {
    mongoUser = await getUserByClerkId(userId);
  }

  return (
    <MaxWidthWrapper>
      <div className="flex flex-col gap-2">
        {followings.map((following) => (
          <FollowCard
            key={following._id}
            follow={following}
            isFollowing={mongoUser?.followUser.includes(following._id as any)}
          />
        ))}
      </div>
    </MaxWidthWrapper>
  );
}
